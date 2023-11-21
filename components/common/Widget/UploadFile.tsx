// components/common/Widget/UploadFile.tsx
// Upload File Component

import { ChangeEvent, useRef } from 'react';
import Api from '../../../apis';
import useAlert from '../../../hooks/useAlert';

interface UploadFileProps {
    title: string;
    btnName: string;
    selectName: string;
    formik: any;
    setDocuments: any;
    multiple?: boolean;
    setMyFiles?: any;
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
        setMyFiles
    } = props;
    const fileInput = useRef<HTMLInputElement>(null);
    const { setAlert } = useAlert();

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

    return (
        <main>
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
                <span className="mt-2 block text-sm font-medium">支持20MB大小的文件</span>
            </div>
        </main>
    );
}
