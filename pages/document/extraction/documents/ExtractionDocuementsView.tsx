import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import Router, { useRouter } from 'next/router';
import SingleActionModel from '../../../../components/common/Widget/SingleActionModel';
import SchemaList from '../../../../components/feature/document/extraction/SchemasList';

interface ViewProps {
    open: boolean;
    setOpen: any;
    label: any;
    smart_extraction_schemas: [];
    meta: any;
}

function ExtractionDocuementsView(props: ViewProps) {
    const {
        open,
        setOpen,
        label,
        smart_extraction_schemas,
        meta,
    } = props;
    const router = useRouter();
    return (
        <>
            <SingleActionModel
                {...{
                    open,
                    setOpen,
                    title: '正在進行中...',
                    content: '正在加載數據',
                    icon: (
                        <PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    )
                }}
            />
            <div className="max-w-7xl mx-auto h-[calc(100vh-18.5rem)] px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-4  ">
                        <label
                            className=" px-4 py-2 rounded-md cursor-pointer text-indigo-500"
                            onClick={() => {
                                Router.back();
                            }}
                        >
                            {'<'} 返回
                        </label>
                        <label className="text-2xl font-bold">數據總表</label>
                        <label>{''}</label>
                    </div>
                    <div className="my-2">
                        <SchemaList
                            label={label}
                            smart_extraction_schemas={smart_extraction_schemas}
                            meta={meta}
                            has_label={false}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
export default ExtractionDocuementsView;
