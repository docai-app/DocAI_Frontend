/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef } from 'react';
import { toPng } from 'html-to-image';
import parse from 'html-react-parser';
import { Helmet } from 'react-helmet';

export default function HtmlCodeModal(props: any) {
    const cancelButtonRef = useRef(null);
    const downloadChart = async () => {
        const qrcode = document.getElementById('chart');
        if (qrcode) {
            const png = await toPng(qrcode);
            const link = document.createElement('a');
            link.download = 'chart.png';
            link.href = png;
            link.click();
        }
    };

    useEffect(() => {
        console.log('htmlText: ', props.chart);
        if (props.chart) {
            const domParser = new DOMParser();
            const doc = domParser.parseFromString(props.chart, 'text/html');
            const scripts = doc.getElementsByTagName('script');

            // Run each script found in the HTML
            for (let i = 0; i < scripts.length; i++) {
                const newScript = document.createElement('script');
                newScript.innerHTML = scripts[i].innerHTML;
                document.body.appendChild(newScript);
            }
        }
    }, [props.chart]);

    // Parse only the body content
    const bodyContent = /<body>([\s\S]*?)<\/body>/g.exec(props.chart);
    const parsedContent = bodyContent && bodyContent.length > 1 ? bodyContent[1] : '';

    return (
        <Transition.Root show={props.visable || false} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={props.cancelClick}
            >
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
                            <div className="sm:flex sm:items-center justify-center">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">{props.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-4">
                                <div className="w-full">
                                    <div
                                        id="chart"
                                        className="w-full flex flex-col items-center p-4"
                                    >
                                        <Helmet>
                                            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                                            <script src="https://code.highcharts.com/highcharts.js"></script>
                                        </Helmet>
                                        {parse(parsedContent)}
                                    </div>
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => {
                                            downloadChart();
                                        }}
                                    >
                                        {'下載圖表'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
