import { useState, useEffect } from 'react';
import { supabase, CartItem } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';

type CartProps = {
  onCheckout: () => void;
};

export default function Cart({ onCheckout }: CartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadCart();
    }
  }, [user]);

  async function loadCart() {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*, products(*)')
        .eq('user_id', user!.id);

      if (error) throw error;
      setCartItems(data || []);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateQuantity(itemId: string, newQuantity: number) {
    if (newQuantity < 1) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', itemId);

      if (error) throw error;
      loadCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
    }
  }

  async function removeItem(itemId: string) {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      loadCart();
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item');
    }
  }

  const total = cartItems.reduce(
    (sum, item) => sum + (item.products?.price || 0) * item.quantity,
    0
  );

  if (loading) {
    return <div className="text-center py-8">Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-600">Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <ShoppingCart className="w-6 h-6 mr-2" />
          Shopping Cart ({cartItems.length} items)
        </h2>
      </div>

      <div className="divide-y">
        {cartItems.map((item) => (
          <div key={item.id} className="p-6 flex gap-4">
            {item.products?.images[0] && (
              <img
                src={item.products.images[0]}
                alt={item.products.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
            )}

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {item.products?.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {item.products?.description}
              </p>
              <p className="text-lg font-bold text-blue-600">
                ${item.products?.price}
              </p>
            </div>

            <div className="flex flex-col items-end justify-between">
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-600 hover:text-red-800 transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 bg-gray-100 rounded hover:bg-gray-200 transition"
                  disabled={item.quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 bg-gray-100 rounded hover:bg-gray-200 transition"
                  disabled={item.quantity >= (item.products?.stock || 0)}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <p className="text-lg font-bold text-gray-900">
                ${((item.products?.price || 0) * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-t bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold text-gray-800">Total:</span>
          <span className="text-3xl font-bold text-blue-600">
            ${total.toFixed(2)}
          </span>
        </div>
        <button
          onClick={onCheckout}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold text-lg"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
