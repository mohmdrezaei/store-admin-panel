import { json, useSearchParams } from "react-router-dom";
import styles from "./Pagination.module.css"
import { useEffect } from "react";

function Pagination({page , setPage, pages}) {
  const [searchParams , setSearchParams] = useSearchParams();
  
  useEffect(() => {
    setPage(JSON.parse(searchParams.get('page')) || 1);
  }, [searchParams]);
  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
    setSearchParams({page : pageNumber});
  };
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => handlePageClick(number)}
          style={{
            backgroundColor: page === number ? '#55A3F0' : 'inherit',
            color: page === number ? 'white' : '#8D8D8D80',
          }}
        >
          {number}
        </button>
      ))}
      
    </div>
  );
}

export default Pagination