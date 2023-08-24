import styles from "./home.module.scss";

export function Header(props: any) {

    return (
        <>
            <div className={styles["top_header"]}>
                <span className={styles["text-gradient"]}>千面·GPT</span>
            </div>
            <div className={styles["primaiy-bar"]}></div>
        </>
    );
}