import express from 'express';
import fs from 'fs';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

// @dec     get all users from local json
app.get('/data', (req, res) => {
  fs.readFile('../data/data.json', 'utf-8', (error, data) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.status(200).json(JSON.parse(data));
    }
  });
});

// @dec     POST add user to local json
app.post('/data', (req, res) => {
  const newItem = req.body;
  fs.readFile('../data/data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading data file');
    } else {
      let jsonData = JSON.parse(data);
      jsonData.user.push(newItem);
      fs.writeFile('../data/data.json', JSON.stringify(jsonData), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error writing to data file');
        } else {
          res.status(201).json(newItem);
        }
      });
    }
  });
});

// @dec     DELETE remove user from local json
app.delete('/data/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile('../data/data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading data file');
    } else {
      let jsonData = JSON.parse(data);
      const index = jsonData.user.findIndex((item) => item.id === id);
      if (index === -1) {
        res.status(404).send('Item not found');
      } else {
        jsonData.user.splice(index, 1);
        fs.writeFile('../data/data.json', JSON.stringify(jsonData), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error writing to data file');
          } else {
            res.status(200).send('Item deleted successfully');
          }
        });
      }
    }
  });
});

app.listen(8000, () => {
  console.log('Server is running on Port 8000');
});
