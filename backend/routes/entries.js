const express = require('express');
const router = express.Router();
const { db } = require('../db');
const authenticate = require('../middleware/auth');

router.use(authenticate);

router.get('/', (req, res) => {
  db.all('SELECT * FROM entries WHERE user_id = ? ORDER BY date DESC', [req.user.id], (err, rows) => {
    res.json(rows || []);
  });
});

router.post('/', (req, res) => {
  const { date, weight, steps, notes } = req.body;
  db.run(
    'INSERT INTO entries (user_id, date, weight, steps, notes) VALUES (?, ?, ?, ?, ?)',
    [req.user.id, date, weight, steps, notes],
    function(err) {
      if (err) return res.status(500).json({ message: 'DB error' });
      db.get('SELECT * FROM entries WHERE id = ?', [this.lastID], (e, row) => res.json(row));
    }
  );
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { date, weight, steps, notes } = req.body;
  db.run(
    'UPDATE entries SET date=?, weight=?, steps=?, notes=? WHERE id=? AND user_id=?',
    [date, weight, steps, notes, id, req.user.id],
    function(err) {
      if (this.changes === 0) return res.status(404).json({ message: 'Not found' });
      res.json({ message: 'Updated' });
    }
  );
});

router.delete('/:id', (req, res) => {
  db.run('DELETE FROM entries WHERE id=? AND user_id=?', [req.params.id, req.user.id], function(err) {
    if (this.changes === 0) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  });
});

module.exports = router;
