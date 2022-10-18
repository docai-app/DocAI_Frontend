/* This example requires Tailwind CSS v2.0+ */
import { ChangeEvent, Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, ExclamationIcon, EyeIcon } from '@heroicons/react/outline';
import React from 'react';

export default function InputRemarkModal(props: any) {
    const cancelButtonRef = useRef(null);
    const fileInput = useRef<HTMLInputElement>(null);
    const [data, setData] = useState({
        approval: props.approval,
        signature: '',
        remark: ''
    });
    const [myFile, setMyFile] = useState<any>();
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            props.setDocuments(event.target.files);
            setMyFile(event.target.files[0]);
        }
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
                                {/* {
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <EyeIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    </div>
                } */}

                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <div className="flex flex-row justify-center items-center">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <EyeIcon
                                                className="h-6 w-6 text-blue-600"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <Dialog.Title
                                            as="h3"
                                            className="flex flex-row ml-2 text-md leading-6 font-medium text-gray-900"
                                        >
                                            請填寫資料審批
                                        </Dialog.Title>
                                    </div>
                                    <div className="mt-2">
                                        {/* <p  className="text-sm text-gray-500">
                      {props.description}
                    </p> */}
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    props.approval == 'approved'
                                                        ? '你批准了這份文檔'
                                                        : '你拒絕了這份文檔'
                                            }}
                                            className={`text-xl ${
                                                props.approval == 'approved'
                                                    ? 'text-green-500'
                                                    : 'text-red-500'
                                            }`}
                                        ></span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-4">
                                <div className="w-full">
                                    <label className="text-sm text-left">簽名:</label>
                                    <input
                                        type={'text'}
                                        name="signature"
                                        className="w-3/4 ml-4 rounded-md"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                approval: props.approval,
                                                signature: e.target.value
                                            })
                                        }
                                    ></input>
                                </div>
                                <div className="w-full mt-2">
                                    <label className="text-sm">備註:</label>
                                    <input
                                        type={'text'}
                                        name="remark"
                                        className="w-3/4 ml-4 rounded-md"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                approval: props.approval,
                                                remark: e.target.value
                                            })
                                        }
                                    ></input>
                                </div>
                            </div>
                            <div className="mt-4 w-full items-center justify-center flex">
                                {myFile && (
                                    <img src={URL.createObjectURL(myFile)} className="h-20" />
                                )}
                                <label className="cursor-pointer underline ml-4 bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                    <span>上傳簽名圖片</span>
                                    <input
                                        name="file-upload"
                                        type="file"
                                        className="sr-only"
                                        accept="image/*"
                                        multiple={false}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        ref={fileInput}
                                    />
                                </label>
                            </div>
                            <div className="mt-4 w-full items-center justify-center flex">
                                {props.uploadLoading && <label className=' text-red-500'>圖片上傳中...</label>}
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse justify-center">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => {
                                        props.confirmClick(data);
                                        setData({
                                            ...data,
                                            signature: '',
                                            remark: ''
                                        });
                                    }}
                                >
                                    {props.confirmText || '確認'}
                                </button>

                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:white sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick={() => {
                                        props.cancelClick();
                                        setData({
                                            ...data,
                                            signature: '',
                                            remark: ''
                                        });
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
