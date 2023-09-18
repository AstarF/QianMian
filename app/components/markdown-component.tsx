import ReactMarkdown from 'react-markdown'
import React, { useEffect, useState } from 'react';
import styles from "./markdown-component.module.scss";

export function MarkdownComponent(props: any) {
        //markdown
        const [content, setContent] = useState(String);
        const mdfileUrl = props.mdfileUrl;//"../documents/help.md";
        useEffect(() => {
            fetch(mdfileUrl, { method: "GET" }).then(res => {
                return res.text();
            }).then(text => {
                setContent(text);
            });
        });

        return (
            <div className={styles["markdown-content"]}>
                <ReactMarkdown
                    components = {{
                        img(props){
                            return <img {...props} style={{ maxWidth: '80%',marginLeft:'10%',borderRadius: '10px',boxShadow:'0px 2px 4px 0px rgb(0, 0, 0, 0.05)'}} />
                        }
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        )
}