import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    await User.create({ name, email, password: hash });
    res.json({ message: 'Registered' });
  } catch {
    res.status(400).json({ error: 'Email exists' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const u = await User.findOne({ email });
  if (!u) return res.status(404).json({ error: 'Not found' });
  const ok = await bcrypt.compare(password, u.password);
  if (!ok) return res.status(401).json({ error: 'Invalid' });

  req.session.user = { id: u._id, name: u.name, email: u.email };
  res.json({ message: 'Logged in', user: req.session.user });
});

router.get('/me', (req, res) => {
  if (req.session.user) return res.json({ user: req.session.user });
  res.status(401).json({ error: 'Not authenticated' });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });
});

export default router;
