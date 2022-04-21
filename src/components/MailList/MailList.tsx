import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { createPages, getMailsCountFormatted } from '../../utils/pages';
import { useAppSelector } from '../../utils/store';
import { MailListElement } from '../MailListElement/MailListElement';
import { NoMoreMails } from '../NoMoreMails/NoMoreMails';
import { Pagination } from '../Pagination/Pagination';
import { SearchBox } from '../SearchBox/SearchBox';
import { UnreadButton } from '../UnreadButton/UnreadButton';
import styles from './MailList.module.css';

type Params = {
   pageId: string;
};

export function MailList() {
   const { pageId } = useParams<Params>();
   const list = useRef<HTMLUListElement>(null);

   const navigate = useNavigate();

   const mails = useAppSelector(
      (state) => state.mails,
      (mailsA, mailsB) => mailsA.length === mailsB.length,
   );

   const mailsPerPage = 10;
   const isPaginationNeeded = mails.length > mailsPerPage;
   const pages = createPages(mails, mailsPerPage);
   const currentPage = Number(pageId) > pages.length ? 0 : Number(pageId) - 1;
   const page = pages[currentPage];
   const countFormatted = getMailsCountFormatted(
      currentPage,
      mailsPerPage,
      mails.length,
   );

   function changePage(pageIndex: number) {
      navigate(`/pages/${pageIndex + 1}`);
   }

   return (
      <>
         <div className={styles.flexTable}>
            <div className={styles.topBar}>
               <UnreadButton />
               <SearchBox />
               <div className={styles.shownMessageCount}>{countFormatted}</div>
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
