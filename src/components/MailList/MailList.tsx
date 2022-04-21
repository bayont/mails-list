import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
   const { pageId } = useParams();
   const list = useRef<HTMLUListElement>(null);

   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const mails = useAppSelector(
      (state) => state.mails,
      (mailsA, mailsB) => mailsA.length === mailsB.length,
   );

   const mailsPerPage = 10;
   const isPaginationNeeded = mails.length > mailsPerPage;
   const pages = createPages(mails, mailsPerPage);
   const currentPage =
      pageId == null ||
      isNaN(parseInt(pageId)) ||
      parseInt(pageId) > pages.length
         ? 0
         : parseInt(pageId) - 1;
   const page = pages[currentPage];
   const unreadCount = mails.filter((m) => m.is_unread).length;

   function changePage(pageIndex: number) {
      navigate(`/pages/${pageIndex + 1}`);
   }

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
