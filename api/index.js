import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sky-thaikitchen';

// Ensure MongoDB is only connected once in Serverless environments
if (mongoose.connection.readyState === 0) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

const orderSchema = new mongoose.Schema({
  tableNumber: String,
  items: Array,
  total: Number,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

app.post('/api/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ message: 'Order created', orderId: order._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/menu', (req, res) => {
  res.json([
    { id: '1', name: 'Pad Thai Goong Sod', price: 60, category: 'Main', image: '/pad-thai-goong-sod.jpg' },
    { id: '2', name: 'Tom Yum Goong', price: 120, category: 'Soup', image: '/tom-yum-goong.jpg' },
    { id: '3', name: 'Green Curry Chicken', price: 80, category: 'Main', image: '/green-curry-chicken.jpg' },
    { id: '4', name: 'Mango Sticky Rice', price: 60, category: 'Dessert', image: '/mango-sticky-rice.jpg' },
    { id: '5', name: 'Som Tum Thai (Papaya Salad)', price: 60, category: 'Salad', image: '/som-tum-thai.jpg' },
    { id: '6', name: 'Massaman Beef Curry', price: 150, category: 'Main', image: '/massaman-beef-curry.jpg' },
    { id: '7', name: 'Khao Pad Pu (Crab Fried Rice)', price: 90, category: 'Main', image: '/khao-pad-pu.jpg' },
    { id: '8', name: 'Moo Ping (Grilled Pork)', price: 60, category: 'Appetizer', image: '/moo-ping.jpg' },
    { id: '9', name: 'Pla Rad Prik (Crispy Fish)', price: 180, category: 'Main', image: '/pla-rad-prik.jpg' },
    { id: '10', name: 'Thai Iced Tea', price: 60, category: 'Beverage', image: '/thai-iced-tea.jpg' },
    { id: '11', name: 'Moo Krob (Crispy Pork Belly)', price: 150, category: 'Main', image: '/moo-krob.jpg' },
    { id: '12', name: 'Khao Soi (Northern Curry Noodles)', price: 120, category: 'Main', image: '/khao-soi.jpg' },
    { id: '13', name: 'Tod Mun Pla (Thai Fish Cakes)', price: 80, category: 'Appetizer', image: '/tod-mun-pla.jpg' },
    { id: '14', name: 'Larb Moo (Spicy Minced Pork Salad)', price: 90, category: 'Salad', image: '/larb-moo.jpg' },
    { id: '15', name: 'Tub Tim Grob (Red Ruby Dessert)', price: 60, category: 'Dessert', image: '/tub-tim-grob.jpg' },
  ]);
});

// Export the app for Vercel and Vite middleware
export default app;
