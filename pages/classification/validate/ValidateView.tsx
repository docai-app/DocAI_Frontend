import { TrashIcon } from '@heroicons/react/outline';
import { ChevronRightIcon, FolderIcon, XIcon } from '@heroicons/react/solid';
import _get from 'lodash/get';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Folder } from '../../../components/common/Widget/FolderTree';
import FolderTreeForMoving from '../../../components/common/Widget/FolderTreeForMoving';
import MyDateDropdown from '../../../components/common/Widget/MyDateDropdown';
import MyModal from '../../../components/common/Widget/MyModal';
import PaginationView from '../../../components/common/Widget/PaginationView';
import AmendLabel from '../../../components/feature/classification/AmendLabel';
import EditLabel from '../../../components/feature/setting/label/EditLabel';

interface LatestPredictionDataProps {
    prediction: any;
    meta: any;
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
    tagHasFunction?: boolean;
    deleteDocument?: any;
    schemasStatusReadyData?: any;
    onSubmitRecognition?: any;
    updateFormRecognitionLoading?: any;
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
        addNewLabelHandler,
        tagHasFunction,
        deleteDocument,
        schemasStatusReadyData,
        onSubmitRecognition,
        updateFormRecognitionLoading
    } = props;
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [openEditLabel, setOpenEditLabel] = useState(false);
    const [visableDelete, setVisableDelete] = useState(false);
    const [selectSchemasStatusReady, setSelectSchemasStatusReady] = useState<any>();
    useEffect(() => {
        if (
            schemasStatusReadyData &&
            schemasStatusReadyData.form_schema &&
            schemasStatusReadyData.form_schema.length > 0
        ) {
            setSelectSchemasStatusReady(schemasStatusReadyData.form_schema[0]);
        }
    }, [schemasStatusReadyData]);
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
                        <div className=" items-center  flex  justify-center ">
                            <label className="">
                                已完成 {_get(latestPredictionData, 'confirmed_count', 0)} /{' '}
                                {_get(latestPredictionData, 'unconfirmed_count', 0) +
                                    _get(latestPredictionData, 'confirmed_count', 0)}{' '}
                                文檔的處理
                            </label>
                            {/* <Link href={'/classification/show'}>
                                <a className='text-indigo-600 underline ml-4'>查看</a>
                            </Link> */}
                        </div>
                        <Link href={'/classification/logs'}>
                            <XIcon className=" cursor-pointer w-8 h-8" />
                        </Link>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mb-0">
                        <div className="px-4 py-0 sm:px-0 border-4 bg-white border-dashed border-gray-200">
                            <div className="flex justify-center  p-0  bg-white rounded-lg h-80vh">
                                <div className="h-full left-side flex-1 flex justify-center items-center object-contain object-center">
                                    <div className="w-full h-full flex flex-col justify-center">
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
                                        <div className=" py-4 border-b w-full  ">
                                            <div className="mx-auto mt-4 w-full  flex flex-col gap-2">
                                                <div className="flex flex-row items-end">
                                                    <div className="flex flex-row">
                                                        <div className=" w-28">上傳時名稱:</div>
                                                        <div className="flex flex-row gap-2">
                                                            <div className="flex flex-row">
                                                                <span className="font-bold text-sm flex-1">
                                                                    {_get(
                                                                        latestPredictionData,
                                                                        'prediction.document.name'
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="ml-auto">
                                                        <button
                                                            className="flex flex-row items-center bg-red-600 text-white text-sm px-3 py-1 w-20 rounded-md hover:bg-red-700"
                                                            onClick={() => setVisableDelete(true)}
                                                        >
                                                            <TrashIcon
                                                                className="-ml-0.5 mr-2 h-4 w-4"
                                                                aria-hidden="true"
                                                            />
                                                            刪除
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex flex-row items-end">
                                                    <div className="flex flex-row">
                                                        <div className=" w-28">上傳日期: </div>
                                                        <div className="flex flex-row gap-2">
                                                            <div className="flex flex-row">
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
                                                    </div>
                                                </div>

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
                                        </div>

                                        {/* When the tag's function is "表格深度理解", show the table */}
                                        {tagHasFunction && (
                                            <div className=" py-4 w-full max-w-sm lg:w-96">
                                                <MyDateDropdown
                                                    value={selectSchemasStatusReady?.name}
                                                    datas={schemasStatusReadyData?.form_schema}
                                                    onSwitch={(data: any) => {
                                                        console.log('data: ', data);
                                                        setSelectSchemasStatusReady(data);
                                                    }}
                                                />

                                                <p className="my-4 font-bold">
                                                    {selectSchemasStatusReady?.name}
                                                    為特別分類，需特殊處理
                                                </p>
                                                <button
                                                    type="button"
                                                    className="mr-4 inline-flex items-center px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    onClick={() => {
                                                        onSubmitRecognition(
                                                            selectSchemasStatusReady
                                                        );
                                                    }}
                                                >
                                                    {updateFormRecognitionLoading
                                                        ? '處理中...'
                                                        : '處理'}
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
                        </div>
                        <PaginationView meta={latestPredictionData?.meta} pathname={'/classification/validate'} params={{ date: router.query.date }} />
                    </div>

                </main>
                <FolderTreeForMoving
                    {...{
                        mode,
                        setMode,
                        movingDest,
                        setMovingDest,
                        targetId: latestPredictionData?.prediction?.document?.id,
                        current: { type: 'document' }
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
            <MyModal
                visable={visableDelete}
                cancelClick={() => setVisableDelete(false)}
                cancelText={'取消'}
                confirmClick={() => {
                    deleteDocument();
                    setVisableDelete(false);
                }}
                confirmText={'確認'}
                description={`是否刪除該文件？`}
            />
        </>
    );
}

export default ValidateView;
