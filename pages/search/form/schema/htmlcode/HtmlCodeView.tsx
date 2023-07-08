import { useEffect, useRef } from 'react';

interface HtmlCodeViewrops {
    content: string;
}

function HtmlCodeView(props: HtmlCodeViewrops) {
    const { content } = props;

    const containerRef = useRef(null);

    useEffect(() => {
        if (content) {
            const parser = new DOMParser();
            console.log('content', content);
            const htmlDoc = parser.parseFromString(content, 'text/html');
            const v = htmlDoc.getElementById("container");
            console.log('v', v);

            // console.log(htmlDoc.body)
            // const container = containerRef.current;
            // document.getElementById("containers").innerHTML = htmlDoc.body
            // const fragment = htmlDoc.createDocumentFragment();
            // fragment.appendChild(htmlDoc.body);
            // if (container) {
            //     container.appendChild(fragment);
            // }
        }
    }, [content]);

    return (
        <>
            {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
            <div ref={containerRef} id="containers"></div>
        </>
    );
}
export default HtmlCodeView;
