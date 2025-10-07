import React from 'react';
import API from '../api';

export default function EntryList({ entries, onDeleted, onUpdated }) {
  const del = async (id) => {
    if (!confirm('Delete?')) return;
    await API.delete(`/entries/${id}`);
    onDeleted();
  };

  return (
    <div className="list">
      {entries.map(e => (
        <div key={e.id} className="card item">
          <div className="item-head">
            <strong>{e.date}</strong>
            <button className="link" onClick={()=>del(e.id)}>Delete</button>
          </div>
          <div>Weight: {e.weight} kg — Steps: {e.steps}</div>
          <div className="notes">{e.notes}</div>
        </div>
      ))}
    </div>
  );
}
