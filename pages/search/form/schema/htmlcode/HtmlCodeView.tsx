import { useEffect, useRef } from "react";

interface HtmlCodeViewrops {
    content: string;
}

function HtmlCodeView(props: HtmlCodeViewrops) {
    const { content } = props;

    const containerRef = useRef(null);
    // const parser = new DOMParser();
    useEffect(() => {

        if (content) {
            console.log('content', content);
            // const htmlDoc = parser.parseFromString(content, 'text/html');
            // console.log(htmlDoc.body)
            // const container = containerRef.current;
            // const fragment = htmlDoc.createDocumentFragment();
            // fragment.appendChild(htmlDoc.body);
            // if (container) {
            //     // container.appendChild(fragment);
            // }
        }

    }, [content])

    return (
        <>
            {/* <div dangerouslySetInnerHTML={{ __html: htmlDoc.body.toString() }} /> */}
            <div ref={containerRef} id="containers"></div>
        </>
    );
}
export default HtmlCodeView;
