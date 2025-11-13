// src/controllers/auth/profileController.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.user.id) },
      select: { id: true, firstName: true, lastName: true, username: true, phoneNumber: true, nik: true, role: true }
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Gagal memuat profil' });
  }
};