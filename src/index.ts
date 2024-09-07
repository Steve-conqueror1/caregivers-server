import express from 'express';
import 'dotenv/config';
import * as mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

const mongoUrl =
  process.env.MONGO_URL || 'mongodb://localhost:27017/caregiversdb';

mongoose
  .connect(mongoUrl)
  .then(() => console.log('Mongodb Connected'))
  .catch((err) => console.log('MongoDB connection error: ', err));

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
