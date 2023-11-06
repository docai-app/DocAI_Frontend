/* This example requires Tailwind CSS v2.0+ */
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function MyDateDropdown(props: any) {
    const switchValue = (value: string) => {
        props.onSwitch(value);
    };

    return (
        <Menu
            as="div"
            className={classNames(
                props.zindex ? props.zindex : 'z-50',
                'relative inline-block text-left mr-4',
                props.style
            )}
        >
            <div className="z-10">
                <Menu.Button className="inline-flex text-sm items-center justify-between w-full rounded-md border border-gray-400 shadow-sm px-4 py-2 bg-white text-black font-medium  focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-offset-gray-500 focus:ring-gray-500">
                    {props.value}
                    <ChevronDownIcon className="h-5 w-5 ml-0 text-gray-500" aria-hidden="true" />
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
                <Menu.Items className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                    <div className="py-1">
                        {props.datas?.map((data: any, index: number) => {
                            return (
                                <Menu.Item key={index}>
                                    {({ active }) => (
                                        <a
                                            onClick={() => switchValue(data)}
                                            className={classNames(
                                                active
                                                    ? 'bg-gray-100 text-gray-900 cursor-pointer'
                                                    : 'text-gray-700',
                                                'group flex items-center px-4 py-2 text-sm'
                                            )}
                                        >
                                            {data.name}
                                        </a>
                                    )}
                                </Menu.Item>
                            );
                        })}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
