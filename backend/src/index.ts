import express, { Application } from 'express';
import exampleRouter from './routes/example';
import jobsRouter from './routes/jobs';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/example', exampleRouter);

app.use('/api/jobs', jobsRouter);

app.get('/', (req, res) => {
  res.send('Express + TypeScript template is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
