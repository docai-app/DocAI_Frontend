import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
import { withTheme } from '@rjsf/core';

const Form = withTheme(Bootstrap4Theme);

interface ValidateViewProps {
    formUrl: string;
    result: any;
    setResult: any;
    formSchema: any;
    uiSchema: any;
    widgets: any;
    fields: any;
    absenceFormFormik: any;
    getAbsenceFormRecognitionByIdDataLoading: boolean;
}

function ValidateView(props: ValidateViewProps) {
    const {
        formUrl = '',
        result = {},
        setResult,
        formSchema = {
            current: {}
        },
        uiSchema = {},
        widgets = {},
        fields = {},
        absenceFormFormik,
        getAbsenceFormRecognitionByIdDataLoading
    } = props;

    return (
        <>
            <div className="min-h-full bg-slate-50">
                <header className="shadow bg-white">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">資料確認</h1>
                    </div>
                </header>

                <main>
                    <div className="max-w-7xl mx-auto py-0 sm:px-6 lg:px-8">
                        {getAbsenceFormRecognitionByIdDataLoading ? (
                            <div>載入中...</div>
                        ) : (
                            <div className="px-4 py-6 sm:px-0">
                                <div className="flex justify-center items-center p-0 border-0 border-dashed border-gray-200 bg-white rounded-lg h-80vh">
                                    <div className="h-full left-side flex-1 flex justify-left items-center object-contain object-center">
                                        <div className="w-5/6 h-full border-4 border-dashed border-gray-200 bg-white rounded-lg object-cover">
                                            {formUrl.split('.').pop() === 'pdf' ? (
                                                <object
                                                    className="object-center object-cover lg:w-full lg:h-full flex justify-center items-center"
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
                                    <div className="right-side flex-1 justify-center flex overflow-auto h-5/6 py-2">
                                        <Form
                                            className="w-5/6"
                                            schema={formSchema}
                                            uiSchema={uiSchema.current}
                                            formData={result}
                                            widgets={widgets.current}
                                            fields={fields.current}
                                            onSubmit={(data) => {
                                                setResult(data.formData);
                                                absenceFormFormik.setFieldValue(
                                                    'data',
                                                    data.formData
                                                );
                                                absenceFormFormik.handleSubmit();
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}

export default ValidateView;
