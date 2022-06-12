// components/common/Widget/UploadFile.tsx
// Upload File Component
import { ChangeEvent, useRef } from 'react';

interface UploadFileProps {
    title: string;
    btnName: string;
    selectName: string;
    formik: any;
    setDocuments: any;
    multiple?: boolean;
}

export default function UploadFile(props: UploadFileProps) {
    const { title, btnName, selectName, multiple = false, formik, setDocuments } = props;
    const fileInput = useRef<HTMLInputElement>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setDocuments(event.target.files);
        }
    };

    const readableSize = (size: number) => {
        if (size > 1000000) return `${Math.round(size / 1000000)}MB`;
        if (size > 1000) return `${Math.round(size / 1000)}kB`;
        return `${size}B`;
    };

    return (
        <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <p className="text-lg mb-2">{title}</p>
                    <div className="h-70vh flex flex-col justify-center items-center text-gray-500 bg-white border-4 border-dashed border-gray-200 rounded-lg relative">
                        <div className="absolute top-4 left-4 flex flex-row flex-wrap gap-4">
                            {fileInput.current?.files != null &&
                                Array.from(fileInput.current.files).map((doc) => {
                                    return (
                                        <div
                                            key={`file_${doc.name}`}
                                            className="w-48 h-60 p-2 rounded-lg border-2 border-dashed border-neutral-200 bg-neutral-50 shadow-sm flex flex-col justify-between"
                                        >
                                            {doc.type.includes('image/') ? (
                                                <div className="h-40 flex items-center">
                                                    <img
                                                        src={URL.createObjectURL(doc)}
                                                        className="rounded-lg shadow-sm object-cover h-full w-full"
                                                    />
                                                </div>
                                            ) : (
                                                <object
                                                    className="h-40 flex justify-center items-center"
                                                    type="application/pdf"
                                                    data={URL.createObjectURL(doc)}
                                                >
                                                    <img
                                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png"
                                                        className="rounded-lg shadow-sm object-contain object-center h-20"
                                                    />
                                                </object>
                                            )}
                                            <div className="text-sm text-neutral-900 whitespace-nowrap text-ellipsis overflow-hidden">
                                                {doc.name}
                                            </div>
                                            <div className="text-sm">
                                                大小：{readableSize(doc.size)}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
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
                                    accept="image/*,.pdf"
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    ref={fileInput}
                                />
                            </label>
                        </div>
                        <span className="mt-2 block text-sm font-medium">
                            PNG, JPG, PDF up to 5MB
                        </span>
                        <button
                            type="button"
                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => {
                                formik.handleSubmit();
                            }}
                        >
                            {btnName}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
