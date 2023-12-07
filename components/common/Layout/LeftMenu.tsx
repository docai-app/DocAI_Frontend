/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { Cog6ToothIcon } from '@heroicons/react/20/solid';
import {
    ArrowRightOnRectangleIcon,
    Bars3Icon,
    BookOpenIcon,
    ChartBarSquareIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    ClipboardDocumentListIcon,
    CloudArrowUpIcon,
    CubeIcon,
    FolderIcon, MagnifyingGlassIcon, ShieldCheckIcon, ShoppingCartIcon, TableCellsIcon, XMarkIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { Fragment, useCallback } from 'react';

export default function LeftMenu(props: any) {
    // const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();

    const signOut = useCallback(() => {
        localStorage.removeItem('authorization');
        localStorage.removeItem('email');
        document.cookie = `authorization=null; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        router.push('/login');
    }, [router]);

    const navigation = [
        {
            name: '首頁',
            href: '/',
            icon: FolderIcon,
            current: router.pathname == '/',
            iconForeground: 'text-teal-700',
            iconBackground: 'bg-teal-50'
        },
        // {
        //     name: '智能文檔處理',
        //     href: '/classification/logs',
        //     icon: ClipboardIcon,
        //     current: router.pathname.indexOf('logs') != -1,
        //     iconForeground: 'text-red-700',
        //     iconBackground: 'bg-red-50'
        // },
        // {
        //     name: '標簽管理',
        //     href: '/setting/label',
        //     icon: TagIcon,
        //     current: router.pathname.indexOf('setting') != -1,
        //     iconForeground: 'text-violet-700',
        //     iconBackground: 'bg-violet-50'
        // },
        {
            name: '文件審批',
            href: '/form/approval',
            icon: ShieldCheckIcon,
            current: router.pathname.indexOf('/approval') != -1,
            iconForeground: 'text-blue-700',
            iconBackground: 'bg-blue-50'
        },
        {
            name: '數據分析',
            href: '/smart_extraction_schema',
            icon: ChartBarSquareIcon,
            current: router.pathname.indexOf('/smart_extraction_schema') != -1,
            iconForeground: 'text-red-700',
            iconBackground: 'bg-red-50'
        },
        // {
        //     name: '文檔數據提取',
        //     href: '/document/extraction',
        //     icon: ArrowRightOnRectangleIcon,
        //     current: router.pathname.indexOf('/extraction') != -1,
        //     iconForeground: 'text-green-700',
        //     iconBackground: 'bg-green-50'
        // },
        {
            name: '待辦事項與工作流',
            href: '/project',
            icon: ClipboardDocumentListIcon,
            current: router.pathname.indexOf('/project') != -1,
            iconForeground: 'text-indigo-700',
            iconBackground: 'bg-indigo-50'
        },
        {
            name: '數據搜尋',
            href: '/search/form/schema',
            icon: MagnifyingGlassIcon,
            current: router.pathname.indexOf('/search') != -1,
            iconForeground: 'text-purple-700',
            iconBackground: 'bg-purple-50'
        },
        {
            name: '填寫表格',
            href: '/new/form/schema',
            icon: TableCellsIcon,
            current: router.pathname.indexOf('/new') != -1,
            iconForeground: 'text-red-700',
            iconBackground: 'bg-red-50'
        },
        {
            name: '故事版',
            href: '/storyboard',
            icon: BookOpenIcon,
            current: router.pathname.indexOf('/storyboard') != -1,
            iconForeground: 'text-teal-700',
            iconBackground: 'bg-teal-50'
        },
        {
            name: '資源應用程序',
            href: '/miniapp',
            icon: CubeIcon,
            current: router.pathname.indexOf('/miniapp') != -1,
            iconForeground: 'text-indigo-700',
            iconBackground: 'bg-red-50'
        },
        {
            name: '商城',
            href: '/shop',
            icon: ShoppingCartIcon,
            current: router.pathname.indexOf('/shop') != -1,
            iconForeground: 'text-indigo-700',
            iconBackground: 'bg-red-50'
        },
        {
            name: '智能助手',
            href: '/chatbot',
            icon: ChatBubbleOvalLeftEllipsisIcon,
            current: router.pathname.indexOf('/chatbot') != -1,
            iconForeground: 'text-green-700',
            iconBackground: 'bg-green-50'
        }
    ];

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ');
    }

    return (
        <>
            <div className="h-full flex pt-16">
                <Transition.Root show={props.sidebarOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 flex z-40 lg:hidden"
                        onClose={() => {
                            props.setSidebarOpen(false);
                        }}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => props.setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                                    <div className="w-full flex justify-center items-center flex-shrink-0 px-4 mt-14">
                                        <a
                                            className="w-full flex justify-center items-center p-3 bg-indigo-600 hover:bg-indigo-900 leading-none text-white rounded-md"
                                            href={'/classification/upload'}
                                        >
                                            <CloudArrowUpIcon className="h-6 w-6 inline-block mr-2" />
                                            <span>上傳文檔</span>
                                        </a>
                                    </div>
                                    <nav aria-label="Sidebar" className="mt-5">
                                        <div className="px-2 space-y-1">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-100 text-gray-900'
                                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                    )}
                                                >
                                                    <span
                                                        className={classNames(
                                                            item.iconBackground,
                                                            item.iconForeground,
                                                            'rounded-lg p-2 ring-1 ring-white mr-3 '
                                                        )}
                                                    >
                                                        <item.icon
                                                            className="h-6 w-6"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </nav>
                                </div>
                                <div className="flex flex-row">
                                    <button
                                        className={classNames(
                                            'flex items-center gap-2 px-4 py-2 text-sm text-gray-700 w-full text-center hover:bg-red-100'
                                        )}
                                        onClick={() => router.push('/setting')}
                                    >
                                        <Cog6ToothIcon className="h-4" />
                                        設定
                                    </button>
                                    <button
                                        className={classNames(
                                            'flex items-center gap-2 px-4 py-2 text-sm text-gray-700 w-full text-center hover:bg-red-100'
                                        )}
                                        onClick={() => {
                                            signOut();
                                        }}
                                    >
                                        <ArrowRightOnRectangleIcon className="h-4" />
                                        登出
                                    </button>
                                </div>
                                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                                    <div className="flex-shrink-0 w-full group block">
                                        <div className="flex items-center">
                                            <div>
                                                <p className="mt-0 text-center text-base text-gray-400">
                                                    &copy; {new Date().getFullYear()} M2M. All
                                                    rights reserved.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14" aria-hidden="true">
                            {/* Force sidebar to shrink to fit close icon */}
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:flex lg:flex-shrink-0">
                    <div className="flex flex-col w-64">
                        {/* Sidebar component, swap this element with another sidebar if you like */}
                        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-gray-100">
                            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                                <div className="w-full flex justify-center items-center flex-shrink-0 px-4">
                                    <a
                                        className="w-full flex justify-center items-center p-3 bg-indigo-600 hover:bg-indigo-900 leading-none text-white rounded-md"
                                        href={'/classification/upload'}
                                    >
                                        <CloudArrowUpIcon className="h-6 w-6 inline-block mr-2" />
                                        <span>上傳文檔</span>
                                    </a>
                                </div>
                                <nav className="mt-5 flex-1" aria-label="Sidebar">
                                    <div className="px-2 space-y-1">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-gray-200 text-gray-900'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                                )}
                                            >
                                                <span
                                                    className={classNames(
                                                        item.iconBackground,
                                                        item.iconForeground,
                                                        'rounded-lg p-2 ring-1 ring-white mr-3 '
                                                    )}
                                                >
                                                    <item.icon
                                                        className="h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </nav>
                            </div>
                            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                                <div className="flex-shrink-0 w-full group block">
                                    <div className="flex items-center">
                                        <p className="mt-0 text-center text-base text-gray-400">
                                            &copy; {new Date().getFullYear()} DocAI. All rights
                                            reserved.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
                    <div className="hidden">
                        <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
                            <div>
                                <button
                                    type="button"
                                    className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                                    onClick={() => {
                                        props.setSidebarOpen(true);
                                    }}
                                >
                                    <span className="sr-only">Open sidebar</span>
                                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 relative z-0 flex overflow-hidden">
                        <main className="flex-1 relative  overflow-y-auto focus:outline-none">
                            {/* Start main area*/}
                            <div className="absolute inset-0 py-0 px-0 sm:px-4 sm:py-8 lg:px-8 lg:py-4">
                                <div className="h-full rounded-lg">{props.content}</div>
                            </div>
                            {/* End main area */}
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
