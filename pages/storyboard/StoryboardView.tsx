import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import Router from 'next/router';
import { useState } from 'react';
import BButton from '../../components/common/Widget/button/BButton';
import HeaderBreadCrumb from '../../components/common/Widget/HeaderBreadCrumb';
import MyModal from '../../components/common/Widget/MyModal';
import PaginationView from '../../components/common/Widget/PaginationView';
import SingleActionModel from '../../components/common/Widget/SingleActionModel';
import StoryboardTableRow from '../../components/feature/storyboard/StoryboardTableRow';

interface ViewProps {
    open: boolean;
    setOpen: any;
    items: [];
    meta: any;
    handleUpdateStoryboardItem: any;
    handleDeleteStoryboard: any;
    handleCreateStoryboard: any;
}
export default function StoryboardView(props: ViewProps) {
    const {
        open,
        setOpen,
        items,
        meta,
        handleUpdateStoryboardItem,
        handleDeleteStoryboard,
        handleCreateStoryboard
    } = props;
    const [visableHtmlCode, setVisibleHtmlCode] = useState(false);
    const [visableHtmlToPdf, setVisibleHtmlToPdf] = useState(false);
    const [visableInputStoryboard, setVisableInputStoryboard] = useState(false);
    const [visableCreateStoryboard, setVisableCreateStoryboard] = useState(false);
    const [visableDelete, setVisableDelete] = useState(false);
    const [data, setData] = useState<any>();
    const [currectItem, setCurrectItemItem] = useState<any>();

    const edit = (item: any) => {
        Router.push(`/storyboard/edit?id=${item?.id}`);
    };
    const remove = (item: any) => {
        setVisableDelete(true);
        setCurrectItemItem(item);
    };
    const preview = (item: any) => {
        Router.push(`/storyboard/${item?.id}`);
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
            <div className="  mx-auto h-[calc(100vh-18.5rem)] px-4 sm:px-6 lg:px-8">
                <div className="  mx-auto px-4 sm:px-6 lg:px-8">
                    <HeaderBreadCrumb title={'故事板'} />
                    <header className="shadow bg-white flex justify-between items-center   py-4 px-6">
                        <div className="  ">
                            <label>故事板列表</label>
                        </div>
                        <div className="flex flex-row items-center justify-end flex-wrap">
                            <BButton
                                name="新建"
                                onClick={() => {
                                    Router.push('/storyboard/create');
                                }}
                            />
                        </div>
                    </header>
                    <div className="flex w-full items-center justify-center text-center py-2">
                        <div className="w-full text-center items-center justify-center shadow ring-1 ring-black ring-opacity-5 md:rounded-lg overflow-scroll">
                            <table className="w-full table-auto text-left divide-y divide-gray-300 overflow-scroll">
                                <thead className="bg-gray-50 overflow-scroll">
                                    <tr className="divide-x divide-gray-200">
                                        <th
                                            scope="col"
                                            className="py-3.5 px-2  text-left text-sm font-semibold text-gray-900 "
                                        >
                                            編號
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3.5 px-2 w-3/12 text-left text-sm font-semibold text-gray-900 "
                                        >
                                            名稱
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3.5  px-2 w-3/12 text-left text-sm font-semibold text-gray-900 hidden"
                                        >
                                            描述
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3.5  px-2 w-2/12 text-left text-sm font-semibold text-gray-900"
                                        >
                                            創建時間
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3.5  px-2 w-2/12 text-left text-sm font-semibold text-gray-900"
                                        >
                                            更新時間
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3.5 w-1/12 text-center text-sm font-semibold text-gray-900 "
                                        >
                                            查看
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3.5 w-1/12 text-center text-sm font-semibold text-gray-900 "
                                        >
                                            操作
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white overflow-scroll">
                                    {items?.map((item: any, index: number) => {
                                        return (
                                            <StoryboardTableRow
                                                key={index}
                                                index={index}
                                                item={item}
                                                preview={() => preview(item)}
                                                edit={() => edit(item)}
                                                remove={() => remove(item)}
                                            />
                                        );
                                    })}
                                </tbody>
                            </table>
                            <PaginationView meta={meta} pathname={`/storyboard`} params={null} />
                        </div>
                    </div>
                </div>
            </div>
            <MyModal
                visable={visableDelete}
                description={`是否刪除?`}
                cancelClick={() => {
                    setVisableDelete(false);
                }}
                confirmClick={() => {
                    setVisableDelete(false);
                    handleDeleteStoryboard(currectItem?.id);
                }}
            />
        </>
    );
}
