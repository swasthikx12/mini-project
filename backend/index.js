// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const Battery= require('./model/battery');
require('dotenv').config(); 


const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());


const PORT =process.env.PORT || 3000;


const mongoDBURL = process.env.DATABASE_URL;; 


mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.post('/insert-battery', async (req, res) => {
  const { id, battery } = req.body;


  const newBattery = new Battery({ id, battery });

  try {
    
    await newBattery.save();
    res.status(201).json({ message: 'Battery data inserted successfully!' });
  } catch (error) {
    console.error('Error inserting battery data:', error);
    res.status(500).json({ error: 'Failed to insert battery data' });
  }
});


app.get('/batteries', async (req, res) => {
  try {
    
    const batteries = await Battery.find({}, 'id battery');
    res.status(200).json(batteries);
  } catch (error) {
    console.error('Error fetching battery data:', error);
    res.status(500).json({ error: 'Failed to fetch battery data' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
