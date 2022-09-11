import { Fragment, useCallback, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import Router, { useRouter } from 'next/router';
import SearchContainer from '../../../pages/search/SearchContainer';
import { text } from 'stream/consumers';
import MyDropdown from '../Widget/MyDropdown';
import Api from '../../../apis';
import useAxios from 'axios-hooks';

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
const userNavigation = [
    //{ name: 'Your Profile', href: '#' },
    //{ name: 'Settings', href: '#' },
    { name: '登出', href: '#' }
];

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
const apiSetting = new Api();
function HeadNav() {
    const [email, setEmail] = useState<string>('');
    const router = useRouter();
    const [searchContent, setSearchContent] = useState('')

    useEffect(() => {
        setEmail(localStorage.getItem('email') || 'testing');
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('authorization');
        localStorage.removeItem('email');
        document.cookie = `authorization=null; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        router.reload();
    }, [router]);

    const [{ data: getTagByTaggingData }] = useAxios(apiSetting.Tag.getTagByTagging(), {
        manual: false
    });

    const onSwitch = ( tag: any ) => {
        router.push({pathname: '/classification/' + tag.id , query: { name : tag.name}})
    }
    return (
        <>
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center w-full">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-8 w-8"
                                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                            alt="Workflow"
                                        />
                                    </div>
                                    
                                    <div className="hidden md:block w-full">
                                        <div className="ml-10 ">
                                            <section className="w-full flex justify-center items-center">
                                                <div className="flex w-full">
                                                    <input
                                                        type="text"
                                                        name="content"
                                                        id="content"
                                                        className="p-2 shadow-sm focus:ring-indigo-500 w-full sm:max-w-xs focus:border-indigo-500 block  sm:text-sm border-gray-300 rounded-tl-md rounded-bl-md"
                                                        placeholder="輸入文件的關鍵字或文件的相關內容"
                                                        onChange={(text) => setSearchContent(text.target.value)}
                                                    />
                                                    <MyDropdown value={''} datas={getTagByTaggingData?.tags} onSwitch={onSwitch} />
                                                    <button
                                                        type="submit"
                                                        className="flex mt-3 items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                        onClick={() => {
                                                            if( searchContent )
                                                                Router.push({pathname: '/search', query: {'content': searchContent}})
                                                            // searchDocumentFormik.handleSubmit();
                                                        }}
                                                    >
                                                    搜尋 🔍
                                                </button>
                                                
                                                </div>
                                                
                                            </section>
                                        </div>

                                        {/* <div className="ml-10 flex w-full items-center"> */}
                                            {/* {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </a>
                                            ))} */}
                                        {/* </div> */}
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        {/*<button*/}
                                        {/*type="button"*/}
                                        {/*className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"*/}
                                        {/*>*/}
                                        {/*<span className="sr-only">View notifications</span>*/}
                                        {/*<BellIcon className="h-6 w-6" aria-hidden="true" />*/}
                                        {/*</button>*/}

                                        <Menu as="div" className="ml-3 relative">
                                            <div>
                                                <Menu.Button className="max-w-xs bg-gray-800 rounded-md flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                    <span className="sr-only">Open user menu</span>
                                                    {/*<img*/}
                                                    {/*className="h-8 w-8 rounded-full"*/}
                                                    {/*src={user.imageUrl}*/}
                                                    {/*alt=""*/}
                                                    {/*/>*/}
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
                                                    {/*{userNavigation.map((item) => (*/}
                                                    {/*<Menu.Item key={item.name}>*/}
                                                    {/*{({ active }) => (*/}
                                                    {/*<a*/}
                                                    {/*href={item.href}*/}
                                                    {/*className={classNames(*/}
                                                    {/*active ? 'bg-gray-100' : '',*/}
                                                    {/*'block px-4 py-2 text-sm text-gray-700'*/}
                                                    {/*)}*/}
                                                    {/*>*/}
                                                    {/*{item.name}*/}
                                                    {/*</a>*/}
                                                    {/*)}*/}
                                                    {/*</Menu.Item>*/}
                                                    {/*))}*/}
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                                                                )}
                                                                onClick={()=>signOut()}
                                                            >
                                                                登出
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {/* {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))} */}
                                <input
                                    type="text"
                                    name="content"
                                    id="content"
                                    className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="輸入文件的關鍵字或文件的相關內容"
                                    // onChange={searchDocumentFormik.handleChange('content')}
                                />

                            </div>
                            <div className="pt-4 pb-3 border-t border-gray-700">
                                <div className="flex items-center px-5">
                                    {/*<div className="flex-shrink-0">*/}
                                    {/*<img*/}
                                    {/*className="h-10 w-10 rounded-full"*/}
                                    {/*src={user.imageUrl}*/}
                                    {/*alt=""*/}
                                    {/*/>*/}
                                    {/*</div>*/}
                                    <div>
                                        {/*<div className="text-base font-medium leading-none text-white">*/}
                                        {/*{user.name}*/}
                                        {/*</div>*/}
                                        <div className="text-sm my-2 font-medium leading-none text-gray-200">
                                            {email}
                                        </div>
                                    </div>
                                    {/*<button*/}
                                    {/*type="button"*/}
                                    {/*className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"*/}
                                    {/*>*/}
                                    {/*<span className="sr-only">View notifications</span>*/}
                                    {/*<BellIcon className="h-6 w-6" aria-hidden="true" />*/}
                                    {/*</button>*/}
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
