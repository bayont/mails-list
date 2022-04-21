import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { mailData } from '../../mailData';
import {
   markMailAsRead,
   useAppDispatch,
   useAppSelector,
} from '../../utils/store';
import { Logo } from '../Logo/Logo';
import styles from './MailDetails.module.css';

export function MailDetails() {
   const mails = useAppSelector((state) => state.mails);
   const dispatch = useAppDispatch();
   useEffect(() => {
      dispatch(markMailAsRead(mail));
   }, []);

   const { mailId } = useParams();
   const navigate = useNavigate();
   if (mailId === undefined || mailId === '') {
      return <>Mail undefined!</>;
   }
   const mailArray = mailData.filter((m) => m.id.toString() === mailId);
   if (mailArray.length < 1) {
      return <>Mail not found!</>;
   }

   const mail = mails.filter((m) => m.id === Number(mailId))[0];

   return (
      <>
         <header>
            <Logo />
         </header>
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
