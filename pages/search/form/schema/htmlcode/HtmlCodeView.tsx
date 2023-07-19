import React, { useEffect } from 'react';
import parse from 'html-react-parser';
import { Helmet } from 'react-helmet';

interface HtmlCodeViewProps {
    content: string;
}

const HtmlCodeView: React.FC<HtmlCodeViewProps> = ({ content }) => {
    useEffect(() => {
        if (content) {
            const domParser = new DOMParser();
            const doc = domParser.parseFromString(content, 'text/html');
            const scripts = doc.getElementsByTagName('script');

            // Run each script found in the HTML
            for (let i = 0; i < scripts.length; i++) {
                const newScript = document.createElement('script');
                newScript.innerHTML = scripts[i].innerHTML;
                console.log(scripts[i]);

                // Add error handling here
                newScript.onerror = (event) => {
                    // Handle the error, e.g. log it or show an error message to the user
                    console.error(event);
                };
                document.body.appendChild(newScript);
            }
        }
    }, [content]);

    // Parse only the body content
    const bodyContent = /<body>([\s\S]*?)<\/body>/g.exec(content);
    const parsedContent = bodyContent && bodyContent.length > 1 ? bodyContent[1] : '';

    return (
        <div>
            <Helmet>
                {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                <script src="https://code.highcharts.com/highcharts.js"></script>
            </Helmet>
            {parse(parsedContent)}
        </div>
    );
};

export default HtmlCodeView;
