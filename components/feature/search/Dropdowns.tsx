import { Menu, Transition } from '@headlessui/react';
import {
    ClipboardDocumentIcon,
    CloudArrowUpIcon,
    EllipsisVerticalIcon,
    PencilSquareIcon,
    TrashIcon
} from '@heroicons/react/20/solid';
import { SparklesIcon } from '@heroicons/react/24/outline';
import copy from 'copy-to-clipboard';
import { Fragment } from 'react';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

interface DropdownsProps {
    copyContent?: any;
    showEdit?: boolean;
    edit?: any;
    show_chain_feature?: boolean;
    chain_feature?: any;
    remove?: any;
    showSave?: boolean;
    save?: any;
}

export default function Dropdowns(props: DropdownsProps) {
    const {
        copyContent,
        edit,
        showEdit,
        chain_feature,
        show_chain_feature,
        remove,
        showSave,
        save
    } = props;
    const handleCopy = () => {
        copy(copyContent);
    };
    return (
        <Menu as="div" className="relative inline-block text-left ">
            <div>
                <Menu.Button className="bg-gray-200 p-1 rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    <span className="sr-only">Open options</span>
                    <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute z-10 right-0 sm:right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black  divide-y divide-gray-100 ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {copyContent && (
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        onClick={handleCopy}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'group flex items-center px-4 py-2 text-sm cursor-pointer'
                                        )}
                                    >
                                        <ClipboardDocumentIcon
                                            className="mr-3 h-5 w-5 text-blue-400 group-hover:text-blue-500"
                                            aria-hidden="true"
                                        />
                                        複製
                                    </a>
                                )}
                            </Menu.Item>
                        )}
                        {showEdit && (
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        onClick={edit}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'group flex items-center px-4 py-2 text-sm cursor-pointer'
                                        )}
                                    >
                                        <PencilSquareIcon
                                            className="mr-3 h-5 w-5 text-blue-400 group-hover:text-blue-500"
                                            aria-hidden="true"
                                        />
                                        編輯
                                    </a>
                                )}
                            </Menu.Item>
                        )}
                        {showSave && (
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        onClick={save}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'group flex items-center px-4 py-2 text-sm cursor-pointer'
                                        )}
                                    >
                                        <CloudArrowUpIcon
                                            className="mr-3 h-5 w-5 text-blue-400 group-hover:text-blue-500"
                                            aria-hidden="true"
                                        />
                                        儲存
                                    </a>
                                )}
                            </Menu.Item>
                        )}
                        {show_chain_feature && (
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        onClick={chain_feature}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'group flex items-center px-4 py-2 text-sm cursor-pointer'
                                        )}
                                    >
                                        <SparklesIcon
                                            className="mr-3 h-5 w-5 text-blue-400 group-hover:text-blue-500"
                                            aria-hidden="true"
                                        />
                                        推薦功能
                                    </a>
                                )}
                            </Menu.Item>
                        )}
                    </div>
                    {remove && (
                        <div className="py-1 hidden">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        onClick={remove}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'group flex items-center px-4 py-2 text-sm cursor-pointer'
                                        )}
                                    >
                                        <TrashIcon
                                            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                        刪除
                                    </a>
                                )}
                            </Menu.Item>
                        </div>
                    )}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
