import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import SingleActionModel from '../../components/common/Widget/SingleActionModel';

interface ViewProps {
    open: boolean;
    setOpen: any;
}

export default function AnalysisView(props: ViewProps) {
    const { open, setOpen } = props;
    const router = useRouter();

    return (
        <>
            <SingleActionModel
                open={open}
                setOpen={setOpen}
                title={'進行中......'}
                content={'正在更新...'}
                icon={<PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />}
            />

            <div className="px-16 flex flex-col h-full">
                <div className="flex flex-1 flex-col overflow-y-auto ">
                    <div className="mt-8 mb-8  grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        新功能開發中，敬請期待！
                    </div>
                </div>
            </div>
        </>
    );
}
