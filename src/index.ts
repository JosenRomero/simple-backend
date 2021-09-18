import express from 'express';
import notesRouter from './routes/notes.routes';
import './config/database';

const app = express();

// Settings
app.set("port", process.env.PORT || 3001)

app.use(express.json());

// Routes
app.use("/api/note", notesRouter);

// Starting the server
app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`)
});