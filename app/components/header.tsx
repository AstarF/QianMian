import styles from "./home.module.scss";
import { GoPerson } from "react-icons/go";
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import { read } from "fs";
import { MarkdownComponent } from './markdown-component';

export function Header(props: any) {
    const [isAboutOpen, setIsAboutOpen] = useState(false);

    const showAbout = () => {
        setIsAboutOpen(true);
    };

    const handleAboutOk = () => {
        setIsAboutOpen(false);
    };

    const handleAboutCancel = () => {
        setIsAboutOpen(false);
    };
    //----------------------------------------------------------
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    const showHelp = () => {
        setIsHelpOpen(true);
    };

    const handleHelpOk = () => {
        setIsHelpOpen(false);
    };

    const handleHelpCancel = () => {
        setIsHelpOpen(false);
    };

    return (
        <div className={styles["top-header"]}>
            <div className={styles["top_header"]}>
                <span className={styles["text-gradient"]}>千面·GPT</span>
                <div className={styles["top-header-button-panel"]}>
                    <div className={styles["top-header-button"]} onClick={showHelp}>
                        {/* <Link to={Path.Settings}> */}
                        帮助
                        {/* </Link> */}
                    </div>
                    <div className={styles["top-header-button"]} onClick={showAbout}>
                        {/* <Link to={Path.Settings}> */}
                        关于
                        {/* </Link> */}
                    </div>
                    {/* <div className={styles["top-header-button-r"]} onClick={showHelp}>
                        请登录     
                    </div> */}
                </div>
            </div>
            <div className={styles["primary-bar"]}></div>
            <Modal title="关于" open={isAboutOpen} onOk={handleAboutOk} onCancel={handleAboutCancel}
                footer={[
                    <Button type="primary" key="back" onClick={handleAboutOk}>
                        返回
                    </Button>,
                ]}
            >
                <p>
                    我是ChatGPT，一个由OpenAI开发的大型语言模型。我被训练来理解和生成自然语言文本，可以回答各种问题、提供信息、进行闲聊和提供帮助。我基于大量的文本数据进行训练，包括维基百科、新闻文章、书籍、对话记录等等，以便我能够具备广泛的知识和语言理解能力。

                </p>
                <p>我期待与你进行有趣的对话，帮助你解决问题并提供有用的信息！如有任何需要，请随时向我提问。</p>
            </Modal>

            <Modal title="帮助"
                open={isHelpOpen}
                onOk={handleHelpOk}
                onCancel={handleHelpCancel}
                width={760}
                footer={[
                    <Button type="primary" key="back" onClick={handleHelpOk}>
                        返回
                    </Button>,
                ]}
            >
                <MarkdownComponent mdfileUrl={"../documents/help.md"}></MarkdownComponent>
            </Modal>
        </div>
    );
}