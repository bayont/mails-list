import classNames from 'classnames';

import { Mail } from '../../mailData';
import {
   toggleIsRead,
   useAppDispatch,
   useAppSelector,
} from '../../utils/store';
import styles from './Checkbox.module.css';

type Props = {
   mail: Mail;
};

export function Checkbox({ mail }: Props) {
   const id = mail.id.toString();
   const dispatch = useAppDispatch();

   return (
      <div className={styles.checkbox}>
         <input
            type="checkbox"
            onChange={() => {
               dispatch(toggleIsRead(mail));
            }}
            onClick={(e) => e.stopPropagation()}
            checked={mail.is_unread}
            name={id}
            id={id}
            className={styles.cb}
         />
         <span className={classNames(`material-icons`, styles.icon)}>
            {!mail.is_unread ? 'mark_email_read' : 'markunread'}
         </span>
         <div className={styles.hint}>
            <div className={styles.arrow}></div>
            <div className={styles.hintBox}>
               Mark as {mail.is_unread ? 'R' : 'Unr'}ead
            </div>
         </div>
      </div>
   );
}
