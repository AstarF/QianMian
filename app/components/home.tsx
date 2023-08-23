"use client";

require("../polyfill");
import { Link } from "react-router-dom";//*** */
import { useState, useEffect } from "react";

import styles from "./home.module.scss";

import LoadingIcon from "../icons/three-dots.svg";
import { IconButton } from "./button";
import { getCSSVar, useMobileScreen } from "../utils";

import dynamic from "next/dynamic";
import { Path, SlotID } from "../constant";
//import { ErrorBoundary } from "./error";
import RobotIcon from "../icons/robot.svg";
//import { getLang } from "../locales";

import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { SideBar } from "./sidebar";
import { useAppConfig } from "../store/config";
//import { AuthPage } from "./auth";
import { getClientConfig } from "../config/client";
import { api } from "../client/api";
import { useAccessStore } from "../store";

export function Loading(props: { noLogo?: boolean }) {
  return (
    <div className={styles["loading-content"] + " no-dark"}>
      <LoadingIcon />
    </div>
  );
}

const Settings = dynamic(async () => (await import("./settings")).Settings, {
  loading: () => <Loading noLogo />,
});

const Chat = dynamic(async () => (await import("./chat")).Chat, {
  loading: () => <Loading noLogo />,
});

const NewChat = dynamic(async () => (await import("./new-chat")).NewChat, {
  loading: () => <Loading noLogo />,
});

// const MaskPage = dynamic(async () => (await import("./mask")).MaskPage, {
//   loading: () => <Loading noLogo />,
// });

// export function useSwitchTheme() {
//   const config = useAppConfig();

//   useEffect(() => {
//     document.body.classList.remove("light");
//     document.body.classList.remove("dark");

//     if (config.theme === "dark") {
//       document.body.classList.add("dark");
//     } else if (config.theme === "light") {
//       document.body.classList.add("light");
//     }

//     const metaDescriptionDark = document.querySelector(
//       'meta[name="theme-color"][media*="dark"]',
//     );
//     const metaDescriptionLight = document.querySelector(
//       'meta[name="theme-color"][media*="light"]',
//     );

//     if (config.theme === "auto") {
//       metaDescriptionDark?.setAttribute("content", "#151515");
//       metaDescriptionLight?.setAttribute("content", "#fafafa");
//     } else {
//       const themeColor = getCSSVar("--theme-color");
//       metaDescriptionDark?.setAttribute("content", themeColor);
//       metaDescriptionLight?.setAttribute("content", themeColor);
//     }
//   }, [config.theme]);
// }

//是否完成初始化
const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

// const loadAsyncGoogleFont = () => {
//   const linkEl = document.createElement("link");
//   const proxyFontUrl = "/google-fonts";
//   const remoteFontUrl = "https://fonts.googleapis.com";
//   const googleFontUrl =
//     getClientConfig()?.buildMode === "export" ? remoteFontUrl : proxyFontUrl;
//   linkEl.rel = "stylesheet";
//   linkEl.href =
//     googleFontUrl +
//     "/css2?family=Noto+Sans+SC:wght@300;400;700;900&display=swap";
//   document.head.appendChild(linkEl);
// };

function Screen() {
  const config = useAppConfig();
  const location = useLocation();
  const isHome = location.pathname === Path.Home;
  //const isAuth = location.pathname === Path.Auth;
  const isMobileScreen = useMobileScreen();

  // useEffect(() => {
  //   loadAsyncGoogleFont();
  // }, []);

  return (
    <>

      <div className={styles["windows"]}>
        <div className={styles["top_header"]}>
          <span className={styles["text-gradient"]}>千面·GPT</span></div>
        <div className={styles["primaiy-bar"]}></div>
        <div
          className={
            styles.container +
            ` ${config.tightBorder && !isMobileScreen
              ? styles["tight-container"]
              : styles.container
            } `//${getLang() === "ar" ? styles["rtl-screen"] : ""}`
          }
        >

          {
            // isAuth ? (
            //   <>
            //     <AuthPage />
            //   </>
            // ) : (

            <>
              {/* <NavBar> </NavBar> */}
              <div className={styles["NavSideBar"]}>
                <div className={styles["NavButton"]+" "+styles["Select"]}>
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
                {/* <div className={styles["UserButton"]}> */}
                  {/* <Link to={Path.Settings}> */}
                  
                  {/* </Link> */}
                {/* </div> */}
              </div>
              <SideBar className={isHome ? styles["sidebar-show"] : ""} />

              <div className={styles["window-content"]} id={SlotID.AppBody}>
                <Routes>
                  <Route path={Path.Home} element={<Chat />} />
                  <Route path={Path.NewChat} element={<NewChat />} />
                  {/* <Route path={Path.Masks} element={<MaskPage />} /> */}
                  <Route path={Path.Chat} element={<Chat />} />
                  <Route path={Path.Settings} element={<Settings />} />
                </Routes>
              </div>
            </>
            //)
          }
        </div>
        <div className={styles["buttom_footer"]}>We just talk about the feature</div>
      </div>
    </>
  );
}

export function useLoadData() {
  const config = useAppConfig();

  useEffect(() => {
    (async () => {
      const models = await api.llm.models();
      config.mergeModels(models);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function Home() {
  //useSwitchTheme();
  useLoadData();

  useEffect(() => {
    console.log("[Config] got config from build time", getClientConfig());
    useAccessStore.getState().fetch();
  }, []);

  if (!useHasHydrated()) {
    return <Loading />;
  }

  return (
    //<ErrorBoundary>
    <Router>
      <Screen />
    </Router>
    //</ErrorBoundary>
  );
}
