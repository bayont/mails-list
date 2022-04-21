import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { mailData } from '../../mailData';
import { markAsRead, useAppDispatch } from '../../utils/store';
import styles from './MailDetails.module.css';

export function MailDetails() {
   const dispatch = useAppDispatch();
   const { mailId } = useParams();
   const navigate = useNavigate();

   const mail = useMemo(
      () => mailData.filter((m) => m.id === Number(mailId))[0],
      [mailId],
   );

   useEffect(() => {
      dispatch(markAsRead(mail));
   }, [dispatch, mail]);

   return (
      <>
         <div className={styles.backButton}>
            <div
               onClick={() => {
                  navigate(-1);
               }}
            >
               Back to list
            </div>
         </div>
         <h1>Mail Details</h1>
         <div className={styles.mailDetails}>
            <h3>Subject: {mail.subject}</h3>
            <div className={styles.sentFrom}>
               <b>from</b>: {mail.from}
            </div>
            <div className={styles.sentDate}>
               <b>date</b>: {mail.sent_date}
            </div>
            <div className={styles.snippets}>
               <b>snippet</b>: {mail.snippet}
            </div>
         </div>
      </>
   );
}
