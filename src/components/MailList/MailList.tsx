import { Mail, mailData } from "../../mailData";
import { MailListElement } from "../MailListElement/MailListElement";
import styles from "./MailList.module.css";
import { useEffect, useRef, useState } from "react";
import { Logo } from "../Logo/Logo";
import { createPages } from "../../utils/pages";
import { Pagination } from "../Pagination/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { SearchBox } from "../SearchBox/SearchBox";
import { getAllMails } from "../../utils/mails";

export function MailList() {
  const [mails, setMails] = useState(getAllMails());
  const [mailsPerPage, setMailsPerPage] = useState(10);

  const [isPaginationNeeded, setIsPaginationNeeded] = useState(() => {
    return mails.length > mailsPerPage;
  });

  useEffect(() => {
    setIsPaginationNeeded(mails.length > mailsPerPage);
    setPages(createPages(mails, mailsPerPage));
  }, [mails, mailsPerPage]);

  const [pages, setPages] = useState<Mail[][]>(
    createPages(mails, mailsPerPage)
  );

  const navigate = useNavigate();
  const { pageId } = useParams();
  const currentPage =
    pageId == null || isNaN(parseInt(pageId)) || parseInt(pageId) > pages.length
      ? 0
      : parseInt(pageId) - 1;

  function changePage(pageIndex: number) {
    navigate(`/pages/${pageIndex + 1}`);
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
  function markAllMailsAsRead() {
    setMails((m) =>
      m.map((mail) => {
        mail.is_unread = false;
        return mail;
      })
    );
  }
  function findMails(searchQuery: string) {
    setMails(() => {
      return !searchQuery
        ? getAllMails()
        : getAllMails().filter((m) => {
            return new RegExp(`${searchQuery}`, "i").test(
              ` ${m.from} ${m.subject}  ${m.snippet} `
            );
          });
    });
    changePage(0);
  }

  const page = pages[currentPage];
  const unreadCount = mails.filter((m) => m.is_unread).length;

  const list = useRef<HTMLUListElement>(null);

  return (
    <>
      <header>
        <Logo />
      </header>
      <div className={styles.flexTable}>
        <div className={styles.topBar}>
          <button className={styles.newMessages} onClick={markAllMailsAsRead}>
            {unreadCount} unread mail{unreadCount !== 1 ? "s" : ""}
          </button>

          <SearchBox findMails={findMails} />

          <div className={styles.shownMessageCount}>
            {(currentPage + 1) * mailsPerPage + 1 - mailsPerPage}-
            {(currentPage + 1) * mailsPerPage > mails.length
              ? mails.length
              : (currentPage + 1) * mailsPerPage}{" "}
            of {mails.length}
          </div>
        </div>
        <ul ref={list} className={styles.list}>
          {page.length ? (
            page.map((mail) => {
              return (
                <MailListElement
                  key={`${mail.id}`}
                  toggleIsRead={toggleIsRead}
                  isChecked={!mail.is_unread}
                  mail={mail}
                />
              );
            })
          ) : (
            <div className={styles.noMails}>
              <div className={styles.noMailsContent}>
                <span className="material-icons">drafts</span>
                More mails not found!
              </div>
            </div>
          )}
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
