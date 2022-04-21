import { Mail } from '../mailData';

const max = 5;

type usePaginationType = {
   left: number;
   right: number;
   pages: Mail[][];
};

export function usePagination(
   currentPage: number,
   pages: Mail[][],
): usePaginationType {
   const left =
      currentPage - max / 2 > 0 ? Math.ceil(currentPage - max / 2) : 0;
   const right = left + max;
   const midPages = pages.slice(left, right);
   return { left, right, pages: midPages };
}
