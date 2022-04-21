import { useEffect, useMemo, useRef, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Mail } from '../../mailData';
import { createPages } from '../../utils/pages';
import {
   markAllMailsAsRead,
   useAppDispatch,
   useAppSelector,
} from '../../utils/store';
import { Logo } from '../Logo/Logo';
import { MailListElement } from '../MailListElement/MailListElement';
import { NoMoreMails } from '../NoMoreMails/NoMoreMails';
import { Pagination } from '../Pagination/Pagination';
import { SearchBox } from '../SearchBox/SearchBox';
import styles from './MailList.module.css';

export function MailList() {
   const list = useRef<HTMLUListElement>(null);

   const { pageId } = useParams();
   const navigate = useNavigate();

   const dispatch = useAppDispatch();
   const mails = useAppSelector(
      (state) => state.mails,
      (mailsA, mailsB) => {
         return mailsA.length === mailsB.length;
      },
   );

   const [mailsPerPage, setMailsPerPage] = useState(10);
   const [isPaginationNeeded, setIsPaginationNeeded] = useState(() => {
      return mails.length > mailsPerPage;
   });
   const [pages, setPages] = useState<Mail[][]>(
      createPages(mails, mailsPerPage),
   );
   const currentPage =
      pageId == null ||
      isNaN(parseInt(pageId)) ||
      parseInt(pageId) > pages.length
         ? 0
         : parseInt(pageId) - 1;
   const page = pages[currentPage];

   const unreadCount = useMemo<number>(
      () => mails.filter((m) => m.is_unread).length,
      [mails],
   );

   function changePage(pageIndex: number) {
      navigate(`/pages/${pageIndex + 1}`);
   }

   useEffect(() => {
      setIsPaginationNeeded(mails.length > mailsPerPage);
      setPages(createPages(mails, mailsPerPage));
   }, [mails, mailsPerPage]);

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
                  {unreadCount} unread mail{unreadCount !== 1 ? 's' : ''}
               </button>

               <SearchBox />

               <div className={styles.shownMessageCount}>
                  {(currentPage + 1) * mailsPerPage + 1 - mailsPerPage}-
                  {(currentPage + 1) * mailsPerPage > mails.length
                     ? mails.length
                     : (currentPage + 1) * mailsPerPage}{' '}
                  of {mails.length}
               </div>
            </div>
            <ul ref={list} className={styles.list}>
               {page.length ? (
                  page.map((mail) => {
                     return (
                        <MailListElement key={`${mail.id}`} mailID={mail.id} />
                     );
                  })
               ) : (
                  <NoMoreMails />
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
