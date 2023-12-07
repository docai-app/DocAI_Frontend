import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { toPng } from 'html-to-image';
import Router from 'next/router';
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

    const downloadChart = async () => {
        const qrcode = document.getElementById('chart');
        if (qrcode) {
            const png = await toPng(qrcode);
            const link = document.createElement('a');
            link.download = 'chart.png';
            link.href = png;
            link.click();
        }
    };

    return (
        <>
            <SingleActionModel
                open={open}
                setOpen={setOpen}
                title={'進行中......'}
                content={'正在加載數據...'}
                icon={<PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />}
            />
            <HeaderBreadCrumb
                title={''}
                back={() => {
                    Router.back();
                }}
                saveTitle={'下載故事板'}
                save={() => {
                    downloadChart();
                }}
            />
            <div
                id="chart"
                className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col  "
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            {storyboard?.title}
                        </h2>
                    </div>
                </div>
                <p className="text-xl  text-gray-500">{storyboard?.description}</p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-2">
                    {items?.map((item: any, index: number) => {
                        return (
                            <>
                                {'chart' == item?.item_type ? (
                                    <StoryboardChartItemView
                                        key={index}
                                        item={item}
                                        chart={getTransitionChartContent(item?.data, index)}
                                    />
                                ) : (
                                    <StoryboardStatisticItemView key={index} item={item} />
                                )}
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
