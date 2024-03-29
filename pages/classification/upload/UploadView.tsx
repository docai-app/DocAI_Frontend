import { useState } from 'react';
import UploadFile from '../../../components/common/Widget/UploadFile';
import Uploading from '../../../components/feature/classification/Uploading';

interface UploadViewProps {
    formik: any;
    setDocuments: any;
    open: boolean;
    setOpen: any;
}

function UploadView(props: UploadViewProps) {
    const { formik, setDocuments, open, setOpen } = props;
    return (
        <>
            <Uploading {...{ open, setOpen }} />
            <div className="min-h-full bg-slate-50">
                {/* <header className="shadow bg-white">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">文檔分類</h1>
                    </div>
                </header> */}
                <UploadFile
                    title="上傳文檔"
                    btnName="上傳文檔"
                    selectName="選擇文檔"
                    multiple={true}
                    {...{ formik, setDocuments }}
                />
            </div>
        </>
    );
}

export default UploadView;
