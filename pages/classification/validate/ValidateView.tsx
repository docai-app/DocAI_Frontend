import { useState, useEffect, Dispatch, SetStateAction, Fragment } from 'react';
import { MailIcon, CheckIcon, XIcon, FolderIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { Document, Page } from 'react-pdf';
import _get from 'lodash/get';
import AmendLabel from '../../../components/feature/classification/AmendLabel';
import FolderTree, { Folder } from '../../../components/common/Widget/FolderTree';
import { Transition } from '@headlessui/react';
import FolderTreeForMoving from '../../../components/common/Widget/FolderTreeForMoving';
import MyModal from '../../../components/common/Widget/MyModal';
import Link from 'next/link';
import EditLabel from '../../../components/feature/setting/label/EditLabel';
import Router from 'next/router';

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
    documentPath: { id: string | null; name: string }[];
    visable: boolean;
    setVisable: any;
    documentName: string;
    setDocumentName: any;
    changeDocumentName: any;
    recoverDocumentName: any;
    isChangeName: boolean;
    tagName: string;
    setTagName: any;
    tagTypes: any;
    newLabelName: string;
    setNewLabelName: any;
    addNewLabelHandler: any;
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
        documentPath,
        visable,
        setVisable,
        documentName,
        setDocumentName,
        changeDocumentName,
        recoverDocumentName,
        isChangeName,
        tagName,
        setTagName,
        tagTypes,
        newLabelName,
        setNewLabelName,
        addNewLabelHandler
    } = props;
    const [open, setOpen] = useState(false);
    const [openEditLabel, setOpenEditLabel] = useState(false);
    // function handleChange(e: any) {
    //     console.log('latestPredictionData',latestPredictionData);

    //     console.log(e.target.value);
    //     setDocumentName(e.target.value)
    // }
    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ');
    }
    return (
        <>
            <AmendLabel
                {...{
                    open,
                    setOpen,
                    allLabelsData,
                    confirmDocumentFormik,
                    addNewTagFormik,
                    setTagName,
                    setOpenEditLabel
                }}
            />
            <EditLabel
                {...{
                    open: openEditLabel,
                    setOpen: setOpenEditLabel,
                    tagTypes,
                    newLabelName,
                    setNewLabelName,
                    addNewLabelHandler
                }}
            />
            <div className="  bg-slate-50 min-h-screen ">
                <header className="shadow bg-white">
                    <div className="   py-6 px-4 sm:px-6 lg:px-8  flex justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">確認資料</h1>
                        {/* <div className=' items-center  flex  justify-center '>
                            <label className=''>已完成 3 / 4 文檔的處理</label>
                            <Link href={'/classification/show'}>
                                <a className='text-indigo-600 underline ml-4'>查看</a>
                            </Link>
                        </div> */}
                        <Link href={'/classification/logs'}>
                            <XIcon className=" cursor-pointer w-8 h-8" />
                        </Link>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mb-0">
                        <div className="px-4 py-0 sm:px-0 border-4 bg-white border-dashed border-gray-200">
                            {/* <p className="mb-2 text-lg">Document AI的建議</p> */}
                            <div className="flex justify-center  p-0  bg-white rounded-lg h-80vh">
                                <div className="h-full left-side flex-1 flex justify-center items-center object-contain object-center">
                                    <div className="w-full h-full flex flex-col justify-center">
                                        {/* <p>
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
                                        </p> */}
                                        <div className="w-5/6 h-full rounded-lg object-cover">
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
                                                        className="object-cover h-full shadow-lg rounded-lg"
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
                                    <div className="flex-1 flex flex-col justify-start py-0 px-2 sm:px-6 lg:flex-none lg:px-2 xl:px-2">
                                        <div className=" py-4 border-b w-full max-w-sm lg:w-96">
                                            <div>
                                                <div className="flex flex-row">
                                                    <label className="w-28 flex-0">
                                                        上傳時名稱:
                                                    </label>
                                                    <span className="font-bold text-sm flex-1">
                                                        {_get(
                                                            latestPredictionData,
                                                            'prediction.document.name'
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex flex-row mt-2 ">
                                                    <label className="w-28">上傳日期:</label>
                                                    <span className="font-bold text-sm ">
                                                        {
                                                            _get(
                                                                latestPredictionData,
                                                                'prediction.document.created_at'
                                                            )?.split('T')[0]
                                                        }
                                                    </span>
                                                </div>
                                                {/* 
                                                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                                                    AI建議的類型
                                                </h2>
                                                <p className="mt-2 text-sm text-gray-600">
                                                    基於機器學習得出的結果
                                                </p> */}
                                            </div>
                                            <div className="mx-auto mt-4 w-full max-w-sm lg:w-96 flex flex-col gap-2">
                                                {/* <div>
                                                    <h2 className="text-2xl font-extrabold text-gray-900">
                                                        移動文件
                                                    </h2>
                                                </div> */}
                                                <div className="flex flex-row items-end">
                                                    <div className="flex flex-row">
                                                        <div className=" w-28">路徑: </div>
                                                        <div className="flex flex-row gap-2">
                                                            <FolderIcon className="h-6 text-blue-200" />
                                                            <div className="flex flex-row">
                                                                {documentPath &&
                                                                    documentPath
                                                                        .slice(
                                                                            0,
                                                                            documentPath.length - 1
                                                                        )
                                                                        .map((folder) => (
                                                                            <div
                                                                                key={folder.id}
                                                                                className="flex flex-row items-center"
                                                                            >
                                                                                {folder.name}{' '}
                                                                                <ChevronRightIcon className="text-gray-400 text-sm h-5" />
                                                                            </div>
                                                                        ))}
                                                                <div className="flex flex-row items-center">
                                                                    {documentPath &&
                                                                        documentPath[
                                                                            documentPath.length - 1
                                                                        ].name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="ml-auto">
                                                        <button
                                                            className="bg-green-600 text-white text-sm px-3 py-1 w-20 rounded-md hover:bg-green-700"
                                                            onClick={() => setMode('move')}
                                                        >
                                                            移動至...
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex flex-row">
                                                    <div className="flex flex-row mt-2 w-full ">
                                                        <label className="w-28 flex justify-start">
                                                            分類:
                                                        </label>
                                                        <div>
                                                            <div className="font-bold text-sm flex items-center">
                                                                <span>
                                                                    {/* {_get(
                                                                        latestPredictionData,
                                                                        'prediction.tag.name'
                                                                    )} */}
                                                                    {tagName}
                                                                </span>
                                                            </div>
                                                            <label className="font-bold  text-sm text-green-500">
                                                                AI預測的結果
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="ml-auto">
                                                        <button
                                                            type="button"
                                                            className="flex flex-row items-center bg-red-600 text-white text-sm px-3 py-1 w-20 rounded-md hover:bg-red-700"
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
                                                </div>

                                                <div className="flex flex-row mt-2 w-full ">
                                                    <label className="w-28 flex justify-start">
                                                        現有名稱:
                                                    </label>
                                                    <div className="font-bold text-sm flex items-center">
                                                        <input
                                                            id="type"
                                                            name="path_name"
                                                            type="string"
                                                            placeholder={_get(
                                                                latestPredictionData,
                                                                'prediction.document.name'
                                                            )}
                                                            value={documentName}
                                                            onChange={(e) =>
                                                                setDocumentName(e.target.value)
                                                            }
                                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <div className="mt-8">
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
                                            </div> */}
                                        </div>

                                        {/* 當分類是請假紙時顯示 */}
                                        {tagName && tagName.indexOf('請假') != -1 && (
                                            <div className=" py-4 w-full max-w-sm lg:w-96">
                                                <p className="my-4 font-bold">
                                                    請假紙為特別分類，需特殊處理
                                                </p>
                                                <button
                                                    type="button"
                                                    className="mr-4 inline-flex items-center px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    onClick={() => {
                                                        Router.push({
                                                            pathname: '/absence/validate',
                                                            query: {
                                                                document_id: `${_get(
                                                                    latestPredictionData,
                                                                    'prediction.document.id'
                                                                )}`
                                                                // form_url: `${_get(
                                                                //     latestPredictionData,
                                                                //     'prediction.document.storage_url'
                                                                // )}`,
                                                                // form_id: `${_get(
                                                                //     latestPredictionData,
                                                                //     'prediction.form_data.id'
                                                                // )}`,
                                                                // result: JSON.stringify(_get(
                                                                //     latestPredictionData,
                                                                //     'prediction.form_data.data'
                                                                // ))
                                                            }
                                                        });
                                                        // confirmDocumentFormik.handleSubmit();
                                                    }}
                                                >
                                                    處理
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full items-center justify-center object-center bg-white pb-4 mt-10">
                                <div className="items-center">
                                    <button
                                        type="button"
                                        className="mr-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        onClick={() => {
                                            isChangeName
                                                ? recoverDocumentName()
                                                : changeDocumentName();
                                        }}
                                    >
                                        {isChangeName ? '還原名稱' : '智能改名'}
                                    </button>

                                    <button
                                        type="button"
                                        className="mr-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() => {
                                            confirmDocumentFormik.handleSubmit();
                                        }}
                                    >
                                        資料正確
                                    </button>
                                </div>
                            </div>
                            {/* <div className="flex w-full items-center justify-center object-center bg-white pb-4 mt-2">
                                <div className="items-center">
                                    { ['1','2','3'].map((item: any, index: number) => {
                                        return (
                                            <button
                                                key={index}
                                                type="button"
                                                className={classNames(
                                                    1 == 1 
                                                    ? "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500" 
                                                    : 'text-black bg-white border border-gray-600 hover:bg-gray-100 focus:ring-gray-500',
                                                    "mr-4 items-center w-8 h-8 text-center border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                                                )}
                                            >
                                                { index + 1 }
                                            </button>
                                        )
                                    })}
                                </div>
                            </div> */}
                        </div>
                    </div>
                </main>
                <FolderTreeForMoving
                    {...{
                        mode,
                        setMode,
                        movingDest,
                        setMovingDest,
                        targetId: latestPredictionData?.prediction?.document?.id
                    }}
                />
            </div>
            <MyModal
                visable={visable}
                cancelClick={() => setVisable(false)}
                cancelText={'取消'}
                confirmClick={() => setVisable(false)}
                confirmText={'確認'}
                description={`需要為請假紙進行額外處理，方可完成資料確認`}
            />
        </>
    );
}

export default ValidateView;
