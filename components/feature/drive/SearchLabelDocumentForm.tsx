/* This example requires Tailwind CSS v2.0+ */
import Link from 'next/link';
import { useState } from 'react';
import useAlert from '../../../hooks/useAlert';
import LabelDropdowns from './LabelDropdowns';
export default function SearchLabelDocumentForm(props: any) {
    const { setAlert } = useAlert();
    const [tagId, setTagId] = useState('');
    const [content, setContent] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    return (
        <>
            <div className=' flex-0 border rounded-b-lg px-4 py-2 bg-white   max-w-7xl w-full mx-auto'>
                <div className='w-full flex flex-row'>
                    <label className='text-md flex-0'>標籤:</label>
                    <div className='flex flex-1 flex-row flex-wrap'>
                        {
                            props?.getAllLabelsData?.tags?.map((tag: any, index: number) => {
                                return (
                                    <div key={index}>
                                        <LabelDropdowns
                                            label={tag}
                                            search={() => {
                                                props.search(tag.name, tag.id, content, startDate, endDate);
                                            }}
                                            from_filling={() => {
                                                setAlert({ title: '未做', type: 'info' })
                                            }}
                                            approval={() => {
                                                setAlert({ title: '未做', type: 'info' })
                                            }}
                                            move_execl={() => {
                                                setAlert({ title: '未做', type: 'info' })
                                            }} />
                                    </div>
                                    // <button className='bg-blue-500 hover:bg-blue-600 rounded-md text-white px-4 py-1 mx-2 my-1' key={index}
                                    //     onClick={() => {
                                    //         props.search(tag.id, content, startDate, endDate);

                                    //     }}
                                    // >{tag.name}</button>
                                )
                            })
                        }
                        {props?.getAllLabelsData?.tags == null ? (
                            <div className="animate-pulse flex flex-row justify-center items-center gap-2">
                                <div className="h-4 w-32 bg-gray-400 rounded"></div>
                            </div>
                        ) : null}

                    </div>
                    <div className='flex-0'>
                        <Link href={'/setting/label'}>
                            <a className='text-md  underline text-blue-500'>標籤管理</a>
                        </Link>
                    </div>


                </div>
                <div className='my-2'>
                    <input
                        type="search"
                        name="content"
                        id="content"
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="輸入文件的關鍵字或文件的相關內容"
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                    />
                </div>

            </div>
        </>
    );
}
