import { useEffect, useRef, useState } from "react";

import styles from "./home.module.scss";

import { IconButton } from "./button";
import { ButtonContainer } from "./button-container";
import SettingsIcon from "../icons/settings.svg";
import AddIcon from "../icons/add.svg";
import CloseIcon from "../icons/close.svg";
import MaskIcon from "../icons/mask.svg";
import PluginIcon from "../icons/plugin.svg";
//import DragIcon from "../icons/drag.svg";
import { GoPerson } from "react-icons/go";
import { BsChatLeftDots } from "react-icons/bs";
import {MdOutlineDraw} from "react-icons/md"
import {AiOutlineRead} from "react-icons/ai"
import {GiBrain} from "react-icons/gi"

import Locale from "../locales";

import { useAppConfig, useChatStore } from "../store";

import {
  // MAX_SIDEBAR_WIDTH,
  // MIN_SIDEBAR_WIDTH,
  // NARROW_SIDEBAR_WIDTH,
  Path,
  // REPO_URL,
} from "../constant";

import { Link, useNavigate } from "react-router-dom";
//import { useMobileScreen } from "../utils";
import dynamic from "next/dynamic";
import { showConfirm, showToast } from "./ui-lib";

const ChatList = dynamic(async () => (await import("./chat-list")).ChatList, {
  loading: () => null,
});

function useHotKey() {
  const chatStore = useChatStore();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey) {
        if (e.key === "ArrowUp") {
          chatStore.nextSession(-1);
        } else if (e.key === "ArrowDown") {
          chatStore.nextSession(1);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });
}



// function useDragSideBar() {
//   const limit = (x: number) => Math.min(MAX_SIDEBAR_WIDTH, x);

//   const config = useAppConfig();
//   const startX = useRef(0);
//   const startDragWidth = useRef(config.sidebarWidth ?? 300);
//   const lastUpdateTime = useRef(Date.now());

//   const handleMouseMove = useRef((e: MouseEvent) => {
//     if (Date.now() < lastUpdateTime.current + 50) {
//       return;
//     }
//     lastUpdateTime.current = Date.now();
//     const d = e.clientX - startX.current;
//     const nextWidth = limit(startDragWidth.current + d);
//     config.update((config) => (config.sidebarWidth = nextWidth));
//   });

//   const handleMouseUp = useRef(() => {
//     startDragWidth.current = config.sidebarWidth ?? 300;
//     window.removeEventListener("mousemove", handleMouseMove.current);
//     window.removeEventListener("mouseup", handleMouseUp.current);
//   });

//   const onDragMouseDown = (e: MouseEvent) => {
//     startX.current = e.clientX;

//     window.addEventListener("mousemove", handleMouseMove.current);
//     window.addEventListener("mouseup", handleMouseUp.current);
//   };
//   const isMobileScreen = useMobileScreen();
//   const shouldNarrow =
//     !isMobileScreen && config.sidebarWidth < MIN_SIDEBAR_WIDTH;

//   useEffect(() => {
//     const barWidth = shouldNarrow
//       ? NARROW_SIDEBAR_WIDTH
//       : limit(config.sidebarWidth ?? 300);
//     const sideBarWidth = isMobileScreen ? "100vw" : `${barWidth}px`;
//     document.documentElement.style.setProperty("--sidebar-width", sideBarWidth);
//   }, [config.sidebarWidth, isMobileScreen, shouldNarrow]);

//   return {
//     onDragMouseDown,
//     shouldNarrow,
//   };
// }

