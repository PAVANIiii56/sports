import { Product } from '../../lib/supabase';
import { Heart, ShoppingCart } from 'lucide-react';

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  isInWishlist?: boolean;
};

export default function ProductCard({
  product,
  onAddToCart,
  onAddToWishlist,
  onViewDetails,
  isInWishlist
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group">
      <div className="relative overflow-hidden bg-gray-100 h-48 sm:h-56 md:h-64">
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-300 cursor-pointer"
            onClick={() => onViewDetails(product)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        <button
          onClick={() => onAddToWishlist(product)}
          className={`absolute top-3 right-3 p-2 rounded-full ${
            isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
          } hover:scale-110 transition shadow-lg`}
        >
          <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
        </button>
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-3 sm:p-4">
        <h3
          className="text-base sm:text-lg font-semibold text-gray-800 mb-2 cursor-pointer hover:text-blue-600 line-clamp-2"
          onClick={() => onViewDetails(product)}
        >
          {product.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-1 sm:gap-0">
          <span className="text-xl sm:text-2xl font-bold text-gray-900">
            ₹{product.price}
          </span>
          <span className="text-xs sm:text-sm text-gray-500">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
          className="w-full py-2 sm:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
