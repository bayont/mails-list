import classNames from 'classnames';

import { usePagination } from '../../hooks/usePagination';
import { Mail } from '../../mailData';
import styles from './Pagination.module.css';

type Props = {
   pages: Mail[][];
   changePage: Function;
   currentPage: number;
};

export function Pagination({ pages, changePage, currentPage }: Props) {
   const pagination = usePagination(currentPage, pages);

   return pages.length < 10 ? (
      <>
         <ul className={styles.pages}>
            {pages.map((page, i) => (
               <li key={i + 1}>
                  <button
                     onClick={() => changePage(i)}
                     className={classNames(
                        styles.page,
                        currentPage === i ? styles.current : '',
                     )}
                  >
                     {i + 1}
                  </button>
               </li>
            ))}
         </ul>
      </>
   ) : (
      <>
         <ul className={styles.pages}>
            {pagination.left > 0 && (
               <>
                  <li
                     className={styles.page}
                     key={0}
                     onClick={() => changePage(0)}
                  >
                     <button>1</button>
                  </li>
                  {pagination.left !== 1 && (
                     <li className={styles.separator}>...</li>
                  )}
               </>
            )}
            {pagination.pages.map((page) => {
               const i = pages.indexOf(page);

               return (
                  <li
                     onClick={() => changePage(i)}
                     className={classNames(
                        styles.page,
                        currentPage === i ? styles.current : '',
                     )}
                     key={i + 1}
                  >
                     <button>{i + 1}</button>
                  </li>
               );
            })}
            {pagination.right < pages.length && (
               <>
                  {pagination.right + 1 !== pages.length && (
                     <li className={styles.separator}>...</li>
                  )}
                  <li
                     className={styles.page}
                     key={pages.length}
                     onClick={() => changePage(pages.length - 1)}
                  >
                     <button>{pages.length}</button>
                  </li>
               </>
            )}
         </ul>
      </>
   );
}
