/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';
import { Fragment, useRef, useState } from 'react';
import MyDateDropdown from '../../common/Widget/MyDateDropdown';
import EditDataFilterModal from './EditDataFilterModal';
import EditDataResultModal from './EditDataResultModal';

export default function EditDataModal(props: any) {
    const cancelButtonRef = useRef(null);
    const [visableFilter, setVisiableFilter] = useState(false)
    const [visableResult, setVisiableResult] = useState(false)
    const [filterDatas, setFilterDatas] = useState<any>([])
    const [resultDatas, setResultDatas] = useState<any>([])
    const dates = [
        {
            name: '請假紙',
            value: '請假紙'
        },
        {
            name: '會議記錄',
            value: '會議記錄'
        }
    ];

    return (
        <>
            <Transition.Root show={props.visable || false} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed z-10 inset-0 overflow-y-auto"
                    initialFocus={cancelButtonRef}
                    onClose={() => { }}
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-center   shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div className="flex flex-row justify-between">
                                    <XIcon
                                        className="w-6 cursor-pointer"
                                        onClick={props.cancelClick} />
                                    <label>新增數據搜尋App</label>
                                    <button
                                        type="button"
                                        className="h-full float-right inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() => {
                                            props.cancelClick
                                        }}
                                    >
                                        完成
                                    </button>
                                </div>
                                <div className="w-full mt-4">

                                    <div className="w-full flex flex-row">
                                        <div className="w-1/4 flex justify-left items-center ">
                                            <label
                                                htmlFor="new-type"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                名稱:
                                            </label>
                                        </div>
                                        <div className="flex w-1/2">
                                            <input
                                                id="type"
                                                name="type"
                                                type="string"
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                onChange={async (e) => {
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full flex flex-row my-2">
                                        <div className="w-1/4 flex justify-left items-center ">
                                            <label
                                                htmlFor="new-type"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                選擇文檔分類:
                                            </label>
                                        </div>
                                        <div className="flex w-3/4">
                                            <MyDateDropdown
                                                value={"請假紙"}
                                                datas={dates}
                                                onSwitch={() => { }}
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full flex flex-row my-2">
                                        <div className="w-1/4 flex justify-left   ">
                                            <label
                                                htmlFor="new-type"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                選擇過濾器:
                                            </label>
                                        </div>
                                        <div className="flex w-3/4">
                                            <div className="flex flex-1 flex-wrap">
                                                {filterDatas.map((data: any, index: number) => {
                                                    return (
                                                        <label key={index} className="px-4 py-1 rounded-md border m-1">{data.name}</label>
                                                    )
                                                })}
                                            </div>
                                            <a className="flex flex-0 cursor-pointer underline text-blue-500" onClick={() => { setVisiableFilter(true) }}>编辑</a>

                                        </div>
                                    </div>

                                    <div className="w-full flex flex-row my-2">
                                        <div className="w-1/4 flex justify-left  ">
                                            <label
                                                htmlFor="new-type"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                顯示結果:
                                            </label>
                                        </div>
                                        <div className="flex w-3/4">
                                            <div className="flex flex-1 flex-wrap">
                                                {resultDatas.map((data: any, index: number) => {
                                                    return (
                                                        <label key={index} className="px-4 py-1 rounded-md border m-1">{data.name}</label>
                                                    )
                                                })}
                                            </div>
                                            <a className="flex flex-0 cursor-pointer underline text-blue-500" onClick={() => { setVisiableResult(true) }}>编辑</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            <EditDataFilterModal
                visable={visableFilter}
                datas={filterDatas}
                cancelClick={() => { setVisiableFilter(false) }}
                selectData={(datas: any) => {
                    setFilterDatas(datas)
                }} />
            <EditDataResultModal
                visable={visableResult}
                datas={resultDatas}
                cancelClick={() => { setVisiableResult(false) }}
                selectData={(datas: any) => {
                    setResultDatas(datas)
                }} />
        </>
    );
}
