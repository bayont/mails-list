import classNames from "classnames";
import { Link } from "react-router-dom";
import { Mail } from "../../mailData";
import { Checkbox } from "../Checkbox/Checkbox";
import styles from "./MailListElement.module.css";

type Props = {
  mail: Mail;
  isChecked: boolean;
  markAsRead: Function;
  toggleIsRead: Function;
};
export function MailListElement({
  mail,
  isChecked,
  markAsRead,
  toggleIsRead,
}: Props) {
  const liClasses = mail.is_unread
    ? classNames(styles.flexRow, styles.unread)
    : styles.flexRow;
  return (
    <li className={liClasses}>
      <div className={classNames(styles.column, styles.cbWrapper)}>
        <Checkbox
          isChecked={isChecked}
          mIsUnRead={mail.is_unread}
          mId={mail.id}
          toggleIsRead={toggleIsRead}
        />
      </div>
      <Link
        to={`mails/${mail.id}`}
        key={`${mail.id}`}
        onClick={() => markAsRead(mail.id)}
        className={styles.widthFull}
      >
        <div className={styles.flexContent}>
          <div className={styles.flexInner}>
            <div className={classNames(styles.inner, styles.from)}>
              {mail.from}
            </div>
            <div className={styles.item}>
              <span className={styles.subject}>{mail.subject}</span>
              <span className={styles.snippet}>
                {mail.snippet === "" ? "" : ` - ${mail.snippet}`}
              </span>
            </div>
          </div>
          <div className={classNames(styles.item, styles.date)}>
            {mail.sent_date}
          </div>
        </div>
      </Link>
    </li>
  );
}
