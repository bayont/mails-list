import { useNavigate, useParams } from 'react-router-dom';

import { mailData } from '../../mailData';
import { Logo } from '../Logo/Logo';
import styles from './MailDetails.module.css';

export function MailDetails() {
   const { mailId } = useParams();
   const navigate = useNavigate();
   if (mailId === undefined || mailId === '') {
      return <>Mail undefined!</>;
   }
   const mailArray = mailData.filter((m) => m.id.toString() === mailId);
   if (mailArray.length < 1) {
      return <>Mail not found!</>;
   }
   const mail = mailArray[0];

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
