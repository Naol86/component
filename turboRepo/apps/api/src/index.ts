import express from 'express';
const app = express();
app.get('/', (req, res) => res.json({ message: 'Hello World' }));
app.listen(8080, () => console.log('API running on port 8080'));
