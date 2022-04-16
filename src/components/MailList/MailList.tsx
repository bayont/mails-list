import { Mail, mailData } from "../../mailData";
import { MailListElement } from "../MailListElement/MailListElement";
import styles from "./MailList.module.css";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { Logo } from "../Logo/Logo";
import { createPages } from "../../utils/pages";
import { Pagination } from "../Pagination/Pagination";

export function MailList() {
  const dateComparer = (m1: Mail, m2: Mail) => {
    const date1 = new Date(m1.sent_date).getTime();
    const date2 = new Date(m2.sent_date).getTime();
    return date2 - date1;
  };

  const [mails, setMails] = useState(mailData.sort(dateComparer));
  const [mailsPerPage, setMailsPerPage] = useState(5);

  const [isPaginationNeeded, setIsPaginationNeeded] = useState(() => {
    if (mails.length > mailsPerPage) {
      return true;
    } else return false;
  });

  useEffect(() => {
    if (mails.length > mailsPerPage) {
      setIsPaginationNeeded(true);
    } else setIsPaginationNeeded(false);
  }, [mails, mailsPerPage]);

  const [pages, setPages] = useState<Mail[][]>(
    createPages(mails, mailsPerPage)
  );

  useEffect(() => {
    setPages(createPages(mails, mailsPerPage));
  }, [mails, mailsPerPage]);

  const [currentPage, setCurrentPage] = useState(0);

  function changePage(pageIndex: number) {
    setCurrentPage(pageIndex);
  }

  function toggleIsRead(id: number, mark?: boolean) {
    const clickedElementIndex = mails.findIndex((mail) => mail.id === id);
    return new Promise((res, rej) => {
      setMails((old) => {
        const clickedElement = old[clickedElementIndex];
        clickedElement.is_unread = mark ? false : !clickedElement.is_unread;
        const newItems = [...old];
        newItems.splice(clickedElementIndex, 1, clickedElement);
        return newItems;
      });
      res(true);
    });
  }
  const page = pages[currentPage];

  return (
    <>
      <header>
        <Logo />
      </header>
      <h2>
        Already read: {mails.filter((m) => m.is_unread === false).length}/
        {mails.length}
      </h2>
      <div className={styles.flexTable}>
        <ul>
          {page.map((mail) => {
            return (
              <MailListElement
                key={`${mail.id}`}
                toggleIsRead={toggleIsRead}
                isChecked={!mail.is_unread}
                mail={mail}
              />
            );
          })}
        </ul>
      </div>
      {isPaginationNeeded && (
        <Pagination
          currentPage={currentPage}
          changePage={changePage}
          pages={pages}
        />
      )}
    </>
  );
}
