import { Dialog, Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import _find from 'lodash/find';
import _get from 'lodash/get';
import _map from 'lodash/map';
import { Fragment, useRef, useState } from 'react';

interface AmendLabelProps {
    open: boolean;
    setOpen: any;
    allLabelsData: any;
    confirmDocumentFormik: any;
    isSubmit?: boolean;
    addNewTagFormik?: any;
    setTagName?: any;
    setOpenEditLabel: any;
}

export default function AmendLabel(props: AmendLabelProps) {
    const {
        open,
        setOpen,
        allLabelsData,
        confirmDocumentFormik,
        addNewTagFormik,
        isSubmit,
        setTagName,
        setOpenEditLabel
    } = props;
    const cancelButtonRef = useRef(null);
    const [tag_id, setTagId] = useState('');
    const confirmDocument = () => {
        setOpen(false);
        // confirmDocumentFormik.handleSubmit();
        if (tag_id == '') return;
        confirmDocumentFormik.setFieldValue('tag_id', tag_id);
        setTagName(_find(_get(allLabelsData, 'tags'), { id: tag_id }).name);
        if (isSubmit) {
            confirmDocumentFormik.handleSubmit();
        }
    };
    const addNewTag = () => {
        // addNewTagFormik.handleSubmit();
        setOpenEditLabel(true);
        setOpen(false);
    };
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={setOpen}
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
                        <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <InformationCircleIcon
                                        className="h-6 w-6 text-sky-600"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg leading-6 font-medium text-gray-900"
                                    >
                                        選擇類型
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div className="w-full">
                                            <label
                                                htmlFor="new-type"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                選擇現有的類型
                                            </label>
                                            <div className="flex mt-1">
                                                <select
                                                    id="new-type"
                                                    name="new-type"
                                                    defaultValue={''}
                                                    className="mt-1 w-full block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                    onChange={async (e) => {
                                                        setTagId(e.target.value);
                                                        // confirmDocumentFormik.setFieldValue(
                                                        //     'tag_id',
                                                        //     e.target.value
                                                        // );
                                                    }}
                                                >
                                                    <option value="" disabled hidden>
                                                        請選擇文件的類型
                                                    </option>
                                                    {_map(_get(allLabelsData, 'tags'), (item) => {
                                                        return (
                                                            <option key={item.id} value={item.id}>
                                                                {item.name}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <div className="w-full">
                                            <label
                                                htmlFor="type"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                若找不到相關標籤,可以建立新標籤
                                            </label>
                                            <div className="flex mt-1">
                                                <button
                                                    type="submit"
                                                    className="min-w-fit ml-0 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    onClick={() => addNewTag()}
                                                >
                                                    新增類型
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => confirmDocument()}
                                >
                                    確認
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick={() => setOpen(false)}
                                    ref={cancelButtonRef}
                                >
                                    取消
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
