const express = require('express');
const router = express.Router();
const db = require('../db');

// Membuat notes baru
router.post('/', (req, res) => {
    const { title, datetime, note } = req.body;
    const query = 'INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)';
    db.query(query, [title, datetime, note], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ id: results.insertId, title, datetime, note });
    });
});

// Menampilkan semua notes
router.get('/', (req, res) => {
    const query = 'SELECT * FROM notes';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
});

// Menampilkan salah satu notes berdasarkan id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM notes WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send({ message: 'Note tidak ditemukan' });
        res.status(200).send(results[0]);
    });
});

// Mengedit notes berdasarkan id
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, datetime, note } = req.body;
    const query = 'UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?';
    db.query(query, [title, datetime, note, id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).send({ message: 'Note tidak ditemukan' });
        res.status(200).send({ message: 'Note berhasil diupdate', id, title, datetime, note });
    });
});

// Menghapus notes berdasarkan id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM notes WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).send({ message: 'Note tidak ditemukan' });
        res.status(200).send({ message: 'Note berhasil dihapus', id });
    });
});

module.exports = router;
