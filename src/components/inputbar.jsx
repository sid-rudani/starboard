import React, { useState } from 'react';

export default function Inputbar({ onSubmit }) {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed) {
      onSubmit(trimmed);
      setText('');
    }
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type to add…"
        className="input-box"
      />
      <button type="submit" className="input-submit">
        Add
      </button>
    </form>
  );
}
