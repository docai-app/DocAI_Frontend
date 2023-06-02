import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import MiniappShareQRcodeModal from '../../components/common/Widget/MiniappShareQRcodeModal';
import PaginationView from '../../components/common/Widget/PaginationView';
import SingleActionModel from '../../components/common/Widget/SingleActionModel';
import MiniappRow from '../../components/feature/miniapp/MiniappRow';

interface MiniappViewProps {
    mini_apps: any[];
    meta?: any;
    loading: boolean;
}

export default function MiniappView(props: MiniappViewProps) {
    const { mini_apps, meta, loading } = props;
    const [miniappItem, setMiniappItem] = useState<any>();
    const [visable, setVisible] = useState(false);
    const share = (item: any) => {
        setMiniappItem({
            ...item,
            link: window.origin + `/miniapp/${item?.id}`
        });
        setVisible(true);
    };
    return (
        <>
            <SingleActionModel
                open={loading}
                setOpen={() => {}}
                title={'進行中......'}
                content={'正在加载数据...'}
                icon={<PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />}
            />
            <div className="mx-auto max-w-7xl">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-2xl font-semibold leading-6 text-gray-900">
                                資源應用程序
                            </h1>
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <Link href={'/miniapp/create'}>
                                <a className=" cursor-pointer block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    新增資源應用程序
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead>
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                            >
                                                應用名稱
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                應用描述
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                目標文件夾
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                建立日期
                                            </th>
                                            <th
                                                scope="col"
                                                className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                                            >
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {mini_apps?.map((item: any, index: number) => {
                                            return (
                                                <MiniappRow key={index} item={item} share={share} />
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <PaginationView meta={meta} pathname={'/miniapp'} params={null} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MiniappShareQRcodeModal
                visable={visable}
                name={miniappItem?.name}
                link={miniappItem?.link}
                cancelClick={() => {
                    setVisible(false);
                }}
            />
        </>
    );
}
