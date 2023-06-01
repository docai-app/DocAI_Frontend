import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';

interface UploadOperateProps {
    myfiles: [];
    setMyFiles: any;
    setDocuments: any;
}
export default function UploadOperate(props: UploadOperateProps) {
    const { myfiles, setMyFiles, setDocuments } = props;

    const fileInput = useRef<HTMLInputElement>(null);

    // const [myfiles, setMyFiles] = useState<any>([]);

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

    return (
        <>
            <div className="flex p-2 mt-2 justify-between">
                <label>
                    已選擇 <label className="text-indigo-600">{myfiles?.length}</label> 份文檔
                </label>
                <label className=" text-red-500 underline cursor-pointer" onClick={deleteAll}>
                    全部刪除
                </label>
            </div>
            <div className="flex flex-row flex-wrap items-center mb-8 w-full">
                {myfiles != null &&
                    Array.from(myfiles)?.map((doc: any, index) => {
                        return (
                            <div
                                key={`file_${doc.name}`}
                                className="w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/5 h-60 p-2 flex relative mr-0"
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
        </>
    );
}
