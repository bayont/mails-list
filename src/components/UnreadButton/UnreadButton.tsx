import {
   markAllAsRead,
   useAppDispatch,
   useAppSelector,
} from '../../utils/store';
import styles from './UnreadButton.module.css';

export function UnreadButton() {
   const unreadCount = useAppSelector(
      (state) => state.mails.filter((m) => m.is_unread).length,
   );
   const dispatch = useAppDispatch();

   return (
      <button
         className={styles.newMessages}
         onClick={() => dispatch(markAllAsRead())}
      >
         {unreadCount} unread mail{unreadCount !== 1 ? 's' : ''}
      </button>
   );
}
