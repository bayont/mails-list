import { Mail, mailData } from "../../mailData";
import { MailListElement } from "../MailListElement/MailListElement";
import styles from "./MailList.module.css";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { Logo } from "../Logo/Logo";
export function MailList() {
  const dateComparer = (m1: Mail, m2: Mail) => {
    const date1 = new Date(m1.sent_date).getTime();
    const date2 = new Date(m2.sent_date).getTime();
    return date2 - date1;
  };
  const [mails, setMails] = useState(mailData.sort(dateComparer));
  useEffect(() => {}, []);

  function toggleIsRead(id: number, mark?: boolean) {
    const clickedElementIndex = mails.findIndex((mail) => mail.id === id);
    return new Promise((res, rej) => {
      setMails((old) => {
        const clickedElement = old[clickedElementIndex];
        clickedElement.is_unread = mark ? false : !clickedElement.is_unread;
        const newItems = [...old];
        newItems.splice(clickedElementIndex, 1, clickedElement);
        return newItems;
      });
      res(true);
    });
  }

  return (
    <>
      <header>
        <Logo />
      </header>
      <h2>
        Already read: {mails.filter((m) => m.is_unread === false).length}/
        {mails.length}
      </h2>
      <div className={styles.flexTable}>
        <ul>
          {mails.map((mail) => {
            return (
              <MailListElement
                key={`${mail.id}`}
                toggleIsRead={toggleIsRead}
                isChecked={!mail.is_unread}
                mail={mail}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}
