// src/app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Backend Surat Online: OK ✅' });
});

const PORT = process.env.PORT || 5000;
const adminRoutes = require('./routes/admin/adminRoutes');


app.use('/api/auth', require('./routes/auth/authRoutes'));

app.use('/api/surat', require('./routes/suratRoutes'));

app.use('/api/admin', adminRoutes); // ✅ Tambahkan ini


app.listen(PORT, () => {
  console.log(`🟢 Backend jalan di http://localhost:${PORT}`);
});
