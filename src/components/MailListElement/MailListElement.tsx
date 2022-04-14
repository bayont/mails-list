import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { Mail } from "../../mailData";
import { Checkbox } from "../Checkbox/Checkbox";
import styles from "./MailListElement.module.css";

function processDate(date: string): string {
  const dateFull = new Date(date);
  const now = new Date();
  const yearsDiff = (now.getTime() - dateFull.getTime()) / 36e5 / 24 / 365.25;
  if (yearsDiff < 1) {
    const monthsDiff = yearsDiff * 12;
    if (monthsDiff < 1) {
      const daysDiff = yearsDiff * 365.25;
      if (daysDiff < 1) {
        const hoursDiff = daysDiff * 24;
        if (hoursDiff < 1) {
          const minutesDiff = hoursDiff / 60;
          if (minutesDiff < 1)
            return `${Math.round(minutesDiff / 60)} second${
              Math.round(minutesDiff / 60) === 1.0 ? "" : "s"
            } ago`;
          else
            return `${Math.round(minutesDiff)} minute${
              Math.round(minutesDiff) === 1.0 ? "" : "s"
            } ago`;
        } else
          return `${Math.round(hoursDiff)} hour${
            Math.round(hoursDiff) === 1.0 ? "" : "s"
          } ago`;
      } else
        return `${Math.round(daysDiff)} day${
          Math.round(daysDiff) === 1.0 ? "" : "s"
        } ago`;
    } else
      return `${Math.round(monthsDiff)} month${
        Math.round(monthsDiff) === 1.0 ? "" : "s"
      } ago`;
  } else
    return `${Math.round(yearsDiff)} year${
      Math.round(yearsDiff) === 1.0 ? "" : "s"
    } ago`;
}

type Props = {
  mail: Mail;
  isChecked: boolean;
  toggleIsRead: Function;
};
export function MailListElement({ mail, isChecked, toggleIsRead }: Props) {
  const liClasses = mail.is_unread
    ? classNames(styles.flexRow, styles.unread)
    : styles.flexRow;
  const navigate = useNavigate();

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
      <div
        key={`${mail.id}`}
        onClick={async () => {
          await toggleIsRead(mail.id, true);
          navigate(`mails/${mail.id}`);
        }}
        className={classNames(styles.widthFull, styles.button)}
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
            {processDate(mail.sent_date)}
            <div className={styles.hintFullDate}>
              {new Date(mail.sent_date).toLocaleString().slice(0, -3)}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
