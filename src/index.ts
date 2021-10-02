import express, { Application } from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import notFound from './middlewares/notFound';
import handleErrors from './middlewares/handleErrors';

dotenv.config();

import notesRouter from './routes/notes.routes';
import './config/database';

const app: Application = express();

// Settings
app.set("port", process.env.PORT || 3001)

app.use(express.json());

// set up cors to allow us to accept requests from our client
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true // allow session cookie from browser to pass through
}));

// Routes
app.use("/api/note", notesRouter);

app.use('/uploads', express.static(path.resolve('uploads')));

app.use(notFound);

app.use(handleErrors);

// Starting the server
app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`)
});