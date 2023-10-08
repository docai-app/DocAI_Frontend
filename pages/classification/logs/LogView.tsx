import { ClockIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Router from 'next/router';
import PaginationView from '../../../components/common/Widget/PaginationView';

interface LatestPredictionDataProps {
    prediction: any;
}

function LogView(props: any) {
    const {
        currentTabStatus,
        setCurrentTabStatus,
        countDocumentsStatusByDateData,
        loading,
        error
    } = props;

    return (
        <>
            <div className=" container mx-auto md:px-4 lg:px-6 pb-10">
                <div className="flex items-center  border-b  justify-between mb-4 border-gray-300  ">
                    <label
                        className=" px-4 py-2 rounded-md cursor-pointer"
                        onClick={() => {
                            Router.back();
                        }}
                    >
                        {'<'} 返回
                    </label>
                    <label className="text-2xl font-bold">智能文檔處理</label>
                    <label className="text-xl font-bold">{''}</label>
                    {/* <ul className="flex flex-row -my-px">
                        <li
                            onClick={() => setCurrentTabStatus('all')}
                            className={`p-4 cursor-pointer ${currentTabStatus === 'all'
                                ? 'text-indigo-700 border-b-2 border-indigo-700'
                                : 'text-gray-400'
                                } font-bold text-sm`}
                        >
                            全部
                        </li>
                    </ul> */}
                </div>
                {loading ? (
                    <div>載入中...</div>
                ) : (
                    countDocumentsStatusByDateData && (
                        <>
                            <div className="  w-full   overflow-hidden  ">
                                {countDocumentsStatusByDateData?.data.map(
                                    (item: any, index: number) => {
                                        return (
                                            <div className="mb-4" key={index}>
                                                <p className="text-back font-bold">{item.date}</p>

                                                <div className="flex flex-row items-center my-0">
                                                    <label className=" text-sm">
                                                        共上傳了{' '}
                                                        <label className="font-bold">
                                                            {item.uploaded_count}
                                                        </label>{' '}
                                                        份，未處理{' '}
                                                        <label className="font-bold">
                                                            {item.non_ready_count}
                                                        </label>{' '}
                                                        份，已預處理{' '}
                                                        <label className="font-bold">
                                                            {item.ready_count}
                                                        </label>{' '}
                                                        份，智能文檔分類處理了{' '}
                                                        <label className="font-bold">
                                                            {item.confirmed_count}
                                                        </label>{' '}
                                                        份
                                                    </label>
                                                    {item.uploaded_count !=
                                                        item.confirmed_count && (
                                                        <Link
                                                            href={`/classification/validate?date=${item.date}`}
                                                        >
                                                            <a className="p-2 text-sm underline text-indigo-500">
                                                                繼續處理
                                                            </a>
                                                        </Link>
                                                    )}
                                                    {item.uploaded_count ==
                                                        item.confirmed_count && (
                                                        <Link href={'/classification/show'}>
                                                            <a className="p-2 text-sm underline text-indigo-500">
                                                                查看
                                                            </a>
                                                        </Link>
                                                    )}
                                                </div>

                                                {item.estimated_time > 0 && (
                                                    <div className="flex flex-row items-center">
                                                        <ClockIcon className="w-5 h-5 text-green-500" />
                                                        <p className="ml-1 text-green-500 text-sm">
                                                            正在進行預處理，需時{' '}
                                                            {Math.ceil(item.estimated_time / 60)}{' '}
                                                            分鐘
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                            <PaginationView
                                meta={countDocumentsStatusByDateData?.meta}
                                pathname={'/classification/logs'}
                                params={''}
                            />
                        </>
                    )
                )}
            </div>
        </>
    );
}

export default LogView;
