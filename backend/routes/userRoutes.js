const express = require('express');
const router = express.Router();
const connection = require('../db');
// Create User
router.post('/user/create', (req, res,next) => {
    const { name, email, password, dob } = req.body;
    const formattedDob = new Date(dob).toISOString().split('T')[0];
    if (new Date(dob) > new Date()) {
        return res.status(400).json({ error: 'Date of birth cannot be in the future' });
    }
    try {
        connection.query(
        'INSERT INTO Users (name, email, password, dob) VALUES (?, ?, ?, ?)',[name, email, password, formattedDob],(err,result)=>{
            if(err){
            return next(err);
            }
            res.status(201).json({ id: result.insertId, name, email, password, dob });
            }
        );
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});

// Get All Users
router.get('/user/all', (req, res, next) => {
  try {
    connection.query("SELECT * FROM Users", function (err, result) {
        if (err){
            return next(err);
        }
        res.status(200).json({response:result});
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get User by ID
router.get('/user/:id', (req, res, next) => {
  const { id } = req.params;
  try {
    connection.query('SELECT * FROM Users WHERE id = ?', [id],(err,result)=>{
        if(err){
            return next(err);
        }
        if (result.length > 0) {
            res.status(200).json(result[0]);
          } else {
            res.status(404).json({ message: 'User not found' });
          }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update User
router.put('/user/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, email, password, dob } = req.body;
  try {
    connection.query(
      'UPDATE Users SET name = ?, email = ?, password = ?, dob = ? WHERE id = ?',
      [name, email, password, dob, id],(err,result)=>{
        if(err){
            return next(err);
        }
        if (result.affectedRows > 0) {
            res.status(200).json({ id, name, email, password, dob });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
      });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete User
router.delete('/user/:id', (req, res,next) => {
  const { id } = req.params;
  try {
    connection.query('DELETE FROM Users WHERE id = ?', [id],(err,result)=>{
        if(err){
            return next(err);
        }
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'User deleted successfully' });
          } else {
            res.status(404).json({ message: 'User not found' });
        }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
