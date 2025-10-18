import { useState, useEffect } from 'react';
import { supabase, Order, OrderItem } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Package, ChevronDown, ChevronUp } from 'lucide-react';

type OrderWithDetails = Order & {
  order_items?: (OrderItem & { products?: { title: string; images: string[] } })[];
};

export default function Orders() {
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  async function loadOrders() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (title, images)
          )
        `)
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  }

  function getStatusColor(status: string) {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  }

  function getStatusProgress(status: string) {
    const steps = ['pending', 'confirmed', 'shipped', 'delivered'];
    const currentIndex = steps.indexOf(status);
    return currentIndex >= 0 ? ((currentIndex + 1) / steps.length) * 100 : 0;
  }

  if (loading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">No orders yet</h2>
        <p className="text-gray-600">Your order history will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center">
        <Package className="w-6 h-6 mr-2" />
        My Orders
      </h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">
                      Order #{order.id.slice(0, 8).toUpperCase()}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.order_status)}`}>
                      {order.order_status.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.payment_status)}`}>
                      Payment: {order.payment_status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                    <p><strong>Total:</strong> ${order.total_amount}</p>
                    <p><strong>Payment Method:</strong> {order.payment_method.toUpperCase()}</p>
                  </div>
                </div>

                <button
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  className="p-2 hover:bg-gray-100 rounded transition"
                >
                  {expandedOrder === order.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>

              {order.order_status !== 'cancelled' && order.order_status !== 'delivered' && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Order Progress</span>
                    <span>{Math.round(getStatusProgress(order.order_status))}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${getStatusProgress(order.order_status)}%` }}
                    />
                  </div>
                </div>
              )}

              {expandedOrder === order.id && (
                <div className="mt-6 space-y-4 border-t pt-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Order Items:</h4>
                    <div className="space-y-3">
                      {order.order_items?.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                          {item.products?.images[0] && (
                            <img
                              src={item.products.images[0]}
                              alt={item.products.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{item.products?.title}</p>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity} × ${item.price}
                            </p>
                          </div>
                          <p className="font-semibold text-gray-900">
                            ${(item.quantity * item.price).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-gray-800">Shipping Details:</h4>
                    <p className="text-sm text-gray-700 mb-2">{order.shipping_address}</p>
                    <p className="text-sm text-gray-700"><strong>Phone:</strong> {order.phone}</p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="font-semibold text-gray-800">Order Total:</span>
                    <span className="text-2xl font-bold text-blue-600">${order.total_amount}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
