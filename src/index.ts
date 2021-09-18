import express from 'express';

const app = express();

// Settings
app.set("port", process.env.PORT || 3001)

app.use(express.json());

// Routes

// Starting the server
app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`)
});