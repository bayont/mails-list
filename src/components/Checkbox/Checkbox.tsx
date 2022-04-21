import classNames from 'classnames';

import {
   toggleIsRead,
   useAppDispatch,
   useAppSelector,
} from '../../utils/store';
import styles from './Checkbox.module.css';

type Props = {
   mId: number;
   updateParent: Function;
};

export function Checkbox({ mId, updateParent }: Props) {
   const id = mId.toString();
   const mail = useAppSelector(
      (state) => state.mails.filter((m) => m.id == mId)[0],
   );
   const dispatch = useAppDispatch();

   return (
      <div className={styles.checkbox}>
         <input
            type="checkbox"
            onChange={() => {
               dispatch(toggleIsRead(mail));
               updateParent(mail.is_unread);
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
