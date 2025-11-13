// src/controllers/auth/registerController.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

exports.register = async (req, res) => {
  const { firstName, lastName, username, phoneNumber, nik, registrationCode, password } = req.body;

  // Validasi kode registrasi
  const VALID_REGISTRATION_CODE = 'KASARIINDAH';
  if (registrationCode !== VALID_REGISTRATION_CODE) {
    return res.status(400).json({ error: 'Kode registrasi tidak valid.' });
  }

  try {
    // Cek apakah username sudah ada
    const existingUserByUsername = await prisma.user.findUnique({ where: { username } });
    if (existingUserByUsername) {
      return res.status(400).json({ error: 'Username sudah terdaftar.' });
    }

    // Cek apakah NIK sudah ada
    const existingUserByNIK = await prisma.user.findUnique({ where: { nik } });
    if (existingUserByNIK) {
      return res.status(400).json({ error: 'NIK sudah terdaftar.' });
    }

    // Cek apakah nomor telepon sudah ada
    const existingUserByPhone = await prisma.user.findUnique({ where: { phoneNumber } });
    if (existingUserByPhone) {
      return res.status(400).json({ error: 'Nomor telepon sudah terdaftar.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Buat user baru
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        phoneNumber,
        nik,
        password: hashedPassword,
        role: 'WARGA'
      },
      select: { id: true, firstName: true, lastName: true, username: true, phoneNumber: true, nik: true, role: true }
    });

    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil',
      user: newUser
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};