import classNames from "classnames";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, mailData } from "../../mailData";
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
      <div className={classNames(styles.column, styles.cb)}>
        <div className={styles.checkbox}>
          <label htmlFor={`${mail.id}`}>
            {mail.is_unread ? "Unr" : "R"}ead
          </label>
          <input
            type="checkbox"
            checked={isChecked}
            onClick={() => toggleIsRead(mail.id)}
            name={`${mail.id}`}
            id={`${mail.id}`}
          />
        </div>
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
                {mail.snippet == "" ? "" : ` - ${mail.snippet}`}
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
