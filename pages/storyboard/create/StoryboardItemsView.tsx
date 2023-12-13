import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import _ from 'lodash';
import Router from 'next/router';
import { useState } from 'react';
import BButton from '../../../components/common/Widget/button/BButton';
import HeaderBreadCrumb from '../../../components/common/Widget/HeaderBreadCrumb';
import HtmlCodeModal from '../../../components/common/Widget/HtmlCodeModal';
import HtmlToPdfModal from '../../../components/common/Widget/HtmlToPdfModal';
import MyModal from '../../../components/common/Widget/MyModal';
import PaginationView from '../../../components/common/Widget/PaginationView';
import SingleActionModel from '../../../components/common/Widget/SingleActionModel';
import InputStoryboardModal from '../../../components/feature/document/smart_extraction_schema/InputStoryboardModal';
import StoryboardItemTableRow from '../../../components/feature/storyboard/StoryboardItemTableRow';

interface ViewProps {
    open: boolean;
    setOpen: any;
    items: [];
    meta: any;
    handleUpdateStoryboardItem: any;
    handleDeleteStoryboardItem: any;
    handleCreateStoryboard: any;
}
export default function StoryboardItemsView(props: ViewProps) {
    const {
        open,
        setOpen,
        items,
        meta,
        handleUpdateStoryboardItem,
        handleDeleteStoryboardItem,
        handleCreateStoryboard
    } = props;
    const [item_ids, set_item_ids] = useState<any>([]);
    const [visableHtmlCode, setVisibleHtmlCode] = useState(false);
    const [visableHtmlToPdf, setVisibleHtmlToPdf] = useState(false);
    const [visableInputStoryboard, setVisableInputStoryboard] = useState(false);
    const [visableCreateStoryboard, setVisableCreateStoryboard] = useState(false);
    const [visableDelete, setVisableDelete] = useState(false);
    const [data, setData] = useState<any>();
    const [currectItem, setCurrectItemItem] = useState<any>();
    const setChecedkData = (checked: boolean, value: string) => {
        const newData = checked
            ? [...item_ids, value]
            : item_ids.filter((_value: string) => _value !== value);
        set_item_ids(newData);
    };

    const edit = (item: any) => {
        setVisableInputStoryboard(true);
        setCurrectItemItem(item);
    };
    const remove = (item: any) => {
        setVisableDelete(true);
        setCurrectItemItem(item);
    };
    const preview = (item: any) => {
        if ('chart' == item?.item_type) {
            setVisibleHtmlCode(true);
        } else {
            setVisibleHtmlToPdf(true);
        }
        setData(item?.data);
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
                    <HeaderBreadCrumb
                        title={'新增故事板'}
                        back={() => {
                            Router.back();
                        }}
                    />
                    <header className="shadow bg-white flex justify-between items-center px-6 py-4">
                        <div className="  ">
                            <label>可選擇記錄創建故事板 或 新建空白故事板</label>
                        </div>
                        <div className="flex flex-row items-center justify-end flex-wrap">
                            <BButton
                                name="確認創建"
                                disable={!item_ids || item_ids.length == 0}
                                onClick={() => {
                                    setVisableCreateStoryboard(true);
                                }}
                            />

                            <BButton
                                name="新建空白故事板"
                                onClick={() => {
                                    Router.push({
                                        pathname: '/storyboard/edit',
                                        query: {
                                            item_ids: item_ids
                                        }
                                    })
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
                                            className="py-3.5   text-center text-sm font-semibold text-gray-900 "
                                        ></th>
                                        <th
                                            scope="col"
                                            className="py-3.5 px-2 w-3/12 text-left text-sm font-semibold text-gray-900 "
                                        >
                                            名稱
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3.5  px-2 w-3/12 text-left text-sm font-semibold text-gray-900 "
                                        >
                                            描述
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3.5  px-2 w-3/12 text-left text-sm font-semibold text-gray-900 "
                                        >
                                            問題
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3.5  px-2 w-1/12 text-left text-sm font-semibold text-gray-900 "
                                        >
                                            類型
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
                                            <StoryboardItemTableRow
                                                key={index}
                                                item={item}
                                                setChecedkData={setChecedkData}
                                                checked={_.includes(item_ids, item.id)}
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
            {data && (
                <HtmlCodeModal
                    visable={visableHtmlCode}
                    description={'圖表'}
                    cancelClick={() => {
                        setVisibleHtmlCode(false);
                        setData('');
                    }}
                    chart={data}
                />
            )}
            <HtmlToPdfModal
                visable={visableHtmlToPdf}
                title={'統計'}
                description={data}
                cancelClick={() => {
                    setVisibleHtmlToPdf(false);
                    setData('');
                }}
            />
            <InputStoryboardModal
                visable={visableInputStoryboard}
                description={'編輯儲存資料'}
                data={{
                    name: currectItem?.name,
                    description: currectItem?.description
                }}
                report={
                    'chart' == currectItem?.item_type ? '' : currectItem?.data || currectItem?.name
                }
                cancelClick={() => {
                    setVisableInputStoryboard(false);
                }}
                confirmClick={(data: any) => {
                    setVisableInputStoryboard(false);
                    handleUpdateStoryboardItem(currectItem?.id, data);
                }}
            />
            <InputStoryboardModal
                visable={visableCreateStoryboard}
                description={'創建故事板'}
                confirmText={'確認'}
                cancelClick={() => {
                    setVisableCreateStoryboard(false);
                }}
                confirmClick={(data: any) => {
                    setVisableCreateStoryboard(false);
                    handleCreateStoryboard({
                        title: data?.name,
                        description: data?.description,
                        item_ids: item_ids
                    });
                }}
            />
            <MyModal
                visable={visableDelete}
                description={`是否刪除?`}
                cancelClick={() => {
                    setVisableDelete(false);
                }}
                confirmClick={() => {
                    setVisableDelete(false);
                    handleDeleteStoryboardItem(currectItem?.id);
                }}
            />
        </>
    );
}
