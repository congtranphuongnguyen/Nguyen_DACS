import React from 'react';

const Pagination = ({ currentPage, onPageChange, totalPages = 2 }) => {
  return (
    <div className="mt-24 flex items-center justify-center gap-8">
      <button 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`material-symbols-outlined transition-colors cursor-pointer ${currentPage === 1 ? 'text-outline-variant opacity-30' : 'text-primary hover:scale-110'}`}
      >
        arrow_back
      </button>
      
      <div className="flex gap-6 font-label text-sm font-bold">
        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          const isActive = currentPage === pageNum;
          return (
            <span 
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`pb-1 cursor-pointer transition-all duration-300 border-b-2 ${isActive ? 'text-primary border-primary scale-110' : 'text-outline-variant border-transparent hover:text-primary hover:border-primary/30'}`}
            >
              0{pageNum}
            </span>
          );
        })}
      </div>

      <button 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`material-symbols-outlined transition-all cursor-pointer ${currentPage === totalPages ? 'text-outline-variant opacity-30' : 'text-primary hover:scale-110'}`}
      >
        arrow_forward
      </button>
    </div>
  );
};

export default Pagination;
