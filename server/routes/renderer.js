const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('*', (req, res) => {
    const requestedPath = req.path;

    db.get(`SELECT t.html FROM routes r JOIN templates t ON r.template_id = t.id WHERE r.path = ?`, [requestedPath], (err, row) => {
        if (err) {
            console.error('Error fetching route:', err.message);
            return res.status(500).send('Internal Server Error');
        }
        if (!row) {
            return res.status(404).send('Not Found');
        }
        res.send(row.html);
    });

});
