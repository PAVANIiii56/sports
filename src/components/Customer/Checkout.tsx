import { useState, useEffect } from 'react';
import { supabase, CartItem } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { CreditCard, Smartphone, ArrowLeft } from 'lucide-react';

type CheckoutProps = {
  onBack: () => void;
  onSuccess: () => void;
};

export default function Checkout({ onBack, onSuccess }: CheckoutProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const { user, profile } = useAuth();

  const [formData, setFormData] = useState({
    phone: profile?.phone || '',
    address: profile?.address || '',
    paymentMethod: 'cod' as 'phonepe' | 'paytm' | 'amazonpay' | 'cod',
  });

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

  const total = cartItems.reduce(
    (sum, item) => sum + (item.products?.price || 0) * item.quantity,
    0
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setProcessing(true);

    try {
      if (formData.paymentMethod !== 'cod') {
        alert(`Redirecting to ${formData.paymentMethod.toUpperCase()} payment gateway...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user!.id,
          total_amount: total,
          payment_method: formData.paymentMethod,
          payment_status: formData.paymentMethod === 'cod' ? 'pending' : 'paid',
          order_status: 'pending',
          shipping_address: formData.address,
          phone: formData.phone,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.products?.price || 0,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      for (const item of cartItems) {
        const newStock = (item.products?.stock || 0) - item.quantity;
        const newSold = (item.products?.sold || 0) + item.quantity;

        await supabase
          .from('products')
          .update({
            stock: newStock,
            sold: newSold,
          })
          .eq('id', item.product_id);
      }

      const { error: clearError } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user!.id);

      if (clearError) throw clearError;

      if (profile?.phone !== formData.phone || profile?.address !== formData.address) {
        await supabase
          .from('profiles')
          .update({
            phone: formData.phone,
            address: formData.address,
          })
          .eq('id', user!.id);
      }

      alert('Order placed successfully!');
      onSuccess();
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setProcessing(false);
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-600 mb-4">Your cart is empty</p>
        <button
          onClick={onBack}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        Back to Cart
      </button>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Shipping Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Shipping Address
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Payment Method
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="phonepe"
                      checked={formData.paymentMethod === 'phonepe'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                      className="w-4 h-4"
                    />
                    <Smartphone className="w-5 h-5 ml-3 mr-2 text-purple-600" />
                    <span className="font-medium">PhonePe</span>
                  </label>

                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paytm"
                      checked={formData.paymentMethod === 'paytm'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                      className="w-4 h-4"
                    />
                    <Smartphone className="w-5 h-5 ml-3 mr-2 text-blue-600" />
                    <span className="font-medium">Paytm</span>
                  </label>

                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="amazonpay"
                      checked={formData.paymentMethod === 'amazonpay'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                      className="w-4 h-4"
                    />
                    <CreditCard className="w-5 h-5 ml-3 mr-2 text-orange-600" />
                    <span className="font-medium">Amazon Pay</span>
                  </label>

                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                      className="w-4 h-4"
                    />
                    <CreditCard className="w-5 h-5 ml-3 mr-2 text-green-600" />
                    <span className="font-medium">Cash on Delivery</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold disabled:bg-gray-300"
              >
                {processing ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>

            <div className="space-y-3 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.products?.title} x{item.quantity}
                  </span>
                  <span className="font-medium">
                    ${((item.products?.price || 0) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold border-t pt-4">
                <span>Total:</span>
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
