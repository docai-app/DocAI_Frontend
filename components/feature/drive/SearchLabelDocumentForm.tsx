/* This example requires Tailwind CSS v2.0+ */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useAlert from '../../../hooks/useAlert';
import LabelDropdowns from './LabelDropdowns';
export default function SearchLabelDocumentForm(props: any) {
    const { setAlert } = useAlert();
    const [tagId, setTagId] = useState('');
    const [content, setContent] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [tags, setTags] = useState([])
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        if (visible && props?.getAllLabelsData?.tags?.length > 10) {
            setTags(props?.getAllLabelsData?.tags.slice(0, 10))
        } else {
            setTags(props?.getAllLabelsData?.tags)
        }
    }, [props, visible])
    return (
        <>
            <div className="fixed bottom-0 w-11/12 sm:w-11/12 md:w-11/12 lg:w-10/12 xl:w-10/12 mx-auto max-w-7xl pr-0 sm:pr-2 md:pr-3 lg:pr-16 overflow-hidden">
                <div className=" border rounded-lg px-4 py-2 bg-white w-full  mx-auto      ">
                    <div className="w-full flex flex-col ">
                        <div className='flex flex-row justify-between  pr-10'>
                            <label className="text-md ">標籤:</label>

                            <Link href={'/setting/label'}>
                                <a className="text-md  underline text-blue-500">標籤管理</a>
                            </Link>
                        </div>
                        <div className="flex flex-1 flex-row flex-wrap items-center break-all">
                            {tags?.map((tag: any, index: number) => {
                                return (
                                    <div key={index}>
                                        <LabelDropdowns
                                            label={tag}
                                            search={() => {
                                                props.search(
                                                    tag.name,
                                                    tag.id,
                                                    content,
                                                    startDate,
                                                    endDate
                                                );
                                            }}
                                            from_filling={() => {
                                                setAlert({
                                                    title: '新功能開發中，敬請期待！',
                                                    type: 'info'
                                                });
                                            }}
                                            approval={() => {
                                                setAlert({
                                                    title: '新功能開發中，敬請期待！',
                                                    type: 'info'
                                                });
                                            }}
                                            move_execl={() => {
                                                setAlert({
                                                    title: '新功能開發中，敬請期待！',
                                                    type: 'info'
                                                });
                                            }}
                                        />
                                    </div>
                                    // <button className='bg-blue-500 hover:bg-blue-600 rounded-md text-white px-4 py-1 mx-2 my-1' key={index}
                                    //     onClick={() => {
                                    //         props.search(tag.id, content, startDate, endDate);

                                    //     }}
                                    // >{tag.name}</button>
                                );
                            })}
                            {tags != null &&
                                <div className=' cursor-pointer'
                                    onClick={() => {
                                        setVisible(!visible)
                                    }}>
                                    <a className="text-sm sm:text-md  underline text-blue-500">{visible ? '查看更多' : '隱藏'}</a>
                                </div>
                            }


                            {tags == null ? (
                                <div className="animate-pulse flex flex-row justify-center items-center gap-2">
                                    <div className="h-4 w-32 bg-gray-400 rounded"></div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className="my-2">
                        <input
                            type="search"
                            name="content"
                            id="content"
                            className="block w-full rounded-md border-0 py-1 sm:py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="輸入文件的關鍵字或文件的相關內容"
                            onChange={(e) => {
                                setContent(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
