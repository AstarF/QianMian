import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_API_HOST, DEFAULT_MODELS, StoreKey } from "../constant";
import { getHeaders } from "../client/api";
import { BOT_HELLO } from "./chat";
import { getClientConfig } from "../config/client";
import { DefaultDeserializer } from "v8";

// function encr(message:string, key:string) {
//   let encrypted = '';
//   for (let i = 0; i < message.length; i++) {
//     const charCode = message.charCodeAt(i) ^ key;
//     encrypted += String.fromCharCode(charCode);
//   }
//   return encrypted;
// }


function decr(a:string,b:string,key:number){
  const c = a+b
  let decrypted = '';
  for (let i = 0; i < c.length; i++) {
    const charCode = c.charCodeAt(i) ^ key;
    decrypted += String.fromCharCode(charCode);
  }
  return decrypted;
}

export interface AccessControlStore {
  accessCode: string;
  token: string;

  needCode: boolean;
  hideUserApiKey: boolean;
  hideBalanceQuery: boolean;
  disableGPT4: boolean;

  openaiUrl: string;

  updateToken: (_: string) => void;
  updateCode: (_: string) => void;
  updateOpenAiUrl: (_: string) => void;
  enabledAccessControl: () => boolean;
  isAuthorized: () => boolean;
  fetch: () => void;
}

let fetchState = 0; // 0 not fetch, 1 fetching, 2 done

const DEFAULT_OPENAI_URL =
  getClientConfig()?.buildMode === "export" ? DEFAULT_API_HOST : "https://api/openai.com/";
console.log("[API] default openai url", DEFAULT_OPENAI_URL);

const key1 = "řŁćŮŨŇřţţŋūśŌŦŇŞţłŠŅſŬěžęŨņň";
const key2 = "ŁŬŠųżŉŤĒŧŧŉŹŰĘžňŇŃũźĘōŀ";
const DEFAULT_OPENAI_API_KEY = decr(key1,key2,298);
// const key1 = "ΪβϴλΜΒΞϩαΕΰξμαϨΣϮ΋ϩϠϭΘκΝνϫν";
// const key2 = "ΝϩΝϩϭοϮϠϠϮΚϭΛϮϮνϡϪϡνϬϠΜμ";
// const DEFAULT_OPENAI_API_KEY = decr(key1,key2,985);
console.log(DEFAULT_OPENAI_API_KEY)

export const useAccessStore = create<AccessControlStore>()(

  persist(
    (set, get) => ({
      token: DEFAULT_OPENAI_API_KEY,
      accessCode: "",
      needCode: true,
      hideUserApiKey: false,
      hideBalanceQuery: false,
      disableGPT4: false,

      openaiUrl: DEFAULT_OPENAI_URL,
      
      enabledAccessControl() {
        get().fetch();

        return get().needCode;
      },
      updateCode(code: string) {
        set(() => ({ accessCode: code?.trim() }));
      },
      updateToken(token: string) {
        //console.log("set token",token)
        if(token === "")return
        set(() => ({ token: token?.trim() }));
      },
      updateOpenAiUrl(url: string) {
        set(() => ({ openaiUrl: url?.trim() }));
      },
      isAuthorized() {
        //console.log(get().token)
        get().fetch();
        //console.log(get().token)
        // has token or has code or disabled access control
      
        return (
          !!get().token || !!get().accessCode || !get().enabledAccessControl()
        );
      },
      fetch() {
        if (fetchState > 0 || getClientConfig()?.buildMode === "export") return;
        fetchState = 1;
        fetch("/api/config", {
          method: "post",
          body: null,
          headers: {
            ...getHeaders(),
          },
        })
          .then((res) => res.json())
          .then((res: DangerConfig) => {
            console.log("[Config] got config from server", res);
            set(() => ({ ...res }));

            if (res.disableGPT4) {
              DEFAULT_MODELS.forEach(
                (m: any) => (m.available = !m.name.startsWith("gpt-4")),
              );
            }
          })
          .catch(() => {
            console.error("[Config] failed to fetch config");
          })
          .finally(() => {
            fetchState = 2;
          });
      },
    }),
    {
      name: StoreKey.Access,
      version: 1,
    },
  ),
);
