import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
import { withTheme } from '@rjsf/core';
import SingleActionModel from '../../../components/common/Widget/SingleActionModel';

const Form = withTheme(Bootstrap4Theme);

interface ValidateViewProps {
    formUrl: string;
    formSchema: any;
    loading: boolean;
    data: any;
    setData: any;
    handleConfirm: any;
    open: any;
    setOpen: any;
}

function ValidateView(props: ValidateViewProps) {
    const {
        formUrl = '',
        formSchema,
        loading,
        data,
        setData,
        handleConfirm,
        open,
        setOpen
    } = props;

    return (
        <>
            <SingleActionModel
                open={open}
                setOpen={setOpen}
                title={'進行中......'}
                content={'正在更新...'}
                icon={<PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />}
            />

            <div className="min-h-full bg-slate-50">
                <header className="shadow bg-white">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">資料編輯</h1>
                    </div>
                </header>

                <main>
                    <div className="max-w-7xl mx-auto py-0 sm:px-6 lg:px-8">
                        {loading ? (
                            <div>載入中...</div>
                        ) : (
                            <div className="px-4 py-6 sm:px-0">
                                <div className="flex flex-col sm:flex-row justify-center items-center p-0 border-0 border-dashed border-gray-200 bg-white rounded-lg h-80vh flex-wrap">
                                    <div className="h-full w-full  flex-1 flex justify-left items-center object-contain object-center">
                                        <div className="w-full h-full border-4 border-dashed border-gray-200 bg-white rounded-lg object-cover">
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
                                    <div className="w-full flex-1 h-full px-4 py-2">
                                        <div className="justify-start flex flex-col  ">
                                            {formSchema?.map((filter: any, index: number) => {
                                                return (
                                                    <div
                                                        className="m-2 flex flex-col items-center"
                                                        key={index}
                                                    >
                                                        <label className="w-full font-bold">
                                                            {filter?.query}:
                                                        </label>
                                                        <input
                                                            // type={filter?.data_type == 'date' ? 'date' : 'text'}
                                                            type={'text'}
                                                            defaultValue={data?.[filter.key]}
                                                            className="mt-1 border p-2 w-full rounded-md shadow-sm border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-slate-300  "
                                                            onChange={(e) => {
                                                                setData({
                                                                    ...data,
                                                                    [filter.key]: e.target.value
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                );
                                            })}
                                            <div className="flex justify-center my-4">
                                                <button
                                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded px-6 py-2 self-end mt-auto"
                                                    onClick={handleConfirm}
                                                >
                                                    確認
                                                </button>
                                            </div>
                                        </div>
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
