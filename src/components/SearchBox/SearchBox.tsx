import { ChangeEvent, useRef } from "react";
import styles from "./SearchBox.module.css";

type Props = {
  findMails: Function;
};

export function SearchBox({ findMails }: Props) {
  const searchInput = useRef<HTMLInputElement>(null);
  let timeout: NodeJS.Timeout = setTimeout(() => {}, 1000);
  function onSearchInputChange(searchQuery: string) {
    clearTimeout(timeout);
    timeout = setTimeout(() => findMails(searchQuery), 100);
  }
  function onSearchInputChange2(event: ChangeEvent<HTMLInputElement>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => findMails(event.target.value), 100);
  }
  function onClearButtonClick() {
    if (searchInput.current == null) return;
    searchInput.current.value = "";
    onSearchInputChange("");
  }
  return (
    <div className={styles.searchBox}>
      <div className={styles.searchIcon}>
        <span className="material-icons-round">search</span>
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          ref={searchInput}
          className={styles.searchInput}
          placeholder="Search for mails..."
          spellCheck={false}
          onChange={onSearchInputChange2}
        />
      </div>
      <button className={styles.clearInput} onClick={onClearButtonClick}>
        <span className="material-icons-round">close</span>
      </button>
    </div>
  );
}
