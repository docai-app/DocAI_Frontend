import { useState } from 'react';
import DocumentPath from '../../../components/common/Widget/DocumentPath';
import UploadFile from '../../../components/common/Widget/UploadFile';
import Uploading from '../../../components/feature/classification/Uploading';
import UploadOperate from '../../../components/feature/classification/UploadOperate';
import UploadSet from '../../../components/feature/classification/UploadSet';

interface UploadViewProps {
    formik: any;
    setDocuments: any;
    open: boolean;
    setOpen: any;
    target_folder_id?: string;
    set_target_folder_id?: any;
    getAllLabelsData?: any;
    setTagId?: any;
    needAutoUpload: boolean;
    setNeedAutoUpload: any;
    needs_deep_understanding?: boolean;
    set_needs_deep_understanding?: any;
    needs_approval?: boolean;
    set_needs_approval?: any;
    form_schema_id?: string;
    set_form_schema_id?: any;
    schemasStatusReadyData?: any;
    showUploadSet?: boolean;
    form_miniapp?: boolean;
}

function UploadView(props: UploadViewProps) {
    const {
        formik,
        setDocuments,
        open,
        setOpen,
        target_folder_id,
        set_target_folder_id,
        setTagId,
        getAllLabelsData,
        needAutoUpload,
        setNeedAutoUpload,
        needs_deep_understanding,
        set_needs_deep_understanding,
        needs_approval,
        set_needs_approval,
        form_schema_id,
        set_form_schema_id,
        schemasStatusReadyData,
        showUploadSet = true,
        form_miniapp
    } = props;
    const [myfiles, setMyFiles] = useState<any>([]);
    return (
        <>
            <Uploading {...{ open, setOpen }} />
            <div className="min-h-full bg-slate-50">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <UploadFile
                            title="上傳文檔"
                            btnName="上傳文檔"
                            selectName="選擇文檔"
                            multiple={true}
                            {...{
                                formik,
                                setDocuments,
                                setMyFiles
                            }}
                        />

                        <DocumentPath
                            modeType={'move'}
                            target_folder_id={target_folder_id}
                            set_target_folder_id={set_target_folder_id}
                            canEditPath={!form_miniapp}
                        />
                        {showUploadSet && (
                            <UploadSet
                                needAutoUpload={needAutoUpload}
                                setNeedAutoUpload={setNeedAutoUpload}
                                needs_deep_understanding={needs_deep_understanding}
                                set_needs_deep_understanding={set_needs_deep_understanding}
                                set_needs_approval={set_needs_approval}
                                setTagId={setTagId}
                                set_form_schema_id={set_form_schema_id}
                                getAllLabelsData={getAllLabelsData}
                                schemasStatusReadyData={schemasStatusReadyData}
                            />
                        )}
                        <UploadOperate
                            myfiles={myfiles}
                            setMyFiles={setMyFiles}
                            setDocuments={setDocuments}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default UploadView;
