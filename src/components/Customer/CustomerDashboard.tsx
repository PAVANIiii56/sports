import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ProductList from './ProductList';
import Cart from './Cart';
import Wishlist from './Wishlist';
import Checkout from './Checkout';
import Orders from './Orders';
import { ShoppingBag, ShoppingCart, Heart, Package, LogOut, Store } from 'lucide-react';

type View = 'products' | 'cart' | 'wishlist' | 'orders' | 'checkout';

export default function CustomerDashboard() {
  const [currentView, setCurrentView] = useState<View>('products');
  const { signOut, profile } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Store className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Sports Store
              </h1>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-600">
                Welcome, <strong>{profile?.full_name}</strong>
              </span>
              <button
                onClick={signOut}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md hover:shadow-lg"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6 bg-white rounded-lg shadow-md p-2 flex flex-wrap gap-2">
          <button
            onClick={() => setCurrentView('products')}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition ${
              currentView === 'products'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Products
          </button>

          <button
            onClick={() => setCurrentView('cart')}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition ${
              currentView === 'cart'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Cart
          </button>

          <button
            onClick={() => setCurrentView('wishlist')}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition ${
              currentView === 'wishlist'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Heart className="w-5 h-5 mr-2" />
            Wishlist
          </button>

          <button
            onClick={() => setCurrentView('orders')}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition ${
              currentView === 'orders'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Package className="w-5 h-5 mr-2" />
            Orders
          </button>
        </div>

        <div>
          {currentView === 'products' && <ProductList />}
          {currentView === 'cart' && (
            <Cart onCheckout={() => setCurrentView('checkout')} />
          )}
          {currentView === 'wishlist' && <Wishlist />}
          {currentView === 'orders' && <Orders />}
          {currentView === 'checkout' && (
            <Checkout
              onBack={() => setCurrentView('cart')}
              onSuccess={() => setCurrentView('orders')}
            />
          )}
        </div>
      </div>
    </div>
  );
}
