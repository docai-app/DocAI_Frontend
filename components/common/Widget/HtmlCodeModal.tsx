/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { toPng } from 'html-to-image';
import { Fragment, useRef } from 'react';
import useAlert from '../../../hooks/useAlert';

export default function HtmlCodeModal(props: any) {
    const { setAlert } = useAlert();
    const cancelButtonRef = useRef(null);
    const downloadQRCode = async () => {
        const qrcode = document.getElementById('qr-code');
        if (qrcode) {
            const png = await toPng(qrcode);
            const link = document.createElement('a');
            link.download = 'qr-code.png';
            link.href = png;
            link.click();
        }
    };

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
    `
    // const htmlText2 = '<div>A simple HTML string</div>';
    // const parser = new DOMParser();
    // const htmlDoc = parser.parseFromString(htmlText, 'text/html');

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
                        <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
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
                                        id="qr-code"
                                        className="w-full flex flex-col items-center p-4"
                                    >

                                        {/* {HtmlViewer(htmlText)} */}
                                        {/* <p className="text-md text-gray-500">
                                            {htmlDoc}
                                        </p> */}
                                        {/* <div
                                            dangerouslySetInnerHTML={{
                                                __html: htmlText
                                            }}
                                            className={`text-xl text-red-500'
                                            }`}
                                        ></div> */}
                                        <div dangerouslySetInnerHTML={{ __html: htmlText }} />
                                    </div>
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => {

                                        }}
                                    >
                                        {'Download QR Code'}
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
