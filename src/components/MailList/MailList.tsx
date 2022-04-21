import { Mail } from "../../mailData";
import { MailListElement } from "../MailListElement/MailListElement";
import styles from "./MailList.module.css";
import { useEffect, useRef, useState } from "react";
import { Logo } from "../Logo/Logo";
import { createPages } from "../../utils/pages";
import { Pagination } from "../Pagination/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { SearchBox } from "../SearchBox/SearchBox";
import { getAllMails } from "../../utils/mails";

import {
  useAppSelector,
  useAppDispatch,
  markMailAsRead,
  markAllMailsAsRead,
  setMails,
} from "../../utils/store";

export function MailList() {
  const dispatch = useAppDispatch();
  const mails2 = useAppSelector((state) => state.mails);
  const [mailsPerPage, setMailsPerPage] = useState(10);

  const [isPaginationNeeded, setIsPaginationNeeded] = useState(() => {
    return mails2.length > mailsPerPage;
  });

  useEffect(() => {
    setIsPaginationNeeded(mails2.length > mailsPerPage);
    setPages(createPages(mails2, mailsPerPage));
  }, [mails2, mailsPerPage]);

  const [pages, setPages] = useState<Mail[][]>(
    createPages(mails2, mailsPerPage)
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

  function findMails(searchQuery: string) {
    const newMails = getAllMails();
    !searchQuery
      ? getAllMails()
      : getAllMails().filter((m) => {
          return new RegExp(`${searchQuery}`, "i").test(
            ` ${m.from} ${m.subject}  ${m.snippet} `
          );
        });
    dispatch(setMails(newMails));
    changePage(0);
  }

  const page = pages[currentPage];
  const unreadCount = mails2.filter((m) => m.is_unread).length;

  const list = useRef<HTMLUListElement>(null);

  return (
    <>
      <header>
        <Logo />
      </header>
      <div className={styles.flexTable}>
        <div className={styles.topBar}>
          <button
            className={styles.newMessages}
            onClick={() => dispatch(markAllMailsAsRead)}
          >
            {unreadCount} unread mail{unreadCount !== 1 ? "s" : ""}
          </button>

          <SearchBox findMails={findMails} />

          <div className={styles.shownMessageCount}>
            {(currentPage + 1) * mailsPerPage + 1 - mailsPerPage}-
            {(currentPage + 1) * mailsPerPage > mails2.length
              ? mails2.length
              : (currentPage + 1) * mailsPerPage}{" "}
            of {mails2.length}
          </div>
        </div>
        <ul ref={list} className={styles.list}>
          {page.length ? (
            page.map((mail) => {
              return (
                <MailListElement
                  key={`${mail.id}`}
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
