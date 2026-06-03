const Filters = ({ sortBy, onSortChange, selectedRoasts, selectedRegions, onFilterChange }) => {
  return (
    <aside className="w-64 flex-shrink-0 space-y-10">
      <div>
        <h3 className="font-serif font-bold text-xl text-stone-800 mb-4">Sort By</h3>
        <select
          className="w-full p-3 bg-stone-100 border-none rounded-lg text-stone-600 outline-none cursor-pointer"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="relevance">Relevance</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
        </select>
      </div>

      <div>
        <h3 className="font-serif font-bold text-xl text-stone-800 mb-4">Roast Level</h3>
        <div className="space-y-3">
          {['Light Roast', 'Medium Roast', 'Dark Roast'].map((level) => (
            <label key={level} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-5 h-5 accent-stone-800 cursor-pointer"
                checked={selectedRoasts.includes(level)}
                onChange={() => onFilterChange('roast', level)}
              />
              <span className="text-stone-600 group-hover:text-stone-900 transition-colors">{level}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-serif font-bold text-xl text-stone-800 mb-4">Region</h3>
        <div className="space-y-3">
          {['Africa', 'Americas', 'Asia'].map((region) => (
            <label key={region} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-5 h-5 accent-stone-800 cursor-pointer"
                checked={selectedRegions.includes(region)}
                onChange={() => onFilterChange('region', region)}
              />
              <span className="text-stone-600 group-hover:text-stone-900 transition-colors">{region}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Filters;  