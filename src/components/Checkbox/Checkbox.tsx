import classNames from 'classnames';

import styles from './Checkbox.module.css';

type Props = {
   isChecked: boolean;
   mId: number;
   mIsUnRead: boolean;
   toggleIsRead: Function;
};

export function Checkbox({ isChecked, mId, mIsUnRead, toggleIsRead }: Props) {
   const id = mId.toString();
   return (
      <div className={styles.checkbox}>
         <input
            type="checkbox"
            onChange={() => toggleIsRead(mId)}
            onClick={(e) => e.stopPropagation()}
            checked={isChecked}
            name={id}
            id={id}
            className={styles.cb}
         />
         <span className={classNames(`material-icons`, styles.icon)}>
            {!mIsUnRead ? 'mark_email_read' : 'markunread'}
         </span>
         <div className={styles.hint}>
            <div className={styles.arrow}></div>
            <div className={styles.hintBox}>
               Mark as {mIsUnRead ? 'R' : 'Unr'}ead
            </div>
         </div>
      </div>
   );
}
