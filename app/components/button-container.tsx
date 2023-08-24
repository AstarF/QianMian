import * as React from "react";

import styles from "./button.module.scss";

export type ButtonType = "primary" | "danger" | null;

export function ButtonContainer(props: {
  onClick?: () => void;
  children?:React.ReactNode;
  type?: ButtonType;
  bordered?: boolean;
  shadow?: boolean;
  className?: string;
  addClassName?:string
//   disabled?: boolean;
//   tabIndex?: number;
//   autoFocus?: boolean;
}) {
  return (
    <div
      className={
        styles["button-container"] + " " + styles[props.addClassName?props.addClassName:""]
        // ` ${props.bordered && styles.border} ${props.shadow && styles.shadow} ${
        //   props.className ?? ""
        // } clickable ${styles[props.type ?? ""]}`
      }
      onClick={props.onClick}
    //   disabled={props.disabled}
      role="button"
    //   tabIndex={props.tabIndex}
    //   autoFocus={props.autoFocus}
    >
        {props.children }
    </div>
  );
}
