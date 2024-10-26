import { useState } from 'react'

function Pagination({page , setPage, pages}) {
  
    
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page <= pages) {
      setPage(page +1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <button onClick={handlePrevious} disabled={page === 1}>
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => handlePageClick(number)}
          style={{
            margin: '0 5px',
            backgroundColor: page === number ? 'blue' : 'white',
            color: page === number ? 'white' : 'black',
          }}
        >
          {number}
        </button>
      ))}
      <button onClick={handleNext} disabled={page === pages}>
        Next
      </button>
    </div>
  );
}

export default Pagination