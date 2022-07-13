import _get from 'lodash/get';
import _map from 'lodash/map';
import SingleActionModel from '../../../components/common/Widget/SingleActionModel';
import { SearchIcon } from '@heroicons/react/outline';

interface LabelViewProps {
    documents: Array<any>;
    tagName: string;
    open: boolean;
    setOpen: any;
}

export default function TagView(props: LabelViewProps) {
    const { documents = [], tagName = '', open, setOpen } = props;
    return (
        <>
            <SingleActionModel
                {...{
                    open,
                    setOpen,
                    title: '正在搜尋......',
                    content: '文檔搜尋中，請稍候。',
                    icon: <SearchIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                }}
            />
            <div className="bg-indigo-700">
                <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">DocAI</span>
                        <span className="block">查找屬於"{tagName}"的文件</span>
                    </h2>
                </div>
            </div>
            <div className="px-16">
                <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {documents.map((document) => (
                        <div key={document.id} className="group relative">
                            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                {document.storage_url?.split(/[#?]/)[0].split('.').pop().trim() ===
                                'pdf' ? (
                                    <object
                                        className="w-full h-full object-center object-cover lg:w-full lg:h-full flex justify-center items-center"
                                        type="application/pdf"
                                        data={document.storage_url + '#toolbar=0'}
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
                                        src={document.storage_url}
                                        alt={document.name}
                                        className="w-full h-full object-contain object-center lg:w-full lg:h-full"
                                    />
                                )}
                            </div>
                            <div className="mt-4 flex justify-between overflow-hidden">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href={document.storage_url}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            <p>文件名稱：{document.name}</p>
                                            <p>
                                                上傳日期：
                                                {
                                                    new Date(document.created_at)
                                                        .toISOString()
                                                        .split('T')[0]
                                                }
                                            </p>
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
