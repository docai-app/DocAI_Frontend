import UploadFile from '../../../components/common/Widget/UploadFile';
import Uploading from '../../../components/feature/classification/Uploading';

interface UploadViewProps {
    formik: any;
    setDocuments: any;
    open: boolean;
    setOpen: any;
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
}

function UploadView(props: UploadViewProps) {
    const {
        formik,
        setDocuments,
        open,
        setOpen,
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
        set_form_schema_id
    } = props;
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
                    {...{
                        formik,
                        setDocuments,
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
                        set_form_schema_id
                    }}
                />
            </div>
        </>
    );
}

export default UploadView;
