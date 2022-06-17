import _get from 'lodash/get';
import _map from 'lodash/map';
import AbsenceFormTable from '../../../components/feature/absence/AbsenceFormTable';

interface AbsenceFormsProps {
    form_data: any;
    form_schema: any;
}

interface SearchViewProps {
    searchAbsenceFormik: any;
    absenceForms: AbsenceFormsProps;
}

export default function SearchView(props: SearchViewProps) {
    const { searchAbsenceFormik = { handleChange: () => {} }, absenceForms } = props;
    return (
        <>
            <div className="bg-indigo-700">
                <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">DocAI</span>
                        <span className="block">根據日期搜尋請假表</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-indigo-200">
                        輸入日期（例如：{new Date().toISOString().split('T')[0]}
                        ），我們就會幫你找到你想要的請假表。
                    </p>
                    <section className="mt-4 w-full sm:flex sm:items-center justify-center items-center">
                        <div className="w-full sm:max-w-xs">
                            <label htmlFor="content" className="sr-only">
                                內容
                            </label>
                            <input
                                type="date"
                                name="content"
                                id="content"
                                className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                defaultValue={_get(searchAbsenceFormik, 'values.date')}
                                onChange={searchAbsenceFormik.handleChange('date')}
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => {
                                searchAbsenceFormik.handleSubmit();
                            }}
                        >
                            搜尋 🔍
                        </button>
                    </section>
                </div>
            </div>
            <div className="px-16 mt-8">
                {_get(absenceForms, 'form_data.length') > 0 ? (
                    <AbsenceFormTable {...{ absenceForms }} />
                ) : (
                    <div className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
                        <div className="max-w-max mx-auto">
                            <main className="sm:flex">
                                <p
                                    style={{ lineHeight: 'inherit' }}
                                    className="text-4xl font-extrabold text-indigo-600 sm:text-5xl"
                                >
                                    Oops 😮
                                </p>
                                <div className="sm:ml-6">
                                    <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                                            暫未找到資料
                                        </h1>
                                        <p className="mt-1 text-base text-gray-500">
                                            尚未找到所選日期的請假表，請重新輸入日期。
                                        </p>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
