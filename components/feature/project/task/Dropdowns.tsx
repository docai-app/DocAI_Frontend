import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

interface DropdownsProps {
    type?: string;
    move?: any;
    rename?: any;
    remove?: any;
    is_completed?: boolean;
}

export default function Dropdowns(props: DropdownsProps) {
    const { type, move, rename, remove, is_completed } = props;
    return (
        <Menu as="div" className="relative inline-block text-left ">
            <div>
                <Menu.Button className="bg-gray-100 rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
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
                <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black  divide-y divide-gray-100 ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {!is_completed && (
                            <Menu.Item disabled={is_completed}>
                                {({ active }) => (
                                    <a
                                        onClick={rename}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'group flex items-center px-4 py-2 text-sm cursor-pointer'
                                        )}
                                    >
                                        <PencilSquareIcon
                                            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                        編輯
                                    </a>
                                )}
                            </Menu.Item>
                        )}
                        {/* <Menu.Item>
                            {({ active }) => (
                                <a
                                    onClick={move}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'group flex items-center px-4 py-2 text-sm cursor-pointer'
                                    )}
                                >
                                    <ArrowRightCircleIcon
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                    移動至
                                </a>
                            )}
                        </Menu.Item> */}
                    </div>
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    onClick={remove}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-red-500' : 'text-red-700',
                                        'group flex items-center px-4 py-2 text-sm cursor-pointer'
                                    )}
                                >
                                    <TrashIcon
                                        className="mr-3 h-5 w-5 text-red-500 group-hover:text-red-700"
                                        aria-hidden="true"
                                    />
                                    刪除
                                </a>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
