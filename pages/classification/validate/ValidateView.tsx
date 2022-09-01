import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { MailIcon, CheckIcon, XIcon, FolderIcon } from '@heroicons/react/solid';
import { Document, Page } from 'react-pdf';
import _get from 'lodash/get';
import AmendLabel from '../../../components/feature/classification/AmendLabel';
import FolderTree, { Folder } from '../../../components/common/Widget/FolderTree';

interface LatestPredictionDataProps {
    prediction: any;
}

interface ValidateViewProps {
    latestPredictionData: LatestPredictionDataProps;
    confirmDocumentFormik: any;
    addNewTagFormik: any;
    allLabelsData: object;
    mode: 'view' | 'move';
    setMode: Dispatch<SetStateAction<'view' | 'move'>>;
    movingDest: Folder | null;
    setMovingDest: Dispatch<SetStateAction<Folder | null>>;
    handleMove: (document_id: string, folder_id: string) => void;
    showFolderAncestorsData: any;
    documentPath: { id: string | null; name: string }[];
}

function ValidateView(props: ValidateViewProps) {
    const {
        latestPredictionData,
        confirmDocumentFormik,
        addNewTagFormik,
        allLabelsData,
        mode,
        setMode,
        movingDest,
        setMovingDest,
        handleMove,
        documentPath
    } = props;
    const [open, setOpen] = useState(false);
    return (
        <>
            <AmendLabel
                {...{ open, setOpen, allLabelsData, confirmDocumentFormik, addNewTagFormik }}
            />
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
                                <div className="h-full left-side flex-1 flex justify-center items-center object-contain object-center">
                                    <div className="w-5/6 h-full flex flex-col justify-center">
                                        <p>
                                            文檔名稱:{' '}
                                            <span className="font-bold">
                                                {_get(
                                                    latestPredictionData,
                                                    'prediction.document.name'
                                                )}
                                            </span>
                                        </p>
                                        <p className="mb-1">
                                            上傳日期:{' '}
                                            <span className="font-bold">
                                                {
                                                    _get(
                                                        latestPredictionData,
                                                        'prediction.document.created_at'
                                                    )?.split('T')[0]
                                                }
                                            </span>
                                        </p>
                                        <div className="w-full h-5/6 border-4 border-dashed border-gray-200 bg-white rounded-lg object-cover">
                                            {_get(
                                                latestPredictionData,
                                                'prediction.document.storage_url'
                                            ) ? (
                                                _get(
                                                    latestPredictionData,
                                                    'prediction.document.name'
                                                )
                                                    .split(/[#?]/)[0]
                                                    .split('.')
                                                    .pop()
                                                    .trim() === 'pdf' ? (
                                                    <object
                                                        className="object-center object-cover w-full h-full flex justify-center items-center"
                                                        type="application/pdf"
                                                        data={
                                                            _get(
                                                                latestPredictionData,
                                                                'prediction.document.storage_url'
                                                            ) + '#toolbar=0'
                                                        }
                                                        width="250"
                                                    >
                                                        <img
                                                            src={
                                                                'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png'
                                                            }
                                                            alt={_get(
                                                                latestPredictionData,
                                                                'prediction.document.name'
                                                            )}
                                                            className="w-1/2 h-1/2 object-contain object-center"
                                                        />
                                                    </object>
                                                ) : (
                                                    <img
                                                        className="object-cover shadow-lg rounded-lg"
                                                        alt={_get(
                                                            latestPredictionData,
                                                            'prediction.document.name'
                                                        )}
                                                        src={_get(
                                                            latestPredictionData,
                                                            'prediction.document.storage_url'
                                                        )}
                                                    />
                                                )
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="right-side flex-1">
                                    <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                                        <div className="mx-auto py-4 border-b w-full max-w-sm lg:w-96">
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
                                                        className="space-y-6"
                                                    >
                                                        <div>
                                                            <label
                                                                htmlFor="type"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                AI預測的結果
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    id="type"
                                                                    name="type"
                                                                    type="string"
                                                                    readOnly
                                                                    placeholder={_get(
                                                                        latestPredictionData,
                                                                        'prediction.tag.name'
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
                                                                }}
                                                            >
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
                                                                }}
                                                            >
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
                                        <div className="mx-auto py-4 w-full max-w-sm lg:w-96 flex flex-col gap-2">
                                            <div>
                                                <h2 className="text-2xl font-extrabold text-gray-900">
                                                    移動文件
                                                </h2>
                                            </div>
                                            <div className="flex flex-row items-end">
                                                <div>
                                                    <div>目前文件路徑</div>
                                                    <div className="flex flex-row gap-2">
                                                        <FolderIcon className="h-6 text-blue-200" />
                                                        <div className="flex flex-row gap-1">
                                                            {documentPath.map((folder) => (
                                                                <div key={folder.id}>
                                                                    {folder.name}{' '}
                                                                    <span className="text-gray-400">
                                                                        /
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ml-auto">
                                                    <button
                                                        className="bg-green-600 text-white text-sm px-3 py-2 w-20 rounded-md hover:bg-green-700"
                                                        onClick={() => setMode('move')}
                                                    >
                                                        移動至...
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                {mode === 'move' && (
                    <>
                        <div
                            className="absolute h-[calc(100vh-4rem)] bg-black/30 top-16 w-full"
                            onClick={() => {
                                setMode('view');
                            }}
                        ></div>
                        <div className="absolute h-[calc(100vh-4rem)] shadow-lg right-0 top-16 bg-white w-[28rem]">
                            <div className="w-full h-full flex flex-col">
                                <h1 className="p-5 font-bold text-3xl">選擇移動目的地</h1>
                                <div className="pr-5 overflow-auto">
                                    <FolderTree
                                        expanded={true}
                                        movingDest={movingDest}
                                        setMovingDest={setMovingDest}
                                    />
                                </div>
                                {movingDest != null && (
                                    <div className="py-5 px-5 flex">
                                        <button
                                            className="ml-auto px-3 py-2 bg-green-600 text-white rounded-md"
                                            onClick={() =>
                                                handleMove(
                                                    latestPredictionData.prediction.document.id,
                                                    movingDest.id
                                                )
                                            }
                                        >
                                            移動
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default ValidateView;
