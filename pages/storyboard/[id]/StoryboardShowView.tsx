import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import Router from 'next/router';
import { Margin, usePDF } from 'react-to-pdf';
import HeaderBreadCrumb from '../../../components/common/Widget/HeaderBreadCrumb';
import SingleActionModel from '../../../components/common/Widget/SingleActionModel';
import StoryboardChartItemView from '../../../components/feature/storyboard/StoryboardChartItemView';
import StoryboardStatisticItemView from '../../../components/feature/storyboard/StoryboardStatisticItemView';
import { getTransitionChartContent } from '../../../utils/stringUtil';

interface ViewProps {
    open: boolean;
    setOpen: any;
    storyboard: any;
    items: any;
}
export default function StoryboardShowView(props: ViewProps) {
    const { open, setOpen, storyboard, items } = props;
    const { toPDF, targetRef } = usePDF({
        filename: 'report.pdf',
        page: { margin: Margin.MEDIUM }
    });
    

    return (
        <>
            <SingleActionModel
                open={open}
                setOpen={setOpen}
                title={'進行中......'}
                content={'正在加載數據...'}
                icon={<PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />}
            />
            <div
                className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col bg-white  "
            >
                <HeaderBreadCrumb
                    title={''}
                    back={() => {
                        Router.back();
                    }}
                    saveTitle={'下載故事板'}
                    save={() => {
                        toPDF();
                    }}
                />
                <div ref={targetRef}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                {storyboard?.title}
                            </h2>
                        </div>
                    </div>
                    <div>
                        <p className="text-xl py-2 text-gray-500">{storyboard?.description}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-2 pb-6">
                        {items?.map((item: any, index: number) => {
                            return (
                                <div key={index}>
                                    {'chart' == item?.item_type ? (
                                        <StoryboardChartItemView
                                            item={item}
                                            chart={getTransitionChartContent(item?.data, index)}
                                        />
                                    ) : (
                                        <StoryboardStatisticItemView item={item} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
