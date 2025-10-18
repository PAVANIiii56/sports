import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  role: 'customer' | 'admin';
  full_name: string;
  email: string;
  phone?: string;
  address?: string;
  created_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  sold: number;
  category_id: string;
  images: string[];
  created_at: string;
  updated_at: string;
};

export type CartItem = {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  products?: Product;
};

export type WishlistItem = {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  products?: Product;
};

export type Order = {
  id: string;
  user_id: string;
  total_amount: number;
  payment_method: 'phonepe' | 'paytm' | 'amazonpay' | 'cod';
  payment_status: 'pending' | 'paid' | 'failed';
  order_status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: string;
  phone: string;
  created_at: string;
  updated_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at: string;
  products?: Product;
};
