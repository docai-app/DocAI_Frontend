/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import useAlert from '../../../../hooks/useAlert';

export default function InputStoryboardModal(props: any) {
    const cancelButtonRef = useRef(null);
    const { setAlert } = useAlert();
    const [data, setData] = useState({
        name: '',
        description: '',
        data: ''
    });
    useEffect(() => {
        setData({
            name: '',
            description: '',
            data: ''
        });
    }, []);

    useEffect(() => {
        if (props?.data) {
            setData({
                ...props?.data
            });
        }
    }, [props?.data]);

    useEffect(() => {
        if (props?.report) {
            setData({
                ...props?.data,
                data: props?.report
            });
        }
    }, [props?.report]);

    const validate = () => {
        if (!data?.name) {
            setAlert({ title: '請填寫名稱', type: 'warning' });
            return;
        }
        if (!data?.description) {
            setAlert({ title: '請填寫描述', type: 'warning' });
            return;
        }
        props.confirmClick(data);
    };
    return (
        <Transition.Root show={props.visable || false} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={props.cancelClick}
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
                        <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="sm:flex sm:items-center justify-center">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <div className="mt-2">
                                        <p className="  text-black">{props.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full my-2 flex flex-row items-center flex-wrap">
                                <label className="text-sm text-left flex-0">{'名稱'}:</label>
                                <input
                                    type={'text'}
                                    name="signature"
                                    className="flex-1 ml-4 rounded-md"
                                    defaultValue={data?.name}
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            name: e.target.value
                                        });
                                    }}
                                ></input>
                            </div>
                            <div className="w-full my-2 flex flex-row items-center flex-wrap">
                                <label className="text-sm text-left">{'描述'}:</label>
                                <input
                                    type={'text'}
                                    name="signature"
                                    className="flex-1 ml-4 rounded-md"
                                    defaultValue={data?.description}
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            description: e.target.value
                                        });
                                    }}
                                ></input>
                            </div>
                            {props?.report && (
                                <div className="w-full my-2 flex flex-row items-start flex-wrap">
                                    <label className="text-sm text-start  items-start">
                                        {'報告'}:
                                    </label>
                                    <textarea
                                        name="signature"
                                        className="flex-1 ml-4 rounded-md"
                                        defaultValue={data?.data}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                data: e.target.value
                                            });
                                        }}
                                    ></textarea>
                                </div>
                            )}
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse justify-center">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => {
                                        validate();
                                    }}
                                >
                                    {props.confirmText || '確認'}
                                </button>

                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:white sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick={() => {
                                        props.cancelClick();
                                    }}
                                    ref={cancelButtonRef}
                                >
                                    {props.cancelText || '取消'}
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
