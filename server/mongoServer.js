import express from 'express';
import { connectToDatabase } from './config/db.js';
import dotenv from 'dotenv';
import User from './models/User.js';
// import fs from 'fs';
import cors from 'cors';

dotenv.config();

connectToDatabase();
// .then(() => {
//   mongoose.connection.close();
// })
// .catch((err) => {
//   console.error('Error during database connection:', err);
// });

const app = express();
app.use(cors());
app.use(express.json());

// @dec     get all users from local json
app.get('/data', async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
});

// @dec     POST add user to local json
app.post('/data', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({
      name,
      email,
      password,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// @dec     DELETE remove user from local json
app.delete('/data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.listen(8000, () => {
  console.log('Server is running on Port 8000');
});
