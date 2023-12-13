import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import _ from 'lodash';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import HeaderBreadCrumb from '../../../components/common/Widget/HeaderBreadCrumb';
import HtmlCodeModal from '../../../components/common/Widget/HtmlCodeModal';
import HtmlToPdfModal from '../../../components/common/Widget/HtmlToPdfModal';
import MyModal from '../../../components/common/Widget/MyModal';
import SingleActionModel from '../../../components/common/Widget/SingleActionModel';
import InputStoryboardModal from '../../../components/feature/document/smart_extraction_schema/InputStoryboardModal';
import SelectSchemaAndInputModal from '../../../components/feature/storyboard/SelectSchemaAndInputModal';
import StoryboardChartItemView from '../../../components/feature/storyboard/StoryboardChartItemView';
import StoryboardItemTableRow from '../../../components/feature/storyboard/StoryboardItemTableRow';
import StoryboardStatisticItemView from '../../../components/feature/storyboard/StoryboardStatisticItemView';
import { getTransitionChartContent } from '../../../utils/stringUtil';

interface ViewProps {
    open: boolean;
    setOpen: any;
    items: [];
    setItems: any;
    storyboard: any;
    setStoryboard: any;
    handleUpdateStoryboard: any;
    handleUpdateStoryboardItem: any;
    handleDeleteStoryboardItem: any;
    updateLocalData: any;
    setCurrectPosition: any;
}
export default function StoryboardEditView(props: ViewProps) {
    const {
        open,
        setOpen,
        items,
        setItems,
        storyboard,
        setStoryboard,
        handleUpdateStoryboard,
        handleUpdateStoryboardItem,
        handleDeleteStoryboardItem,
        updateLocalData,
        setCurrectPosition
    } = props;
    const router = useRouter();
    const [item_ids, set_item_ids] = useState<any>([]);
    const [visableHtmlCode, setVisibleHtmlCode] = useState(false);
    const [visableHtmlToPdf, setVisibleHtmlToPdf] = useState(false);
    const [visableInputStoryboard, setVisableInputStoryboard] = useState(false);
    const [visableCreateStoryboard, setVisableCreateStoryboard] = useState(false);
    const [visableDelete, setVisableDelete] = useState(false);
    const [data, setData] = useState<any>();
    const [currectItem, setCurrectItemItem] = useState<any>();

    useEffect(() => {
        if (items && items.length > 0) {
            set_item_ids([]);
            _.map(items, function (item: any) {
                set_item_ids((arr: any) => [...arr, item?.id]);
            });
        }
    }, [router, items]);

    const setChecedkData = (checked: boolean, value: string) => {
        const newData = checked
            ? [...item_ids, value]
            : item_ids.filter((_value: string) => _value !== value);
        set_item_ids(newData);
    };

    const edit = (item: any, position: number) => {
        setVisableInputStoryboard(true);
        setCurrectItemItem(item);
        setCurrectPosition(position);
    };
    const remove = (item: any, position: number) => {
        setVisableDelete(true);
        setCurrectItemItem(item);
        setCurrectPosition(position);
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
            <div className="max-w-7xl  mx-auto h-[calc(100vh-18.5rem)]">
                <div className="  mx-auto px-4 sm:px-6 lg:px-8">
                    <HeaderBreadCrumb
                        title={'編輯故事板'}
                        back={() => {
                            Router.back();
                        }}
                        save={() => {
                            handleUpdateStoryboard(item_ids);
                        }}
                    />

                    <div className=" bg-report-t  bg-cover  px-4 sm:px-6 lg:px-8 py-6 min-h-screen">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="min-w-4xl mx-auto text-center">
                                <input
                                    type={'text'}
                                    className=" text-3xl text-center font-extrabold rounded-md border-0 py-2 pl-4   text-white bg-transparent  placeholder:text-gray-400 "
                                    placeholder="輸入名稱..."
                                    defaultValue={storyboard?.title}
                                    onChange={(e) => {
                                        setStoryboard({
                                            ...storyboard,
                                            title: e.target.value
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className='hidden'>
                            <p className="text-xl py-2 text-gray-500">
                                <input
                                    type={'text'}
                                    className="block w-full rounded-md border-0 py-2 pl-4 text-xl  text-white bg-transparent  placeholder:text-gray-400   "
                                    placeholder="輸入描述..."
                                    defaultValue={storyboard?.description}
                                    onChange={(e) => {
                                        setStoryboard({
                                            ...storyboard,
                                            description: e.target.value
                                        });
                                    }}
                                />
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mt-2 pb-6">
                            {items?.map((item: any, index: number) => {
                                return (
                                    <div key={index}>
                                        {'chart' == item?.item_type ? (
                                            <StoryboardChartItemView
                                                item={item}
                                                chart={getTransitionChartContent(item?.data, index)}
                                                isEdit={true}
                                                edit={() => edit(item, index)}
                                                remove={() => remove(item, index)}
                                            />
                                        ) : (
                                            <StoryboardStatisticItemView
                                                item={item}
                                                isEdit={true}
                                                edit={() => edit(item, index)}
                                                remove={() => remove(item, index)}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                            <StoryboardStatisticItemView
                                item={null}
                                edit={null}
                                remove={null}
                                add={() => {
                                    setCurrectPosition(-1);
                                    setVisableCreateStoryboard(true);
                                }}
                            />
                        </div>
                    </div>

                    <div className="w-full my-2 hidden">
                        <label>名稱:</label>
                        <input
                            type={'text'}
                            className="block w-full rounded-md border-0 py-2 pl-4   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="名稱..."
                            defaultValue={storyboard?.title}
                            onChange={(e) => {
                                setStoryboard({
                                    ...storyboard,
                                    title: e.target.value
                                });
                            }}
                        />
                    </div>
                    <div className="w-full my-2 hidden">
                        <label>描述:</label>
                        <input
                            type={'text'}
                            className="block w-full rounded-md border-0 py-2 pl-4   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="描述..."
                            defaultValue={storyboard?.description}
                            onChange={(e) => {
                                setStoryboard({
                                    ...storyboard,
                                    description: e.target.value
                                });
                            }}
                        />
                    </div>
                    <div className="flex w-full items-center justify-center text-center py-2 hidden">
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
                                                edit={() => edit(item, index)}
                                                remove={() => remove(item, index)}
                                            />
                                        );
                                    })}
                                </tbody>
                            </table>
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
                    save={() => {
                        setVisibleHtmlCode(false);
                        setVisableInputStoryboard(true);
                    }}
                />
            )}
            {data && (
                <HtmlToPdfModal
                    visable={visableHtmlToPdf}
                    title={'統計'}
                    description={data}
                    cancelClick={() => {
                        setVisibleHtmlToPdf(false);
                        setData('');
                    }}
                    save={() => {
                        setVisibleHtmlToPdf(false);
                        setVisableInputStoryboard(true);
                    }}
                />
            )}
            {visableInputStoryboard && (
                <InputStoryboardModal
                    visable={visableInputStoryboard}
                    description={'編輯儲存資料'}
                    data={{
                        name: currectItem?.name,
                        description: currectItem?.description
                    }}
                    report={
                        'chart' == currectItem?.item_type
                            ? ''
                            : currectItem?.data || currectItem?.name
                    }
                    cancelClick={() => {
                        setVisableInputStoryboard(false);
                    }}
                    confirmClick={(data: any) => {
                        setVisableInputStoryboard(false);
                        setVisibleHtmlToPdf(false);
                        setVisibleHtmlCode(false);
                        handleUpdateStoryboardItem(currectItem?.id, data);
                    }}
                />
            )}
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
            <SelectSchemaAndInputModal
                visable={visableCreateStoryboard}
                setCurrectItemItem={setCurrectItemItem}
                setVisibleHtmlCode={setVisibleHtmlCode}
                setVisibleHtmlToPdf={setVisibleHtmlToPdf}
                setData={setData}
                cancelClick={() => {
                    setVisableCreateStoryboard(false);
                }}
                confirmClick={() => {
                    setVisableCreateStoryboard(false);
                }}
            />
        </>
    );
}
