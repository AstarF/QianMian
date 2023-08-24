import styles from "./home.module.scss";
import { GoPerson } from "react-icons/go";

export function NavBar(props: any) {

  return (
    <>
      <div className={styles["NavSideBar"]}>
        <div className={styles["NavButton"] + " " + styles["Select"]}>
          <span className={styles["text-gradient-nav"]}>聊</span>
        </div>
        <div className={styles["NavButton"]}>
          <span className={styles["text-gradient-nav"]}>绘</span>
        </div>
        <div className={styles["NavButton"]}>
          <span className={styles["text-gradient-nav"]}>阅</span>
        </div>
        <div className={styles["NavButton"]}>
          <span className={styles["text-gradient-nav"]}>想</span>
        </div>

      </div>
    </>
  );
}