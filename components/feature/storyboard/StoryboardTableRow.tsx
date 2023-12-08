import { useState } from 'react';

interface TableRowProps {
    index: number;
    item: any;
    preview: any;
    edit: any;
    remove: any;
}
export default function StoryboardTableRow(props: TableRowProps) {
    const { index, item, preview, edit, remove } = props;

    const [visable, setVisable] = useState(false);

    return (
        <>
            <tr
                className="w-full divide-x divide-gray-200 hover:bg-gray-100"
                onMouseEnter={() => {
                    // onMouseEnter();
                }}
                onMouseLeave={() => {
                    // onMouseLeave();
                }}
            >
                <td className=" ">
                    <div className=" mx-2 w-10 items-center flex justify-center">
                        <label>{index + 1}</label>
                    </div>
                </td>
                <td className="w-4/12 px-1 py-4 text-sm ">{item?.title}</td>
                <td className="w-4/12  px-1  py-4 text-sm  ">{item?.description}</td>
                {/* Add the storage_url to the data and open it in a new tab */}
                <td className=" py-4 px-1 text-center w-2/12 text-sm font-medium text-gray-900 ">
                    <a
                        className=" cursor-pointer text-blue-500 hover:text-blue-700 underline"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => {
                            preview();
                        }}
                    >
                        點擊查看
                    </a>
                </td>
                <td className=" py-4 px-1 text-center  w-2/12 text-sm font-medium text-gray-900 ">
                    <a
                        className=" cursor-pointer text-blue-500 hover:text-blue-700 underline"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => {
                            edit();
                        }}
                    >
                        修改
                    </a>
                    {/* {' | '}
                    <a
                        className="cursor-pointer text-red-500 hover:text-red-700 underline"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => {
                            remove()
                        }}
                    >
                        刪除
                    </a> */}
                </td>
            </tr>
        </>
    );
}
