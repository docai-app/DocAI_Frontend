/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';
import _ from 'lodash';
import { Fragment, useEffect, useRef, useState } from 'react';

export default function EditDataFilterModal(props: any) {
    const cancelButtonRef = useRef(null);
    const [selectData, setSelectData] = useState<any>([]);
    useEffect(() => {
        if (props.datas) {
            setSelectData(props.datas);
        }
    }, [props.datas]);
    const datas = [
        { name: 1, value: 1 },
        { name: 2, value: 2 },
        { name: 3, value: 3 }
    ];
    const isContain = (value: any) => {
        const index = _.findIndex(props.datas, function (func: any) {
            return func.value == value;
        });
        return index == -1;
    };
    const getDatas = () => {
        props.selectData(selectData);
        props.cancelClick();
        setSelectData([]);
    };
    return (
        <Transition.Root show={props.visable || false} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={() => {}}
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
                                <XIcon className="w-6 cursor-pointer" onClick={props.cancelClick} />
                                <label>選擇過濾器</label>
                                <button
                                    type="button"
                                    className="h-full float-right inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => {
                                        getDatas();
                                    }}
                                >
                                    確認
                                </button>
                            </div>
                            <div className="w-full mt-4">
                                <div className="w-full flex flex-row">
                                    <div className="w-1/4 flex justify-left items-center ">
                                        <label
                                            htmlFor="new-type"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            文檔分類:
                                        </label>
                                    </div>
                                    <div className="flex w-1/2">
                                        <label>請假紙</label>
                                    </div>
                                </div>

                                <div className="w-full flex flex-row my-2">
                                    <div className="w-1/4 flex justify-left   ">
                                        <label
                                            htmlFor="new-type"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            已選擇:
                                        </label>
                                    </div>
                                    <div className="flex w-3/4">
                                        <div className="flex flex-1 flex-wrap">
                                            {selectData?.map((data: any, index: number) => {
                                                return (
                                                    <label
                                                        key={index}
                                                        className="px-4 py-1 rounded-md border m-1"
                                                    >
                                                        {data.name}
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full flex flex-row my-2">
                                    <div className="w-1/4 flex justify-left  ">
                                        <label
                                            htmlFor="new-type"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            可選擇內容:
                                        </label>
                                    </div>
                                    <div className="flex w-3/4">
                                        <div className=" flex-col">
                                            {datas.map((item: any, index: number) => {
                                                return (
                                                    <div key={index}>
                                                        <input
                                                            type={'checkbox'}
                                                            name={item.name}
                                                            defaultChecked={!isContain(item.value)}
                                                            onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    setSelectData([
                                                                        ...selectData,
                                                                        item
                                                                    ]);
                                                                } else {
                                                                    setSelectData(
                                                                        selectData.filter(
                                                                            (data: any) =>
                                                                                data.value !==
                                                                                item.value
                                                                        )
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                        <label className="ml-2"> {item.name}</label>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
