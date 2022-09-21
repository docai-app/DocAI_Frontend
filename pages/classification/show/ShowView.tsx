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

interface ShowViewProps {
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
    newLabelName: string, 
    setNewLabelName: any, 
    addNewLabelHandler: any
}

function ValidateView(props: ShowViewProps) {
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
                {...{ open, setOpen, allLabelsData, confirmDocumentFormik, addNewTagFormik, setTagName, setOpenEditLabel }}
            />
            <EditLabel
                {...{ open: openEditLabel, setOpen: setOpenEditLabel, tagTypes, newLabelName, setNewLabelName, addNewLabelHandler}}
            />
            <div className="  bg-slate-50 min-h-screen ">
                <header className="shadow bg-white">
                    <div className="   py-6 px-4 sm:px-6 lg:px-8  flex justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">查看文檔</h1>
                        <Link href={'/classification/logs'}>
                            <XIcon className=' cursor-pointer w-8 h-8'/>
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
                                            </div>
                                            <div className="mx-auto mt-4 w-full max-w-sm lg:w-96 flex flex-col gap-2">
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
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-row mt-2 w-full ">
                                                    <label className="w-28 flex justify-start">
                                                        現有名稱:
                                                    </label>
                                                    <div className="font-bold text-sm flex items-center">
                                                        {_get(
                                                            latestPredictionData,
                                                            'prediction.document.name'
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full items-center justify-center object-center bg-white pb-4 mt-10">
                                <div className="items-center">
                                    <button
                                        type="button"
                                        className="mr-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() => {
                                            confirmDocumentFormik.handleSubmit();
                                        }}
                                    >
                                        編輯
                                    </button>
                                </div>
                            </div>
                            <div className="flex w-full items-center justify-center object-center bg-white pb-4 mt-2">
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
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default ValidateView;
