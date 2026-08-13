import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const app = express();
app.use(cors());
app.use(express.json());

// Fallback to local if not defined
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sky-thaikitchen';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic schema setups for mock responses
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

const orderSchema = new mongoose.Schema({
  tableNumber: String,
  items: Array,
  total: Number,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', orderSchema);

// API Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.json({ message: 'User created successfully', user: { id: user._id, username, email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be email or username
    const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ message: 'Order created', orderId: order._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mock Menu Items Route
app.get('/api/menu', (req, res) => {
  res.json([
    { id: '1', name: 'Pad Thai Goong Sod', price: 250, category: 'Main', image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&q=80&w=800' },
    { id: '2', name: 'Tom Yum Goong', price: 320, category: 'Soup', image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4859?auto=format&fit=crop&q=80&w=800' },
    { id: '3', name: 'Green Curry Chicken', price: 280, category: 'Main', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800' },
    { id: '4', name: 'Mango Sticky Rice', price: 180, category: 'Dessert', image: 'https://images.unsplash.com/photo-1601000676449-366f076c81bb?auto=format&fit=crop&q=80&w=800' },
  ]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
