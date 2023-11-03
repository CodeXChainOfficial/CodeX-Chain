import express from 'express';
import { createToken } from './backend.js';
import { executeBash } from './backend.js';
import bodyParser from 'body-parser';

import cors from 'cors';
const app = express();
const port = 5004;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); 
// Create a new token
app.post('/api/createToken', (req, res) => {
  console.log('server create token');
  const newTokenData = req.body;
  createToken(newTokenData);
  console.log('server created token');

  executeBash();
  console.log('server executed token');

  res.json({ message: 'Token creation initiated' });
});

let storedCanisterInfo = null;
app.use(bodyParser.json());


app.post('/api/scriptInfo', (req, res) => {
  const { canisterInfo } = req.body;
  storedCanisterInfo = canisterInfo; // Store canisterInfo

  // Respond with a success message
  res.json({ message: 'Data receive successfully',storedCanisterInfo });
});

app.get('/api/scriptInfo', (req, res) => {
  // Respond with the storedCanisterInfo
  res.json({ storedCanisterInfo });
});


app.get('/api/storedCanisterInfo', (req, res) => {
  // Retrieve the storedCanisterInfo (implement this logic based on how you store it)
  const storedCanisterInfo = // retrieve your storedCanisterInfo

  // Respond with the storedCanisterInfo
  res.json({ storedCanisterInfo });
});


app.get("/indexICP", (req, res) => {
  const principal = req.query.principal; // Retrieve the principal from the query parameters
  const agent = JSON.parse(req.query.agent); // Parse the agent from JSON
  const actor = JSON.parse(req.query.actor); // Parse the actor from JSON

  res.send(`
    <html>
      <head>
        <title>ICP Data</title>
      </head>
      <body>
        <h1>Principal: ${principal}</h1>
        <p>Agent: ${JSON.stringify(agent)}</p>
        <p>Actor: ${JSON.stringify(actor)}</p>
      </body>
    </html>
  `);

  // Now you have access to the principal, agent, and actor.

  // Your logic here...

  res.send("Hello ICP Page"); // Respond to the request
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
