import { useState, useEffect } from 'react';
import { supabase, WishlistItem } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadWishlist();
    }
  }, [user]);

  async function loadWishlist() {
    try {
      const { data, error } = await supabase
        .from('wishlist_items')
        .select('*, products(*)')
        .eq('user_id', user!.id);

      if (error) throw error;
      setWishlistItems(data || []);
    } catch (error) {
      console.error('Error loading wishlist:', error);
    } finally {
      setLoading(false);
    }
  }

  async function removeFromWishlist(itemId: string) {
    try {
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      loadWishlist();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      alert('Failed to remove from wishlist');
    }
  }

  async function addToCart(productId: string) {
    try {
      const { data: existing } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user!.id)
        .eq('product_id', productId)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existing.quantity + 1 })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user!.id,
            product_id: productId,
            quantity: 1,
          });

        if (error) throw error;
      }

      alert('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart');
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading wishlist...</div>;
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <Heart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-600">Save your favorite products here!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Heart className="w-6 h-6 mr-2 text-red-500 fill-current" />
          My Wishlist ({wishlistItems.length} items)
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition">
            {item.products?.images[0] && (
              <img
                src={item.products.images[0]}
                alt={item.products.title}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.products?.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {item.products?.description}
              </p>
              <p className="text-xl font-bold text-blue-600 mb-4">
                ${item.products?.price}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => addToCart(item.product_id)}
                  disabled={item.products?.stock === 0}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center disabled:bg-gray-300"
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
