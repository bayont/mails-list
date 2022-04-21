import { ChangeEvent, useRef } from 'react';

import { search, useAppDispatch } from '../../utils/store';
import styles from './SearchBox.module.css';

export function SearchBox() {
   const dispatch = useAppDispatch();
   const searchInput = useRef<HTMLInputElement>(null);

   let timeout: NodeJS.Timeout = setTimeout(() => {}, 1000);

   function onSearchInputChange(e: ChangeEvent<HTMLInputElement>) {
      clearTimeout(timeout);
      timeout = setTimeout(
         () => dispatch(search(searchInput.current?.value || '')),
         100,
      );
   }

   function onClearButtonClick() {
      dispatch(search(''));
      if (searchInput.current !== null) searchInput.current.value = '';
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
               onChange={onSearchInputChange}
            />
         </div>
         <button className={styles.clearInput} onClick={onClearButtonClick}>
            <span className="material-icons-round">close</span>
         </button>
      </div>
   );
}
