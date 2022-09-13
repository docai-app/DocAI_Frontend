import _get from 'lodash/get';
import { withTheme } from '@rjsf/core';
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
import InputRemarkModal from '../../../../components/common/Widget/InputRemarkModal';

const Form = withTheme(Bootstrap4Theme);

interface ValidateViewProps {
    formUrl: string;
    result: any;
    approval: any;
    formSchema: any;
    approvalSchema: { current: any };
    uiSchema: { current: any };
    approvalUiSchema: { current: any };
    widgets: any;
    fields: any;
    onSubmit: any;
    visable: boolean;
    setVisable: any;
    extraData: any;
    setExtraData: any;
}

function ValidateView(props: ValidateViewProps) {
    const {
        formUrl = '',
        result = {},
        approval = {},
        formSchema = {},
        approvalSchema = { current: {} },
        uiSchema = { current: {} },
        approvalUiSchema = { current: {} },
        widgets = {},
        fields = {},
        onSubmit,
        visable,
        setVisable,
        extraData = {},
        setExtraData
    } = props;
    return (
        <>
            <div className="min-h-full bg-slate-50">
                <header className="shadow bg-white">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">文件審批</h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-0 sm:px-0 lg:px-0">
                        <div className="px-4 py-6 sm:px-0">
                            <p className="mb-2 text-lg">請假紙</p>
                            <div className="flex justify-center md:items-center flex-col md:flex-row p-0 border-0 border-dashed border-gray-200 bg-white rounded-lg h-80vh">
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
                                    />
                             
                                </div>
                            </div>
                            <div className='flex w-full pb-4  text-center items-center justify-center object-center bg-white '>
                            <input
                                    className="rounded-md    checked:text-slate-500 "
                                    type="checkbox"
                                    checked={true}
                                    disabled={true}

                                />
                                <label className='text-gray-500 r'>我已核對所有資料</label>
                            </div>
                            <div className='flex w-full items-center justify-center object-center bg-white '>
                                <Form
                                    // className="w-5/6"
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
            <InputRemarkModal visable={visable}  approval={approval} cancelClick={()=>setVisable(false)} confirmClick={(data: any)=>{setExtraData(data);setVisable(false);onSubmit(data)
            }}/>
        </>
    );
}

export default ValidateView;
