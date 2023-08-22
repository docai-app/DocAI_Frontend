import { useState } from 'react';
import UploadFile from '../../../../components/common/Widget/UploadFile';
import Uploading from '../../../../components/feature/classification/Uploading';
import _get from 'lodash/get';
import _map from 'lodash/map';

interface UploadViewProps {
    formik: any;
    setDocuments: any;
    tags: Array<any>;
    open: boolean;
    setOpen: any;
}

function UploadView(props: UploadViewProps) {
    const { formik, setDocuments, tags, open, setOpen } = props;
    return (
        <>
            <Uploading {...{ open, setOpen }} />
            <div className="min-h-full bg-slate-50">
                <header className="shadow bg-white">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">同一類型批量上傳文件</h1>
                    </div>
                </header>
                <div className="max-w-7xl mx-auto pt-8 sm:px-6 lg:px-8">
                    <div className="w-full">
                        <label
                            htmlFor="new-type"
                            className="block text-lg font-medium text-gray-700"
                        >
                            選擇批量文件的類型
                        </label>
                        <div className="flex mt-1">
                            <select
                                id="new-type"
                                name="new-type"
                                className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                onChange={async (e) => {
                                    formik.setFieldValue('tag_id', e.target.value);
                                }}
                            >
                                <option value="" selected disabled hidden>
                                    請選擇文件的類型
                                </option>
                                {_map(_get(tags, 'tags'), (item: any) => {
                                    return (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                </div>
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
