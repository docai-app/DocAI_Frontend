/* This example requires Tailwind CSS v2.0+ */
import { useState } from 'react';
export default function SearchDocumentForm(props: any) {
    const [tagId, setTagId] = useState('');
    const [content, setContent] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    return (
        <>
            <div className="grid grid-cols-6 gap-4 border-gray-200 rounded-md md:p-8 p-4 shadow-md">
                <div className="col-span-6 sm:col-span-2">
                    <label
                        htmlFor="content"
                        className="block text-sm font-semibold leading-6 text-gray-900 text-left"
                    >
                        類別
                    </label>
                    <select
                        id="select_tag"
                        name="location"
                        className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue=""
                        onChange={(e) => {
                            setTagId(e.target.value);
                        }}
                    >
                        <option value="" disabled>
                            請選擇類別
                        </option>
                        {props.getAllLabelsData?.tags.map((tag: any, index: number) => {
                            return (
                                <option key={index} value={tag.id}>
                                    {tag.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="col-span-6 sm:col-span-4">
                    <label
                        htmlFor="content"
                        className="block text-sm font-semibold leading-6 text-gray-900 text-left"
                    >
                        關鍵字
                    </label>
                    <input
                        type="text"
                        name="content"
                        id="content"
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="輸入文件的關鍵字或文件的相關內容"
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                    />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label
                        htmlFor="from_date"
                        className="block text-sm font-semibold leading-6 text-gray-900 text-left"
                    >
                        起始日期
                    </label>
                    <input
                        type="date"
                        name="from_date"
                        id="from_date"
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="請選擇起始日期"
                        onChange={(e) => {
                            setStartDate(e.target.value);
                        }}
                    />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label
                        htmlFor="to_date"
                        className="block text-sm font-semibold leading-6 text-gray-900 text-left"
                    >
                        結束日期
                    </label>
                    <input
                        type="date"
                        name="to_date"
                        id="to_date"
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="請選擇結束日期"
                        onChange={(e) => {
                            setEndDate(e.target.value);
                        }}
                    />
                </div>
                <div className="col-span-6 sm:col-start-5 sm:col-end-7">
                    <button
                        className="block h-full w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => {
                            props.search(tagId, content, startDate, endDate);
                        }}
                    >
                        搜尋 🔍
                    </button>
                </div>
            </div>
        </>
    );
}
