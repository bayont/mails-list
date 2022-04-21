import styles from './NoMoreMails.module.css';

export function NoMoreMails() {
   return (
      <>
         <div className={styles.noMails}>
            <div className={styles.noMailsContent}>
               <span className="material-icons">drafts</span>
               More mails not found!
            </div>
         </div>
      </>
   );
}
