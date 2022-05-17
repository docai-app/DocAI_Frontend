import _get from 'lodash/get';
import MultipleChoice from '../../../components/absence/validate/MultipleChoice';
import TextInput from '../../../components/absence/validate/TextInput';
import DateInput from '../../../components/absence/validate/DateInput';
import NumberInput from '../../../components/absence/validate/NumberInput';
import { withTheme } from '@rjsf/core';
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
import 'bootstrap/dist/css/bootstrap.min.css';

const Form = withTheme(Bootstrap4Theme);

interface ValidateViewProps {
    formUrl: string;
    result: any;
    setResult: Function;
    formSchema: any;
    uiSchema: any;
}

function ValidateView(props: ValidateViewProps) {
    const { formUrl = '', result = {}, setResult, formSchema = {}, uiSchema = {} } = props;

    return (
        <>
            <div className="min-h-full bg-slate-50">
                <header className="shadow bg-white">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">請假表識別</h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                            <p className="mb-2 text-lg">DocAI的分析結果</p>
                            <div className="flex justify-center items-center p-4 border-4 border-dashed border-gray-200 bg-white rounded-lg h-80vh">
                                <div className="h-full left-side flex-1 flex justify-center items-center object-contain object-center">
                                    <div className="w-5/6 h-5/6 border-4 border-dashed border-gray-200 bg-white rounded-lg object-cover">
                                        {formUrl.split('.').pop() === 'pdf' ? (
                                            <object
                                                className="object-center object-cover lg:w-full lg:h-full flex justify-center items-center"
                                                type="application/pdf"
                                                data={formUrl + '#toolbar=0'}
                                                width="250">
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
                                        uiSchema={uiSchema}
                                        formData={result}
                                        onSubmit={(data) => {
                                            console.log(data);
                                        }}
                                    />
                                    {/* <form className="flex flex-col w-5/6">
                                        <div className="flex flex-col gap-2 py-3 border-b">
                                            {Array.from(result.entries()).map(([id, item]) => {
                                                if (item.type === 'MultipleChoice') {
                                                    return (
                                                        <MultipleChoice
                                                            {...item}
                                                            updateResult={updateResult}
                                                            componentId={id}
                                                            key={id}
                                                        />
                                                    );
                                                }
                                                if (item.type === 'TextInput') {
                                                    return (
                                                        <TextInput
                                                            {...item}
                                                            updateResult={updateResult}
                                                            componentId={id}
                                                            key={id}
                                                        />
                                                    );
                                                }
                                                if (item.type === 'DateInput') {
                                                    return (
                                                        <DateInput
                                                            {...item}
                                                            updateResult={updateResult}
                                                            componentId={id}
                                                            key={id}
                                                        />
                                                    );
                                                }
                                                if (item.type === 'NumberInput') {
                                                    return (
                                                        <NumberInput
                                                            {...item}
                                                            updateResult={updateResult}
                                                            componentId={id}
                                                            key={id}
                                                        />
                                                    );
                                                }
                                            })}
                                        </div>
                                        <div onClick={() => console.log(result)}>log result</div>
                                        <div className="grid grid-cols-12 gap-4 max-w-full pt-3">
                                            <div className="col-span-full">
                                                <h3 className="font-bold">說明（如有需要）</h3>
                                                <textarea className="mt-1 border p-2 rounded-md shadow-sm border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-slate-300 w-full" />
                                            </div>
                                        </div>
                                    </form> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default ValidateView;
