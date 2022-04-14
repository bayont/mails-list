import { mailData } from "../../mailData";
import { MailListElement } from "../MailListElement/MailListElement";
import styles from "./MailList.module.css";
import { useState } from "react";

export function MailList() {
  const [mails, setMails] = useState(mailData);

  function toggleIsRead(id: number, mark?: boolean) {
    const clickedElementIndex = mails.findIndex((mail) => mail.id === id);
    console.log("I'm toggleIsRead!");
    setMails((old) => {
      console.log("I'm setMails!");
      const clickedElement = old[clickedElementIndex];
      clickedElement.is_unread = mark ? false : !clickedElement.is_unread;
      const newItems = [...old];
      newItems.splice(clickedElementIndex, 1, clickedElement);
      return newItems;
    });
  }

  return (
    <>
      <h1>Mails list</h1>
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