export function SideBar(props: { className?: string }) {
  const chatStore = useChatStore();

  // drag side bar
  //const { onDragMouseDown, shouldNarrow } = useDragSideBar();
  const [timeStr, setTimeStr] = useState('');
  //const timmer = useRef();//?
  const navigate = useNavigate();
  const config = useAppConfig();
  useHotKey();


  function getTimeString() {
    const currentDate = new Date();
    const hours = currentDate.getHours(); // 获取小时
    const minutes = currentDate.getMinutes(); // 获取分钟
    const seconds = currentDate.getSeconds(); // 获取秒数
    let hours_str = "", minutes_str = "", seconds_str = "";
    if (hours < 10) hours_str = "0" + hours;
    else hours_str = hours.toString();

    if (minutes < 10) minutes_str = "0" + minutes;
    else minutes_str = minutes.toString();

    if (seconds < 10) seconds_str = "0" + seconds;
    else seconds_str = seconds.toString();

    return hours_str + ":" + minutes_str + ":" + seconds_str;
  }

  function setTimeString() {
    setTimeStr(getTimeString())
  }

  //time
  useEffect(() => {

    setInterval(setTimeString, 1000);//?

    // eslint-disable-next-line
  }, [])

  return (
    <div
      className={`${styles.sidebar} ${props.className} `
        //${shouldNarrow && styles["narrow-sidebar"]}`
      }
    >
      <div className={styles["sidebar-header"]} data-tauri-drag-region>
        <div className={styles["clock"]}>
          <span>{timeStr}</span>
        </div>
        <div className={styles["sidebar-title"]} data-tauri-drag-region>
          -- 快乐每一天 GPT3.5/4 --
        </div>
        {/* <div className={styles["sidebar-sub-title"]}>
         
        </div> */}

      </div>

      <div className={styles["sidebar-header-bar"]}>
        <IconButton
          icon={<MaskIcon />}
          text={Locale.Mask.Name}
          className={styles["sidebar-bar-button"]}
          onClick={() => navigate(Path.NewChat, { state: { fromHome: true } })}
          shadow
        />
        <IconButton
          icon={<PluginIcon />}
          text={Locale.Plugin.Name}
          className={styles["sidebar-bar-button"]}
          onClick={() => showToast(Locale.WIP)}
          shadow
        />
      </div>

      <div
        className={styles["sidebar-body"]}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            navigate(Path.Home);
          }
        }}
      >
        <ChatList narrow={false} />
      </div>

      <div className={styles["sidebar-tail"]}>
        <div className={styles["sidebar-actions"]}>
          <div className={styles["sidebar-action"] + " " + styles.mobile}>
            <IconButton
              icon={<CloseIcon />}
              onClick={async () => {
                if (await showConfirm(Locale.Home.DeleteChat)) {
                  chatStore.deleteSession(chatStore.currentSessionIndex);
                }
              }}
            />
          </div>
          <div className={styles["sidebar-action"]}>
            <Link to={Path.Settings}>
              <IconButton icon={<SettingsIcon />} shadow />
            </Link>
          </div>
          {/* <div className={styles["sidebar-action"]}>
            <a href={REPO_URL} target="_blank">
              <IconButton icon={<GithubIcon />} shadow />
            </a>
          </div> */}
        </div>
        <div>
          <IconButton
            icon={<AddIcon />}
            text={Locale.Home.NewChat}
            onClick={() => {
              if (config.dontShowMaskSplashScreen) {
                chatStore.newSession();
                navigate(Path.Chat);
              } else {
                navigate(Path.NewChat);
              }
            }}
            shadow
          />
        </div>
      </div>

      {/* <div
        className={styles["sidebar-drag"]}
        onMouseDown={(e) => onDragMouseDown(e as any)}
      >
        <DragIcon />
      </div> */}



      {window.innerWidth < 600 ?
        <div className={styles["buttom-footer-mobile"]}>
          <div className={styles["sidebar-action"]}>
            <ButtonContainer>
              <BsChatLeftDots className={styles["buttom-button-mobile"]+" "+styles["buttom-button-mobile-active"]} />
            </ButtonContainer>
          </div>
          <div className={styles["sidebar-action"]}>
            <ButtonContainer>
              <MdOutlineDraw className={styles["buttom-button-mobile"]} />
            </ButtonContainer>
          </div>

          <div className={styles["sidebar-action"]}>
            <ButtonContainer addClassName="button-margin-top">
              <div className={styles["user-button-mobile"]}>
                <GoPerson className={styles["user-login-icon-mobile"]} />
              </div>
            </ButtonContainer>
          </div>

          <div className={styles["sidebar-action"]}>
            <ButtonContainer><AiOutlineRead className={styles["buttom-button-mobile"]} /></ButtonContainer>
          </div>
          <div className={styles["sidebar-action"]}>
            <ButtonContainer><GiBrain className={styles["buttom-button-mobile"]} /></ButtonContainer>
          </div>

        </div> : null}
    </div>
  );
}
