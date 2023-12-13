import parse from 'html-react-parser';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Dropdowns from './Dropdowns';

interface Props {
    item: any;
    chart: any;
    isEdit?: boolean;
    edit: any;
    remove: any;
}
export default function StoryboardChartItemView(props: Props) {
    const { item, isEdit = false, chart, edit, remove } = props;

    useEffect(() => {
        // console.log('htmlText: ', chart);
        if (chart) {
            const domParser = new DOMParser();
            const doc = domParser.parseFromString(chart, 'text/html');
            const scripts = doc.getElementsByTagName('script');

            // Run each script found in the HTML
            for (let i = 0; i < scripts.length; i++) {
                const newScript = document.createElement('script');
                newScript.innerHTML = scripts[i].innerHTML;
                document.body.appendChild(newScript);
            }
        }
    }, [chart]);

    // Parse only the body content

    const bodyContent = /<body>([\s\S]*?)<\/body>/g.exec(chart);
    const parsedContent = bodyContent && bodyContent.length > 1 ? bodyContent[1] : '';

    return (
        <>
            <div className=" relative rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm flex items-center space-x-3  focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <div className="flex-1 min-w-0 min-h-[100px]">
                    <p className="text-md font-medium text-gray-900 my-2">{item.query}</p>
                    <Helmet>
                        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                        <script src="https://code.highcharts.com/highcharts.js"></script>
                    </Helmet>
                    {parse(parsedContent)}
                </div>
                {isEdit && (
                    <div className=" absolute top-2 right-2">
                        <Dropdowns edit={edit} remove={remove} />
                    </div>
                )}
            </div>
        </>
    );
}
