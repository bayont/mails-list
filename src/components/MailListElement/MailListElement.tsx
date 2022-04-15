import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { Mail } from "../../mailData";
import { Checkbox } from "../Checkbox/Checkbox";
import styles from "./MailListElement.module.css";
import { processDate } from "../../utils";

type Props = {
  mail: Mail;
  isChecked: boolean;
  toggleIsRead: Function;
};

export function MailListElement({ mail, isChecked, toggleIsRead }: Props) {
  const liClasses = classNames(
    mail.is_unread ? classNames(styles.flexRow, styles.unread) : styles.flexRow,
    styles.button
  );
  const navigate = useNavigate();

  return (
    <li
      className={liClasses}
      onClick={async () => {
        await toggleIsRead(mail.id, true);
        navigate(`mails/${mail.id}`);
      }}
    >
      <div className={classNames(styles.column, styles.cbWrapper)}>
        <Checkbox
          isChecked={isChecked}
          mIsUnRead={mail.is_unread}
          mId={mail.id}
          toggleIsRead={toggleIsRead}
        />
      </div>
      <div key={`${mail.id}`} className={classNames(styles.widthFull)}>
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
