import { PlusIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import EditDataModal from './EditDataModal';


export default function HeadView() {
    const [visable, setVisiable] = useState(false)
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">數據搜尋</h2>
                </div>
            </div>
            <div className="py-4 flex flex-col gap-4 h-full w-full">
                <div className="flex flex-row gap-2 pb-4  justify-end">
                    <button
                        type="button"
                        className="h-full float-right inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => {
                            setVisiable(true)
                        }}
                    >
                        <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                        新增
                    </button>
                </div>
            </div>
            <EditDataModal visable={visable} cancelClick={() => { setVisiable(false) }} />
        </>
    )
}