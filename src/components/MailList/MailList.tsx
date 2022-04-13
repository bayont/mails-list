import { mailData } from "../../mailData";
import { MailListElement } from "../MailListElement/MailListElement";
import styles from "./MailList.module.css";
import { useState } from "react";

export function MailList() {
  const [mails, setMails] = useState(mailData);

  const markAsRead = (id: number) => {
    const clickedElementIndex = mails.findIndex((mail) => mail.id === id);
    setMails((old) => {
      const clickedElement = old[clickedElementIndex];
      clickedElement.is_unread = false;
      const newItems = [...old];
      newItems.splice(clickedElementIndex, 1, clickedElement);
      return newItems;
    });
  };

  const toggleIsRead = (id: number) => {
    const clickedElementIndex = mails.findIndex((mail) => mail.id === id);
    setMails((old) => {
      const clickedElement = old[clickedElementIndex];
      clickedElement.is_unread = !clickedElement.is_unread;
      const newItems = [...old];
      newItems.splice(clickedElementIndex, 1, clickedElement);
      return newItems;
    });
  };

  return (
    <>
      <h1>Mails list</h1>
      <div className={styles.flexTable}>
        <ul>
          {mails.map((mail) => {
            return (
              <MailListElement
                markAsRead={markAsRead}
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
