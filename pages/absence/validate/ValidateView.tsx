import Image from 'next/image';
import _get from 'lodash/get';

interface ValidateViewProps {
    formUrl: string;
    result: any;
}

function ValidateView(props: ValidateViewProps) {
    const { formUrl = '', result = {} } = props;
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
                                <div className="right-side flex-1">
                                    <form className="flex flex-col w-5/6">
                                        <div className="grid grid-cols-3">
                                            <div className="flex flex-row justify-center items-center">
                                                <input type="radio" id="checkbox_urgent" name="method" />
                                                <label className="ml-2"  htmlFor="checkbox_urgent">緊急</label>
                                            </div>
                                            <div className="flex flex-row justify-center items-center">
                                                <input type="radio" id="checkbox_phone" name="method" />
                                                <label className="ml-2" htmlFor="checkbox_phone">電話通知</label>
                                            </div>
                                            <div className="flex flex-row justify-center items-center">
                                                <input type="radio" id="checkbox_pre" name="method" />
                                                <label className="ml-2" htmlFor="checkbox_pre">預先批准</label>
                                            </div>
                                        </div>
                                        <div></div>
                                    </form>
                                    {/* {Object.keys(result).map(function (key) {
                                        return (
                                            <p key={key} className="mb-4">
                                                <span className="font-bold">{key}: </span>
                                                {result[key]}
                                            </p>
                                        );
                                    })} */}
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
