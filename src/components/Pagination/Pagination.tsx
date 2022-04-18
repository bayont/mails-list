import classNames from "classnames";
import { Mail } from "../../mailData";
import styles from "./Pagination.module.css";

type Props = {
  pages: Mail[][];
  changePage: Function;
  currentPage: number;
};

export function Pagination({ pages, changePage, currentPage }: Props) {
  if (pages.length < 10)
    return (
      <>
        <ul className={styles.pages}>
          {pages.map((page, i) => {
            return (
              <li
                onClick={() => changePage(i)}
                className={classNames(
                  styles.page,
                  currentPage === i ? styles.current : ""
                )}
                key={i + 1}
              >
                {i + 1}
              </li>
            );
          })}
        </ul>
      </>
    );

  const max = 5;
  const leftIndex =
    currentPage - max / 2 > 0 ? Math.ceil(currentPage - max / 2) : 0;
  const rightIndex = leftIndex + max;
  const midPages = pages.slice(leftIndex, rightIndex);
  return (
    <>
      <ul className={styles.pages}>
        {leftIndex > 0 ? (
          <>
            <li className={styles.page} key={0} onClick={() => changePage(0)}>
              1
            </li>
            {leftIndex === 1 ? null : (
              <li key="separatorStart" className={styles.separator}>
                ...
              </li>
            )}
          </>
        ) : null}
        {midPages.map((page, j) => {
          const i = pages.indexOf(page);
          return (
            <li
              onClick={() => changePage(i)}
              className={classNames(
                styles.page,
                currentPage === i ? styles.current : ""
              )}
              key={i + 1}
            >
              {i + 1}
            </li>
          );
        })}
        {rightIndex < pages.length ? (
          <>
            {rightIndex + 1 === pages.length ? null : (
              <li key="separatorEnd" className={styles.separator}>
                ...
              </li>
            )}
            <li
              className={styles.page}
              key={pages.length}
              onClick={() => changePage(pages.length - 1)}
            >
              {pages.length}
            </li>
          </>
        ) : null}
      </ul>
    </>
  );
}
