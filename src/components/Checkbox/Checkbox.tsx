import styles from "./Checkbox.module.css";

type Props = {
  isChecked: boolean;
  mId: string;
  mIsUnRead: boolean;
  toggleIsRead: Function;
};

export function Checkbox({ isChecked, mId, mIsUnRead, toggleIsRead }: Props) {
  <div className={styles.checkbox}>
    <label htmlFor={mId}>{mIsUnRead ? "Unr" : "R"}ead</label>
    <input
      type="checkbox"
      checked={isChecked}
      onClick={() => toggleIsRead(mId)}
      name={mId}
      id={mId}
    />
  </div>;
}
