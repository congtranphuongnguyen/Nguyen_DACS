import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../../products';

const ProductList = ({ sortBy, selectedRoasts, selectedRegions, searchQuery, onResetFilters, currentPage }) => {
  // 1. Filter products by metadata and category based on page
  const categoryToDisplay = currentPage === 1 ? 'beans' : 'gear';

  const filteredProducts = products.filter(product => {
    // Only show products of the current page's category
    if (product.category !== categoryToDisplay) return false;

    const roastMatch = selectedRoasts.length === 0 || selectedRoasts.includes(product.roast);
    const regionMatch = selectedRegions.length === 0 || selectedRegions.includes(product.region);
    
    const searchLower = searchQuery.toLowerCase();
    const searchMatch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchLower) || 
      (product.roast && product.roast.toLowerCase().includes(searchLower)) || 
      (product.region && product.region.toLowerCase().includes(searchLower));

    return roastMatch && regionMatch && searchMatch;
  });

  // 2. Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low-high') {
      return parseFloat(a.price) - parseFloat(b.price);
    }
    if (sortBy === 'price-high-low') {
      return parseFloat(b.price) - parseFloat(a.price);
    }
    return 0; // Default to 'relevance' (original order)
  });

  const handleResetClick = () => {
    if (onResetFilters) {
      onResetFilters();
    }
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <section className="flex-1">
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 transition-all duration-500">
          {sortedProducts.map((product) => (
            <div 
              key={product.id} 
              className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 px-8 bg-stone-50 rounded-[40px] border border-stone-100 animate-in fade-in zoom-in duration-700">
          <div className="w-24 h-24 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce transition-all duration-1000">
            <span className="material-symbols-outlined text-stone-300 text-5xl">inventory_2</span>
          </div>
          <h3 className="text-2xl font-headline font-bold text-stone-800 mb-4 tracking-tight leading-snug">Rất tiếc, chúng tôi không tìm thấy lựa chọn này.</h3>
          <p className="text-stone-500 italic max-w-md mx-auto leading-relaxed text-base font-sans font-medium">
            Hãy thử từ khóa khác nhé! Chúng tôi vẫn còn rất nhiều hành trình hương vị khác đang chờ bạn khám phá.
          </p>

          <button 
            onClick={handleResetClick}
            className="mt-10 px-10 py-5 bg-stone-800 text-white rounded-2xl text-sm font-bold hover:bg-stone-700 transition-all hover:shadow-xl hover:-translate-y-1 active:scale-95 flex items-center gap-2 mx-auto"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
            RESET FILTERS
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductList;
