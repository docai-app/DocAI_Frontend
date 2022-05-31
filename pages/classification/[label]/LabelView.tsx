import _get from 'lodash/get';
import _map from 'lodash/map';

interface LabelViewProps {
    documents: Array<any>;
    label: string;
}

export default function LabelView(props: LabelViewProps) {
    const { documents = [], label = '' } = props;
    return (
        <>
            <div className="bg-indigo-700">
                <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">DocAI</span>
                        <span className="block">查找屬於"{label}"的文件</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-indigo-200">
                        輸入文件的關鍵字或文件的相關內容，我們就會幫你找到你想要的文件。
                    </p>
                    {/* <section className="mt-4 w-full sm:flex sm:items-center justify-center items-center">
                        <div className="w-full sm:max-w-xs">
                            <label htmlFor="content" className="sr-only">
                                內容
                            </label>
                            <input
                                type="text"
                                name="content"
                                id="content"
                                className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="輸入文件的關鍵字或文件的相關內容"
                                onChange={searchDocumentFormik.handleChange('content')}
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => {
                                searchDocumentFormik.handleSubmit();
                            }}
                        >
                            搜尋 🔍
                        </button>
                    </section> */}
                </div>
            </div>
            <div className="px-16">
                <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {documents.map((document) => (
                        <div key={document.id} className="group relative">
                            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                {document.storage.split(/[#?]/)[0].split('.').pop().trim() ===
                                'pdf' ? (
                                    <object
                                        className="w-full h-full object-center object-cover lg:w-full lg:h-full flex justify-center items-center"
                                        type="application/pdf"
                                        data={document.storage + '#toolbar=0'}
                                        width="250"
                                        height="200"
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
                                        src={document.storage}
                                        alt={document.name}
                                        className="w-full h-full object-contain object-center lg:w-full lg:h-full"
                                    />
                                )}
                            </div>
                            <div className="mt-4 flex justify-between overflow-hidden">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href={document.storage}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {document.name}
                                        </a>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
