/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Fragment, useEffect, useRef } from 'react';
import useAlert from '../../../hooks/useAlert';

export default function SaveDocumentModal(props: any) {
    const cancelButtonRef = useRef(null);
    const refTitle = useRef<HTMLInputElement>(null);
    const { setAlert } = useAlert();
    useEffect(() => {
        setTimeout(() => {
            if (refTitle.current) refTitle.current?.focus();
        }, 100);
    }, [props]);
    const validate = () => {
        if (!props?.data?.filename) return setAlert({ title: '請輸入名稱', type: 'info' });
        props.confirmClick();
    };

    return (
        <>
            <Transition.Root show={props.visable || false} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed z-10 inset-0 overflow-y-auto"
                    initialFocus={cancelButtonRef}
                    onClose={() => { }}
                >
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                                    <XMarkIcon
                                        className="w-6 cursor-pointer"
                                        onClick={props.cancelClick}
                                    />
                                    <label>{'儲存為文檔'}</label>
                                    <button
                                        type="button"
                                        className="h-full float-right inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() => {
                                            validate();
                                        }}
                                    >
                                        完成
                                    </button>
                                </div>
                                <div className="w-full mt-4">
                                    <div className="w-full flex flex-row m-2">
                                        <div className="w-1/4 flex justify-left items-center ">
                                            <label
                                                htmlFor="new-type"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                <span className="text-red-500">*</span>文件名稱:
                                            </label>
                                        </div>
                                        <div className="flex w-1/2">
                                            <input
                                                id="type"
                                                name="type"
                                                type="string"
                                                required={true}
                                                defaultValue={props?.data?.filename}
                                                // autoFocus
                                                ref={refTitle}
                                                placeholder="文件名稱"
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                onChange={async (e) => {
                                                    props.setData({
                                                        ...props.data,
                                                        filename: e.target.value
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-row m-2">
                                        <div className="w-1/4 flex justify-left items-center ">
                                            <label
                                                htmlFor="new-type"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                文件夾位置:
                                            </label>
                                        </div>
                                        <div className="flex flex-1">
                                            <label className="flex flex-1">
                                                {props?.movingDest?.name ||
                                                    'Root'}
                                            </label>
                                            <a
                                                className="cursor-pointer underline flex flex-0 text-blue-500"
                                                onClick={() => {
                                                    props.setMode('move');
                                                    props.cancelClick();
                                                }}
                                            >
                                                編輯
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
