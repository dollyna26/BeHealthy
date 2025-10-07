import React, { useState } from 'react';
import API from '../api';

export default function EntryForm({ onSaved }){
  const [date,setDate]=useState(new Date().toISOString().slice(0,10));
  const [weight,setWeight]=useState('');
  const [steps,setSteps]=useState('');
  const [notes,setNotes]=useState('');

  const submit = async (e) => {
    e.preventDefault();
    await API.post('/entries', { date, weight: parseFloat(weight||0), steps: parseInt(steps||0), notes });
    setWeight(''); setSteps(''); setNotes('');
    onSaved();
  };

  return (
    <form onSubmit={submit} className="card form-card">
      <div className="row">
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
        <input value={weight} onChange={e=>setWeight(e.target.value)} placeholder="Weight (kg)" />
      </div>
      <div className="row">
        <input value={steps} onChange={e=>setSteps(e.target.value)} placeholder="Steps" />
        <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Notes"></textarea>
      </div>
      <button className="btn primary">Save</button>
    </form>
  );
}
