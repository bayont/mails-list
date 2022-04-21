import classNames from 'classnames';

import styles from './Logo.module.css';

export function Logo() {
   return (
      <>
         <div className={styles.flexWrapper}>
            <div className={styles.iconWrapper}>
               <span className={classNames('material-icons', styles.inboxIcon)}>
                  inbox
               </span>
            </div>
            <div className={styles.inboxInner}>Inbox</div>
         </div>
      </>
   );
}
