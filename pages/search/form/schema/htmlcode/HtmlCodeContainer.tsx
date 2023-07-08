import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import HtmlCodeView from './HtmlCodeView';

export default function HtmlCodeContainer() {
    const htmlText = `<html>
    <head>
        <script src="https://code.highcharts.com/highcharts.js"></script>
    </head>
    <body>
        <div id="container" style="width:100%; height:500px;"></div>
        <script>
            Highcharts.chart('container', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Leave Summary by Department'
                },
                series: [{
                    name: 'Number of Leaves',
                    colorByPoint: true,
                    data: [{
                        name: 'MGM',
                        y: 1
                    }, {
                        name: 'CPG20',
                        y: 1
                    }]
                }]
            });
        </script>
    </body>
    </html>
    `;
    const router = useRouter();
    const [content, setContent] = useState('');
    useEffect(() => {
        if (router.query.content) {
            console.log(router.query.content.toString());
            // setContent(JSON.parse(router.query.content.toString()));
            setContent(router.query.content.toString());
        }
    }, [router]);
    return <HtmlCodeView content={content} />;
}
