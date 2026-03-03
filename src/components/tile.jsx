import React from 'react';

export default function Tile({ item, onUpvote, onDelete, clientToken, hasVoted }) {
  const isOwner = item.creator_token && item.creator_token === clientToken;

  return (
    <div className="tile glass">
      <span className="tile-text">{item.text}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          className={`tile-upvote${hasVoted ? ' tile-upvote--voted' : ''}`}
          onClick={onUpvote}
          disabled={hasVoted}
          title={hasVoted ? 'Already voted' : 'Upvote'}
        >
          <span className="vote-arrow">▲</span> {item.votes}
        </button>
        {isOwner && (
          <button className="tile-delete" onClick={onDelete} title="Delete">
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
