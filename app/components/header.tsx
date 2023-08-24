import styles from "./home.module.scss";
import { GoPerson } from "react-icons/go";

export function Header(props: any) {

    return (
        <div className={styles["top-header"]}>
            <div className={styles["top_header"]}>
                <span className={styles["text-gradient"]}>千面·GPT</span>
                <div className={styles["user-button"]}>
                    {/* <Link to={Path.Settings}> */}
                    <GoPerson className={styles["user-login-icon"]} />
                    {/* </Link> */}
                </div>
            </div>
            <div className={styles["primary-bar"]}></div>
        </div>
    );
}