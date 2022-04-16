import classNames from "classnames";
import { Mail } from "../../mailData";
import styles from "./Pagination.module.css";

type Props = {
  pages: Mail[][];
  changePage: Function;
  currentPage: number;
};

export function Pagination({ pages, changePage, currentPage }: Props) {
  return (
    <>
      <ul className={styles.pages}>
        {pages.map((page, i) => {
          return (
            <li
              onClick={() => changePage(i)}
              className={classNames(
                styles.page,
                currentPage == i ? styles.current : ""
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
}
