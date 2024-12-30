const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const taskRoutes = require('./routes/tareas');

app.use(cors());
app.use(express.json());

app.use('/tareas', taskRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));