// components/common/Widget/UploadFile.tsx
// Upload File Component
import { FolderIcon } from '@heroicons/react/20/solid';
import { ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import useAxios from 'axios-hooks';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Api from '../../../apis';
import useAlert from '../../../hooks/useAlert';
import { Folder } from './FolderTree';
import FolderTreeForSelect from './FolderTreeForSelect';

interface UploadFileProps {
    title: string;
    btnName: string;
    selectName: string;
    formik: any;
    setDocuments: any;
    multiple?: boolean;
    set_target_folder_id?: any;
    needAutoUpload?: boolean;
    setNeedAutoUpload?: any;
    getAllLabelsData?: any;
    setTagId?: any;
    needs_deep_understanding?: boolean;
    set_needs_deep_understanding?: any;
    needs_approval?: boolean;
    set_needs_approval?: any;
    form_schema_id?: string;
    set_form_schema_id?: any;
    schemasStatusReadyData?: any;
}

const apiSetting = new Api();

export default function UploadFile(props: UploadFileProps) {
    const {
        title,
        btnName,
        selectName,
        multiple = false,
        formik,
        setDocuments,
        set_target_folder_id,
        getAllLabelsData,
        setTagId,
        needAutoUpload,
        setNeedAutoUpload,
        needs_deep_understanding,
        set_needs_deep_understanding,
        needs_approval,
        set_needs_approval,
        form_schema_id,
        set_form_schema_id,
        schemasStatusReadyData
    } = props;
    const fileInput = useRef<HTMLInputElement>(null);
    const { setAlert } = useAlert();

    const [myfiles, setMyFiles] = useState<any>([]);
    const [mode, setMode] = useState('');
    const [movingDest, setMovingDest] = useState<Folder | null>(null);
    const [documentPath, setDocumentPath] = useState<{ id: string | null; name: string }[]>([
        { id: null, name: 'Root' }
    ]);
    const [tagFunctions, setTagFunctions] = useState([]);

    const [{ data: showFolderByIDData }, showFolderByID] = useAxios({}, { manual: true });
    useEffect(() => {
        if (showFolderByIDData?.success) {
            setDocumentPath([
                { id: null, name: 'Root' },
                ...showFolderByIDData.ancestors.slice().reverse(),
                showFolderByIDData.folder
            ]);
        }
    }, [showFolderByIDData]);

    useEffect(() => {
        if (movingDest?.id) {
            showFolderByID(apiSetting.Folders.showFolderByID(movingDest?.id));
            set_target_folder_id(movingDest?.id);
        }
    }, [movingDest, showFolderByID]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        // Set the selected maximum file limit to 50 files:
        if (event.target.files && event.target.files.length > 50) {
            setAlert({ title: '最多只能上傳50個文檔', type: 'warning' });
            return;
        } else if (event.target.files && event.target.files.length > 0) {
            setDocuments(event.target.files);
            setMyFiles(event.target.files);
        }
    };

    const readableSize = (size: number) => {
        if (size > 1000000) return `${Math.round(size / 1000000)}MB`;
        if (size > 1000) return `${Math.round(size / 1000)}kB`;
        return `${size}B`;
    };

    const deleteAll = () => {
        if (fileInput.current != null) fileInput.current.value = '';
        setDocuments([]);
        setMyFiles([]);
    };
    const deleteOne = (index: number) => {
        const fileListArr = Array.from(myfiles);
        fileListArr.splice(index, 1); // here u remove the file
        setDocuments(fileListArr);
        setMyFiles(fileListArr);
    };
    const checkHasFormUnderstanging = (tag_id: string, index: number) => {
        const functions = getAllLabelsData.tags[index].functions;
        setTagFunctions(functions);
        if (functions && functions.length > 0) {
            set_form_schema_id(functions[0].id);
        } else {
            set_form_schema_id('');
        }
    };

    return (
        <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex justify-between mb-4">
                        {/* <p className="text-lg">{title}</p> */}
                        <h1 className="text-3xl font-bold text-gray-900">上傳文檔</h1>
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => {
                                formik.handleSubmit();
                            }}
                        >
                            {btnName}
                        </button>
                    </div>

                    <div className="p-8 flex flex-col justify-center items-center text-gray-500 bg-white border-4 border-dashed border-gray-200 rounded-lg relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-20 w-20 stroke-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            />
                        </svg>
                        <div className="flex justify-center items-center">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                                <p className="px-4">{selectName}</p>
                                <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                    multiple={multiple}
                                    // accept="image/*,.pdf"
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    ref={fileInput}
                                />
                            </label>
                        </div>
                        <span className="mt-2 block text-sm font-medium">支持10MB大小的文件</span>
                    </div>
                    <div className="mt-4 rounded-md border-2 border-gray-200 p-4 bg-white">
                        <label className="text-md font-bold text-gray-900">儲存路徑</label>
                        <div className="flex flex-row justify-between mt-2">
                            <div className="flex flex-row">
                                <FolderIcon className="h-6 text-blue-200" />
                                {documentPath &&
                                    documentPath.slice(0, documentPath.length - 1).map((folder) => (
                                        <div key={folder.id} className="flex flex-row items-center">
                                            {folder.name}{' '}
                                            <ChevronRightIcon className="text-gray-400 text-sm h-5" />
                                        </div>
                                    ))}
                                <div className="flex flex-row items-center">
                                    {documentPath && documentPath[documentPath.length - 1].name}
                                </div>
                            </div>
                            <a
                                className="text-indigo-600 underline cursor-pointer"
                                onClick={() => {
                                    setMode('move');
                                }}
                            >
                                編輯
                            </a>
                        </div>
                    </div>
                    <div className="mt-4 rounded-md border-2 border-gray-200 p-4 bg-white">
                        <label className="text-md font-bold text-gray-900">批量上傳</label>
                        <div className="flex flex-row justify-between mt-2">
                            <div className="flex flex-row items-center">
                                <input
                                    type={'checkbox'}
                                    name="needAutoUpload"
                                    onChange={(e) => {
                                        setNeedAutoUpload(e.target.checked);
                                    }}
                                />
                                <label className="ml-2 text-md font-bold text-gray-900">
                                    是否需要自動批量上傳?
                                    <label className="text-sm text-gray-500">(需要統一標籤)</label>
                                </label>
                            </div>
                        </div>
                        <div className={`${needAutoUpload ? 'my-2' : 'my-2 hidden'}`}>
                            <label className="font-bold text-gray-900">批量文件的類別</label>
                            <select
                                id="select_tag"
                                name="location"
                                className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue=""
                                onChange={(e) => {
                                    setTagId(e.target.value);
                                    // checkHasFormUnderstanging(e.target.value, e.target.selectedIndex - 1)
                                }}
                            >
                                <option value="" disabled>
                                    請選擇類別
                                </option>
                                {getAllLabelsData?.tags.map((tag: any, index: number) => {
                                    return (
                                        <option key={index} value={tag.id}>
                                            {tag.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className={`${needAutoUpload ? 'my-2' : 'my-2 hidden'}`}>
                            <div className="flex flex-row justify-between mt-2">
                                <div className="flex flex-row items-center">
                                    <input
                                        type={'checkbox'}
                                        name="needAutoUpload"
                                        onChange={(e) => {
                                            set_needs_deep_understanding(e.target.checked);
                                        }}
                                    />
                                    <label className="ml-2 text-md font-bold text-gray-900">
                                        是否需要表格深度理解?
                                        <label className="text-sm text-gray-500">
                                            (需要統一標籤)
                                        </label>
                                    </label>
                                </div>
                            </div>
                            <div className={`${needs_deep_understanding ? 'my-2' : 'my-2 hidden'}`}>
                                <label className="font-bold text-gray-900">
                                    表格深度理解的模型
                                </label>
                                <select
                                    id="select_tag_function"
                                    name="location"
                                    className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue=""
                                    onChange={(e) => {
                                        set_form_schema_id(e.target.value);
                                    }}
                                >
                                    <option value="" disabled>
                                        請選擇模型
                                    </option>
                                    {schemasStatusReadyData?.form_schema?.map(
                                        (schema: any, index: number) => {
                                            return (
                                                <option key={index} value={schema.id}>
                                                    {schema.name}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                            </div>
                            <div
                                className={`${
                                    needs_deep_understanding
                                        ? 'flex flex-row justify-between mt-2'
                                        : 'flex-row justify-between hidden'
                                }`}
                            >
                                <div className="flex flex-row items-center">
                                    <input
                                        type={'checkbox'}
                                        name="needAutoUpload"
                                        onChange={(e) => {
                                            set_needs_approval(e.target.checked);
                                        }}
                                    />
                                    <label className="ml-2 text-md font-bold text-gray-900">
                                        是否需要進行審批?
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FolderTreeForSelect
                        {...{
                            mode,
                            setMode,
                            movingDest,
                            setMovingDest,
                            targetId: ''
                        }}
                    />
                    <div className="flex p-2 mt-2 justify-between">
                        <label>
                            已選擇 <label className="text-indigo-600">{myfiles?.length}</label>{' '}
                            份文檔
                        </label>
                        <label
                            className=" text-red-500 underline cursor-pointer"
                            onClick={deleteAll}
                        >
                            全部刪除
                        </label>
                    </div>
                    <div className="flex flex-row flex-wrap items-center mb-8 w-full">
                        {myfiles != null &&
                            Array.from(myfiles)?.map((doc: any, index) => {
                                return (
                                    <div
                                        key={`file_${doc.name}`}
                                        className="w-1/6 h-60 p-2 flex relative mr-2"
                                    >
                                        <div className="w-full h-full rounded-lg border-2 border-dashed border-neutral-200 bg-neutral-50 shadow-sm">
                                            {doc.type.includes('image/') ? (
                                                <div className="h-40 flex items-center">
                                                    <img
                                                        alt="Image Preview"
                                                        src={URL.createObjectURL(doc)}
                                                        className="rounded-lg shadow-sm object-contain object-center h-full w-full"
                                                    />
                                                </div>
                                            ) : null}
                                            {doc.type.includes('application/pdf') ? (
                                                <object
                                                    className="w-full h-40 flex justify-center items-center"
                                                    type="application/pdf"
                                                    data={URL.createObjectURL(doc)}
                                                >
                                                    <img
                                                        alt="PDF Preview"
                                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png"
                                                        className="rounded-lg shadow-sm object-contain object-center h-20"
                                                    />
                                                </object>
                                            ) : null}
                                            <div className="p-2">
                                                <div className="text-sm text-neutral-900 whitespace-nowrap text-ellipsis overflow-hidden">
                                                    {doc.name}
                                                </div>
                                                <div className="text-sm">
                                                    大小：{readableSize(doc.size)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" absolute flex -right-1 -top-1">
                                            <button
                                                type="button"
                                                className="cursor-pointer inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                onClick={() => deleteOne(index)}
                                            >
                                                {/* <label className="cursor-pointer h-5 w-5">X</label> */}
                                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                            </button>
                                            {/* <label className=' cursor-pointer p-10 text-white bg-red-500 text-center justify-center items-center rounded-full'>X</label> */}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </main>
    );
}
