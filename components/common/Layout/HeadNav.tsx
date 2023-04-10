import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
    ArrowRightOnRectangleIcon, Bars3Icon, Cog6ToothIcon, XMarkIcon
} from '@heroicons/react/24/outline';
import useAxios from 'axios-hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useEffect, useState } from 'react';
import Api from '../../../apis';

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};

const navigation = [
    { name: '主頁', href: '/', current: false },
    { name: '文檔類型', href: '/classification', current: false },
    { name: '文檔搜尋', href: '/search', current: false }
];
const userNavigation = [{ name: '登出', href: '#' }];

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
const apiSetting = new Api();
function HeadNav(props: any) {
    const [email, setEmail] = useState<string>('');
    const router = useRouter();
    const [searchContent, setSearchContent] = useState('');

    useEffect(() => {
        setEmail(localStorage.getItem('email') || '');
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('authorization');
        localStorage.removeItem('email');
        document.cookie = `authorization=null; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        router.push('/login');
    }, [router]);

    const [{ data: getTagByTaggingData }] = useAxios(apiSetting.Tag.getAllTags(), {
        manual: false
    });

    const onSwitch = (tag: any) => {
        router.push({ pathname: '/classification/' + tag.id, query: { name: tag.name } });
    };
    return (
        <>
            <Disclosure as="nav" className="bg-gray-800 w-full absolute top-0 z-50">
                {({ open }) => (
                    <>
                        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center w-full">
                                    <div className="flex-shrink-0">
                                        <Link href="/" passHref>
                                            <p className="text-white text-2xl font-bold cursor-pointer">
                                                DocAI
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                                <div className="hidden lg:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <Menu as="div" className="ml-3 relative">
                                            <div>
                                                <Menu.Button className="max-w-xs bg-gray-800 rounded-md flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                    <span className="sr-only">Open user menu</span>
                                                    <div className="text-white px-2 py-1">
                                                        {email}
                                                    </div>
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
                                                <Menu.Items className="origin-top-right absolute z-10 right-0 mt-6 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'flex items-center gap-2 px-4 py-2 text-sm text-gray-700 w-full text-left'
                                                                )}
                                                                onClick={() =>
                                                                    router.push('/setting')
                                                                }
                                                            >
                                                                <Cog6ToothIcon className="h-4" />
                                                                設定
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                className={classNames(
                                                                    active ? 'bg-red-100' : '',
                                                                    'flex items-center gap-2 px-4 py-2 text-sm text-gray-700 w-full text-left'
                                                                )}
                                                                onClick={() => signOut()}
                                                            >
                                                                <ArrowRightOnRectangleIcon className="h-4" />
                                                                登出
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                                <div className="-mr-2 flex lg:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {props.sidebarOpen ? (
                                            <XMarkIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                                onClick={() => props.setSidebarOpen(false)}
                                            />
                                        ) : (
                                            <Bars3Icon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                                onClick={() => props.setSidebarOpen(true)}
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <input
                                    type="text"
                                    name="content"
                                    id="content"
                                    className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="輸入文件的關鍵字或文件的相關內容"
                                />
                            </div>
                            <div className="pt-4 pb-3 border-t border-gray-700">
                                <div className="flex items-center px-5">
                                    <div>
                                        <div className="text-sm my-2 font-medium leading-none text-gray-200">
                                            {email}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-1 px-2 space-y-1 flex">
                                    <Disclosure.Button
                                        as="button"
                                        className="block px-3 py-2 flex-grow text-left rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                                        onClick={signOut}
                                    >
                                        登出
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </>
    );
}

export default HeadNav;
