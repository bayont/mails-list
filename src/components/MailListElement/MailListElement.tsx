import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { Mail } from "../../mailData";
import { Checkbox } from "../Checkbox/Checkbox";
import styles from "./MailListElement.module.css";
import { processDate } from "../../utils/dates";

import {
  useAppSelector,
  useAppDispatch,
  markMailAsRead,
} from "../../utils/store";

type Props = {
  mail: Mail;
  isChecked: boolean;
};

export function MailListElement({ mail, isChecked }: Props) {
  const liClasses = classNames(
    mail.is_unread ? classNames(styles.flexRow, styles.unread) : styles.flexRow,
    styles.button
  );
  const navigate = useNavigate();

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
          <Checkbox
            isChecked={isChecked}
            mIsUnRead={mail.is_unread}
            mId={mail.id}
          />
        </div>
      </Link>
    </li>
  );
}
