import React, { useState, useEffect } from 'react';
import Inputbar from './components/inputbar';
import Tile from './components/tile';
import { supabase, supabaseUrl, supabaseKey, supabaseConfigured } from './supabaseClient';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Generate or retrieve a persistent anonymous client token
  const [clientToken] = useState(() => {
    let token = localStorage.getItem('client_token');
    if (!token) {
      token = crypto.randomUUID();
      localStorage.setItem('client_token', token);
    }
    return token;
  });

  // Track which items this user has already upvoted
  const [votedItems, setVotedItems] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem('voted_items') || '[]'));
    } catch { return new Set(); }
  });

  useEffect(() => {
    if (!supabaseConfigured) {
      setLoading(false);
      return;
    }

    async function fetchItems() {
      setLoading(true);
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('votes', { ascending: false });
      if (error) {
        console.error('Error fetching items', error);
      } else {
        setItems(data || []);
      }
      setLoading(false);
    }
    fetchItems();

    // subscribe to real-time updates (Supabase v2 syntax)
    const channel = supabase
      .channel('items_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'items' },
        () => {
          fetchItems();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addItem = async text => {
    try {
      setError(null);
      const { data, error: insertError } = await supabase
        .from('items')
        .insert([{ text, votes: 0, creator_token: clientToken }])
        .select()
        .single();
      if (insertError) {
        console.error('Error adding item', insertError);
        setError(`Failed to add item: ${insertError.message}`);
      } else if (data) {
        setItems(prev => [data, ...prev]);
      }
    } catch (err) {
      console.error('Unexpected error adding item', err);
      setError(`Unexpected error: ${err.message}`);
    }
  };

  const deleteItem = async (id) => {
    const { data: deleted, error: deleteError } = await supabase
      .from('items')
      .delete()
      .eq('id', id)
      .eq('creator_token', clientToken)
      .select();
    if (deleteError) {
      console.error('Error deleting item', deleteError);
      setError(`Failed to delete: ${deleteError.message}`);
    } else if (deleted && deleted.length > 0) {
      setItems(prev => prev.filter(i => i.id !== id));
    }
  };

  const upvote = async id => {
    if (votedItems.has(id)) return; // already voted
    const item = items.find(i => i.id === id);
    if (!item) return;
    const { data, error } = await supabase
      .from('items')
      .update({ votes: (item.votes || 0) + 1 })
      .eq('id', id)
      .select()
      .single();
    if (error) {
      console.error('Error upvoting', error);
    } else {
      // Record this vote in state and localStorage
      const newVoted = new Set(votedItems).add(id);
      setVotedItems(newVoted);
      localStorage.setItem('voted_items', JSON.stringify([...newVoted]));
      setItems(prev =>
        prev
          .map(i => (i.id === id ? data : i))
          .sort((a, b) => b.votes - a.votes)
      );
    }
  };

  const sortedItems = Array.isArray(items) ? [...items].sort((a, b) => b.votes - a.votes) : [];

  return (
    <div className="App">
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      <header className="App-header">
        <h1>Starboard</h1>
      </header>

      <div className="list-container">
        {(!supabaseUrl || !supabaseKey) && (
          <div className="glass" style={{ color: '#ffcc00', padding: '20px', margin: '20px', textAlign: 'center' }}>
            <p>Supabase credentials not detected.</p>
            <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '8px' }}>
              Please check your <code>.env</code> file and restart the server.
            </p>
          </div>
        )}

        {error && (
          <div className="glass" style={{ color: '#ff6b6b', padding: '12px 20px', margin: '0 0 12px', textAlign: 'center', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', opacity: 0.6 }}>
            <p>Loading items…</p>
          </div>
        ) : (
          <>
            {(items?.length || 0) === 0 && (supabaseUrl && supabaseKey) && (
              <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.5 }}>
                <p>No items yet – add something to the board!</p>
              </div>
            )}
            {sortedItems.map(item => (
              <Tile
                key={item.id}
                item={item}
                onUpvote={() => upvote(item.id)}
                onDelete={() => deleteItem(item.id)}
                clientToken={clientToken}
                hasVoted={votedItems.has(item.id)}
              />
            ))}
          </>
        )}
      </div>

      <div className="input-wrapper">
        <Inputbar onSubmit={addItem} />
      </div>
    </div>
  );
}

export default App;
