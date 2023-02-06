import { PaperAirplaneIcon } from '@heroicons/react/solid';
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
import { withTheme } from '@rjsf/core';
import { useEffect, useState } from 'react';
import { Folder } from '../../../../../components/common/Widget/FolderTree';
import FolderTreeForSelect from '../../../../../components/common/Widget/FolderTreeForSelect';
import SingleActionModel from '../../../../../components/common/Widget/SingleActionModel';
import EditNewProjectModal from '../../../../../components/feature/new/form/EditNewProjectModal';

const Form = withTheme(Bootstrap4Theme);

interface FormApprovalViewProps {
    formUrl: string;
    result: any;
    setResult: any;
    approval: any;
    formSchema: any;
    approvalSchema: { current: any };
    uiSchema: { current: any };
    approvalUiSchema: { current: any };
    widgets: any;
    fields: any;
    onSubmit: any;
    onConfirm: any;
    setPreview: any;
    previewFormProjectionLoading: boolean;
    open: boolean;
    setOpen: any;
    visiable: boolean;
    setVisiable: any;
    actionContent: string;
}

function FormApprovalView(props: FormApprovalViewProps) {
    const {
        formUrl = '',
        result = {},
        setResult,
        approval = {},
        formSchema = {},
        approvalSchema = { current: {} },
        uiSchema = { current: {} },
        approvalUiSchema = { current: {} },
        widgets = {},
        fields = {},
        onSubmit,
        onConfirm,
        setPreview,
        previewFormProjectionLoading,
        open,
        setOpen,
        visiable,
        setVisiable,
        actionContent
    } = props;

    const [mode, setMode] = useState('');
    const [movingDest, setMovingDest] = useState<Folder | null>(null);
    const [filename, setFilename] = useState('');
    useEffect(() => {
        if (movingDest?.id) {
            setVisiable(true);
        }
    }, [movingDest]);
    return (
        <>
            <SingleActionModel
                {...{
                    open,
                    setOpen,
                    title: '進行中......',
                    content: actionContent,
                    icon: (
                        <PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    )
                }}
            />
            <div className="min-h-full">
                <header className="bg-white">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            填寫表格({formSchema.title} )
                        </h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-0 sm:px-0 lg:px-0">
                        <div className="px-4 pb-8 sm:px-0">
                            <div className="flex justify-center md:items-center flex-col md:flex-row p-0 border-0 border-dashed border-gray-200 bg-white h-80vh">
                                <div className="h-full left-side flex-1 flex justify-center items-center object-contain object-center">
                                    <div className="w-full md:w-full m-4 h-5/6 border-4 border-dashed border-gray-200 bg-white rounded-lg object-cover">
                                        {formUrl.split('.').pop() === 'pdf' ? (
                                            <object
                                                className="object-center object-cover w-full h-full flex justify-center items-center"
                                                type="application/pdf"
                                                data={formUrl + '#toolbar=0'}
                                                width="250"
                                            >
                                                <img
                                                    src={
                                                        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png'
                                                    }
                                                    alt="PDF file icon"
                                                    className="w-1/2 h-1/2 object-contain object-center"
                                                />
                                            </object>
                                        ) : (
                                            <img
                                                className="w-full h-full object-contain object-center lg:w-full lg:h-full"
                                                src={formUrl}
                                                alt={formUrl}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="right-side flex-1 flex flex-col overflow-auto h-5/6 py-2 pl-2">
                                    <Form
                                        className="w-5/6"
                                        schema={formSchema}
                                        uiSchema={uiSchema.current}
                                        widgets={widgets.current}
                                        fields={fields.current}
                                        formData={result}
                                        onChange={(data: any) => {
                                            setResult(data.formData);
                                            setPreview(false);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex w-full pb-4  text-center items-center justify-center object-center bg-white ">
                                <input
                                    className="rounded-md checked:text-slate-500 "
                                    type="checkbox"
                                    checked={true}
                                    disabled={true}
                                />
                                <label className="text-gray-500 r">我已核對所有資料</label>
                            </div>
                            <div className="flex w-full items-center justify-center object-center bg-white ">
                                <Form
                                    schema={approvalSchema.current}
                                    uiSchema={approvalUiSchema.current}
                                    widgets={widgets.current}
                                    fields={fields.current}
                                    formData={approval}
                                    onSubmit={onSubmit}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <EditNewProjectModal
                visable={visiable}
                setMode={setMode}
                movingDest={movingDest}
                filename={filename}
                setFilename={setFilename}
                cancelClick={() => {
                    setVisiable(false);
                }}
                confirmClick={(data: any) => {
                    setVisiable(false);
                    onConfirm({
                        filename: filename,
                        target_folder_id: movingDest?.id
                    });
                    setFilename('');
                }}
            />
            <FolderTreeForSelect
                {...{
                    mode,
                    setMode,
                    movingDest,
                    setMovingDest,
                    targetId: ''
                }}
            />
        </>
    );
}
export default FormApprovalView;
