import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';

import { useForceUpdate } from '../../hooks/useForceUpdate';
import { Mail } from '../../mailData';
import { processDate } from '../../utils/dates';
import {
   markMailAsRead,
   useAppDispatch,
   useAppSelector,
} from '../../utils/store';
import { Checkbox } from '../Checkbox/Checkbox';
import styles from './MailListElement.module.css';

type Props = {
   mailID: number;
};

export function MailListElement({ mailID }: Props) {
   const mail = useAppSelector(
      (state) => state.mails.filter((m) => m.id === mailID)[0],
   );

   const liClasses = classNames(
      mail.is_unread
         ? classNames(styles.flexRow, styles.unread)
         : styles.flexRow,
      styles.button,
   );

   const navigate = useNavigate();
   const forceUpdate = useForceUpdate();

   return (
      <li>
         <Link className={liClasses} to={`mails/${mail.id}`}>
            <div key={`${mail.id}`} className={classNames(styles.widthFull)}>
               <div className={styles.flexContent}>
                  <div className={styles.flexInner}>
                     <div className={classNames(styles.inner, styles.from)}>
                        {mail.from}
                     </div>
                     <div className={styles.item}>
                        <span className={styles.subject}>{mail.subject}</span>
                        <span className={styles.snippet}>
                           {mail.snippet && ` - ${mail.snippet}`}
                        </span>
                     </div>
                  </div>
                  <div className={classNames(styles.item, styles.date)}>
                     <div>{processDate(mail.sent_date)}</div>
                     <div className={styles.hintFullDate}>
                        {new Date(mail.sent_date).toLocaleString().slice(0, -3)}
                     </div>
                  </div>
               </div>
            </div>
            <div className={classNames(styles.column, styles.cbWrapper)}>
               <Checkbox mId={mail.id} updateParent={forceUpdate} />
            </div>
         </Link>
      </li>
   );
}
