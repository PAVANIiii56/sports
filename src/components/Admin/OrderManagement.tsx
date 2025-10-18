import { useState, useEffect } from 'react';
import { supabase, Order, OrderItem, Profile } from '../../lib/supabase';
import { ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react';

type OrderWithDetails = Order & {
  profiles?: Profile;
  order_items?: (OrderItem & { products?: { title: string } })[];
};

export default function OrderManagement() {
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          profiles (full_name, email, phone),
          order_items (
            *,
            products (title)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateOrderStatus(orderId: string, status: string) {
    try {
      const { error } = await supabase
        .from('orders')
        .update({
          order_status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (error) throw error;
      loadOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order status');
    }
  }

  async function updatePaymentStatus(orderId: string, status: string) {
    try {
      const { error } = await supabase
        .from('orders')
        .update({
          payment_status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (error) throw error;
      loadOrders();
    } catch (error) {
      console.error('Error updating payment:', error);
      alert('Failed to update payment status');
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

  if (loading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center">
        <ShoppingBag className="w-6 h-6 mr-2" />
        Order Management
      </h2>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No orders yet</div>
        ) : (
          <div className="divide-y divide-gray-200">
            {orders.map((order) => (
              <div key={order.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        Order #{order.id.slice(0, 8)}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.order_status)}`}>
                        {order.order_status.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.payment_status)}`}>
                        {order.payment_status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Customer:</strong> {order.profiles?.full_name} ({order.profiles?.email})</p>
                      <p><strong>Phone:</strong> {order.phone}</p>
                      <p><strong>Payment Method:</strong> {order.payment_method.toUpperCase()}</p>
                      <p><strong>Total:</strong> ${order.total_amount}</p>
                      <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    {expandedOrder === order.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {expandedOrder === order.id && (
                  <div className="mt-4 space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Shipping Address:</h4>
                      <p className="text-sm text-gray-700">{order.shipping_address}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Order Items:</h4>
                      <div className="space-y-2">
                        {order.order_items?.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.products?.title}</span>
                            <span>{item.quantity} x ${item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Order Status
                        </label>
                        <select
                          value={order.order_status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Payment Status
                        </label>
                        <select
                          value={order.payment_status}
                          onChange={(e) => updatePaymentStatus(order.id, e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="failed">Failed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
