import _get from 'lodash/get';
import _map from 'lodash/map';
import SingleActionModel from '../../../components/common/Widget/SingleActionModel';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import DocumentPreview from '../../../components/common/Widget/DocumentPreview';

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
                    icon: (
                        <MagnifyingGlassIcon
                            className="h-6 w-6 text-green-600"
                            aria-hidden="true"
                        />
                    )
                }}
            />
            {/* <div className="bg-indigo-700">
                <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">DocAI</span>
                        <span className="block">查找屬於"{tagName}"的文件</span>
                    </h2>
                </div>
            </div> */}
            <div>
                <p className=" text-black text-xl font-bold">
                    與 "{tagName}" 相關的文檔共有 {documents?.length} 份
                </p>
            </div>

            <div className="px-16">
                <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {documents.map((document, idx) => (
                        <DocumentPreview document={document} key={idx} />
                    ))}
                </div>
            </div>
        </>
    );
}
