import React, { useState } from 'react';

export default function Inputbar({ onSubmit, disabled }) {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (disabled) return;
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
        placeholder={disabled ? 'You have been banned from posting.' : 'Type to add…'}
        className="input-box"
        disabled={disabled}
      />
      <button type="submit" className="input-submit" disabled={disabled}>
        Add
      </button>
    </form>
  );
}
