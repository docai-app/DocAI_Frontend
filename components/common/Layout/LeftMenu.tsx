/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  CalendarIcon,
  HomeIcon,
  MapIcon,
  MenuIcon,
  SearchCircleIcon,
  SpeakerphoneIcon,
  UserGroupIcon,
  XIcon,
  FolderIcon,
  DocumentSearchIcon,
  ShieldCheckIcon,
  UploadIcon,
  CloudUploadIcon,
  ClipboardCheckIcon,
  SortAscendingIcon,
  CloudIcon,
  TagIcon
} from '@heroicons/react/outline'
import { useRouter } from 'next/router';

export default function LeftMenu(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const navigation = [
    { 
      name: '首頁', 
      href: '/', 
      icon: FolderIcon, 
      current: router.pathname == '/',
      iconForeground: 'text-teal-700',
      iconBackground: 'bg-teal-50'
    },
    { 
      name: '智能文檔處理', 
      href: '/classification/logs', 
      icon: ClipboardCheckIcon, 
      current: router.pathname.indexOf('classification') != -1,
      iconForeground: 'text-red-700',
      iconBackground: 'bg-red-50'
    },
    { 
      name: '標簽管理', 
      href: '/setting/label', 
      icon: TagIcon, 
      current: router.pathname.indexOf('setting') != -1,
      iconForeground: 'text-violet-700',
      iconBackground: 'bg-violet-50'
    },
    // { 
    //   name: '請假表搜尋', 
    //   href: '/absence/search', 
    //   icon: SearchCircleIcon, 
    //   current: router.pathname.indexOf('/absence/search') != -1,
    //   iconForeground: 'text-orange-700',
    //   iconBackground: 'bg-orange-50'
    // },
    { 
      name: '文件審批', 
      href: '/absence/approval', 
      icon: ShieldCheckIcon, 
      current: router.pathname.indexOf('/absence') != -1 ,
      iconForeground: 'text-blue-700',
      iconBackground: 'bg-blue-50'
    },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  return (
    <>
      <div className="h-full flex">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setSidebarOpen}>
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
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex justify-center flex-shrink-0 items-center px-4">
                    {/* <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-900-text.svg"
                      alt="Workflow"
                    /> */}
                    {/* <label>DocAI</label> */}
                    <a
                      className="p-3 bg-indigo-600 hover:bg-indigo-900 leading-none text-white rounded-md"
                      href={'/classification/upload'}
                    >
                      +上傳文檔
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
                              <item.icon className="h-6 w-6" aria-hidden="true" />
                          </span>

                          {/* <item.icon
                            className={classNames(
                              item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                              'mr-4 h-6 w-6'
                            )}
                            aria-hidden="true"
                          /> */}
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </nav>
                </div>
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <div className="flex-shrink-0 w-full group block">
                  <div className="flex items-center">
                    <div>
                      <p className="mt-8 text-center text-base text-gray-400">
                        &copy; {new Date().getFullYear()} M2M. All rights reserved.
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
                <div className="flex justify-center items-center flex-shrink-0 px-4">
                  {/* <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-900-text.svg"
                    alt="Workflow"
                  /> */}
                  <a
                    className="p-3 bg-indigo-600 hover:bg-indigo-900 leading-none text-white rounded-md"
                    href={'/classification/upload'}
                  >
                    +上傳文檔
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
                              <item.icon className="h-6 w-6" aria-hidden="true" />
                          </span>

                        {/* <item.icon
                          className={classNames(
                            'h-6 w-6 mr-3'
                            // item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                            // 'mr-3 h-6 w-6'
                          )}
                          aria-hidden="true"
                        /> */}
                        {item.name}
                      </a>
                    ))}
                  </div>
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <div className="flex-shrink-0 w-full group block">
                  <div className="flex items-center">
                    <p className="mt-8 text-center text-base text-gray-400">
                      &copy; {new Date().getFullYear()} M2M. All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div className="lg:hidden">
            <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
              {/* <div>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
              </div> */}
              <div>
                <button
                  type="button"
                  className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <main className="flex-1 relative  overflow-y-auto focus:outline-none">
              {/* Start main area*/}
              <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                <div className="h-full rounded-lg">
                  {props.content}
                </div>
              </div>
              {/* End main area */}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
