import { useMemo } from 'react';

const usePagination = ({ items, itemsPerPage, currentPage, setCurrentPage }) => {
  const offset = currentPage * itemsPerPage;

  const currentItems = useMemo(() => 
    items?.slice(offset, offset + itemsPerPage) || [], 
    [items, offset, itemsPerPage]
  );

  const pageCount = useMemo(() => 
    Math.ceil(items?.length / itemsPerPage), 
    [items, itemsPerPage]
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    currentItems,
    pageCount,
    handlePageClick
  };
};

export default usePagination;
