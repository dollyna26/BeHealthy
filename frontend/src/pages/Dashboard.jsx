import React, { useEffect, useState } from 'react';
import API from '../api';
import EntryForm from '../components/EntryForm';
import EntryList from '../components/EntryList';

export default function Dashboard(){
  const [entries,setEntries]=useState([]);

  const load = async () => {
    try {
      const res = await API.get('/entries');
      setEntries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{ load(); }, []);

  return (
    <div>
      <h2>Your Health Entries</h2>
      <EntryForm onSaved={load} />
      <EntryList entries={entries} onDeleted={load} onUpdated={load} />
    </div>
  );
}
