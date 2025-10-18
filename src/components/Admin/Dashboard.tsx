import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';
import { LogOut, Package, ShoppingBag } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const { signOut, profile } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {profile?.full_name}
              </span>
              <button
                onClick={signOut}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center px-6 py-3 font-medium transition ${
                activeTab === 'products'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Package className="w-5 h-5 mr-2" />
              Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center px-6 py-3 font-medium transition ${
                activeTab === 'orders'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Orders
            </button>
          </div>
        </div>

        <div>
          {activeTab === 'products' ? <ProductManagement /> : <OrderManagement />}
        </div>
      </div>
    </div>
  );
}
