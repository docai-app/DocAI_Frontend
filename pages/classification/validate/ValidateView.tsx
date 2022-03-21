import { useState, useEffect } from 'react';
import { MailIcon, CheckIcon, XIcon } from '@heroicons/react/solid';
import { Document, Page } from 'react-pdf';
import _get from 'lodash/get';
import AmendLabel from '../../../components/feature/classification/AmendLabel';

interface LastestPredictionDataProps {
    document: Array<any>;
    prediction: Array<any>;
}

interface ValidateViewProps {
    lastestPredictionData: LastestPredictionDataProps;
    confirmDocumentFormik: any;
    allLabelsData: object;
}

function ValidateView(props: ValidateViewProps) {
    const { lastestPredictionData, confirmDocumentFormik, allLabelsData } = props;
    const [open, setOpen] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };
    return (
        <>
            <AmendLabel {...{ open, setOpen, allLabelsData, confirmDocumentFormik }} />
            <div className="min-h-full bg-slate-50">
                <header className="shadow bg-white">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">文檔分類</h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                            <p className="mb-2 text-lg">Document AI的建議</p>
                            <div className="flex justify-center items-center p-4 border-4 border-dashed border-gray-200 bg-white rounded-lg h-80vh">
                                <div className="left-side flex-1 flex justify-center items-center object-contain object-center">
                                    <div className="w-5/6 border-4 border-dashed border-gray-200 bg-white rounded-lg object-cover">
                                        {
                                            // (_get(document, '[3]')) ? (<Document
                                            //     file={_get(document, '[3]')}
                                            //     onLoadSuccess={onDocumentLoadSuccess}>
                                            //     <Page pageNumber={pageNumber} />
                                            // </Document>) : (null)
                                            _get(lastestPredictionData, 'document[4]') ? (
                                                <p>{_get(lastestPredictionData, 'document[4]')}</p>
                                            ) : null
                                        }
                                    </div>
                                </div>
                                <div className="right-side flex-1">
                                    <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                                        <div className="mx-auto w-full max-w-sm lg:w-96">
                                            <div>
                                                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                                                    AI建議的類型
                                                </h2>
                                                <p className="mt-2 text-sm text-gray-600">
                                                    基於機器學習得出的結果
                                                </p>
                                            </div>
                                            <div className="mt-8">
                                                <div className="mt-6">
                                                    <form
                                                        action="#"
                                                        method="POST"
                                                        className="space-y-6">
                                                        <div>
                                                            <label
                                                                htmlFor="type"
                                                                className="block text-sm font-medium text-gray-700">
                                                                AI預測的結果
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    id="type"
                                                                    name="type"
                                                                    type="string"
                                                                    readOnly
                                                                    placeholder={_get(
                                                                        lastestPredictionData,
                                                                        'prediction[1]'
                                                                    )}
                                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button
                                                                type="button"
                                                                className="mr-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                                onClick={() => {
                                                                    confirmDocumentFormik.handleSubmit();
                                                                }}>
                                                                <CheckIcon
                                                                    className="-ml-0.5 mr-2 h-4 w-4"
                                                                    aria-hidden="true"
                                                                />
                                                                正確
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                                onClick={() => {
                                                                    setOpen(true);
                                                                }}>
                                                                <XIcon
                                                                    className="-ml-0.5 mr-2 h-4 w-4"
                                                                    aria-hidden="true"
                                                                />
                                                                更正
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default ValidateView;
