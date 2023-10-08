import { useEffect, useRef, useState } from 'react';
import 'react-spring-bottom-sheet/dist/style.css';

interface ViewProps {
    content: any;
    type?: string;
    aiadmin_link: string;
}

const edit_url = process.env.NEXT_PUBLIC_AIADMIN_SERVER + `/chainfeature/export`;

export default function IframeView(props: ViewProps) {
    const { content, type, aiadmin_link } = props;
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [maxHeight, setMaxHeight] = useState(500);

    useEffect(() => {
        setMaxHeight(document.body.offsetHeight * 0.8);
        const iframe = iframeRef.current;
        if (iframe) {
            // 监听 iframe 的加载完成事件
            iframe.addEventListener('load', handleLoad);
            return () => {
                // 在组件卸载时移除事件监听
                iframe.removeEventListener('load', handleLoad);
            };
        }
    }, []);

    const handleLoad = () => {
        console.log('lai');

        // 在此处执行加载完成后的操作
        const message = { from: 'docai', type: type, content: content };
        const iframe = iframeRef.current;
        if (iframe && iframe.contentWindow) iframe.contentWindow.postMessage(message, '*');
    };

    return (
        <div className="p-2">
            <iframe
                ref={iframeRef}
                id="editor"
                src={aiadmin_link}
                title="external-page"
                width="100%"
                height={maxHeight}
            />
        </div>
    );
}
