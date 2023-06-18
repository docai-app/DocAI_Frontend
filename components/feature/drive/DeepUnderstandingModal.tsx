/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import useAxios from 'axios-hooks';
import { Fragment, useRef, useState } from 'react';
import Api from '../../../apis';
const apiSetting = new Api();

export default function DeepUnderstandingModal(props: any) {
    const cancelButtonRef = useRef(null);
    const [form_schema_id, set_form_schema_id] = useState('');
    const [needs_approval, set_needs_approval] = useState(false);
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
                                        <p className="text-sm text-gray-500">{props.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-4">
                                <div className="w-full text-left">
                                    <div className="items-start al">
                                        <label className="font-bold text-gray-900">
                                            表格深度理解的模型
                                        </label>
                                        <select
                                            id="select_tag_function"
                                            name="location"
                                            className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            defaultValue=""
                                            onChange={(e) => {
                                                set_form_schema_id(e.target.value);
                                            }}
                                        >
                                            <option value="" disabled>
                                                請選擇模型
                                            </option>
                                            {props?.schemasStatusReadyData?.form_schema?.map(
                                                (schema: any, index: number) => {
                                                    return (
                                                        <option key={index} value={schema.id}>
                                                            {schema.name}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className={'flex flex-row justify-between mt-2'}>
                                    <div className="flex flex-row items-center">
                                        <input
                                            type={'checkbox'}
                                            name="needAutoUpload"
                                            onChange={(e) => {
                                                set_needs_approval(e.target.checked);
                                            }}
                                        />
                                        <label className="ml-2 text-md font-bold text-gray-900">
                                            是否需要進行審批?
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse justify-center">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => {
                                        props.confirmClick(form_schema_id, needs_approval);
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
