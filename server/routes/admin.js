const express = require('express');
const router = express.Router();
const db = require('../db');

// Admin dashboard route
router.get('/', (req, res) => {
    db.all(`SELECT * FROM routes`, [], (err, routes) => {
        if (err) {
            console.error('Error fetching routes:', err.message);
            return res.status(500).send('Internal Server Error');
        }
        res.render('admin/index', { routes });
    });
});

// Create route form
router.get('/routes/new', (req, res) => {
    db.all(`SELECT * FROM templates`, [], (err, templates) => {
        if (err) {
            console.error('Error fetching templates:', err.message);
            return res.status(500).send('Internal Server Error');
        }
        res.render('admin/new-route', { templates });
    });
});

// Handle new route submission
router.post('/routes', (req, res) => {
    const { path, template_id } = req.body;
    db.run(`INSERT INTO routes (path, template_id) VALUES (?, ?)`, [path, template_id], function(err) {
        if (err) {
            console.error('Error inserting route:', err.message);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/admin');
    });
});

// Template management (Basic View Only)
router.get('/templates', (req, res) => {
    db.all(`SELECT * FROM templates`, [], (err, templates) => {
        if (err) {
            console.error('Error fetching templates:', err.message);
            return res.status(500).send('Internal Server Error');
        }
        res.render('admin/templates', { templates });
    });
});

module.exports = router;