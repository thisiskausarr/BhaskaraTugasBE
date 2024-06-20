const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const notesRoutes = require('./routes/notes');

dotenv.config();

const app = express();

app.use(cors());  // Tambahkan middleware CORS
app.use(express.json());
app.use('/notes', notesRoutes);

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
