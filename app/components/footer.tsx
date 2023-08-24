import styles from "./home.module.scss";
import { useState } from "react";


export function Footer(props: any) {
    const [moeileSize, setMobileSize] = useState(false)
    return (
        <>
            <div className={styles["buttom-footer"]}>We just talk about the feature</div>
        </>
    );
}
