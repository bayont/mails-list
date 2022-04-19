import { useRef } from "react";
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
          onChange={(e) => {
            onSearchInputChange(e.target.value);
          }}
        />
      </div>
      <button
        className={styles.clearInput}
        onClick={() => {
          if (searchInput.current == null) return;
          searchInput.current.value = "";
          onSearchInputChange("");
        }}
      >
        <span className="material-icons-round">close</span>
      </button>
    </div>
  );
}
