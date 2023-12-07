import { useEffect, useState } from 'react';

interface TableRowProps {
    item: any;
    setChecedkData: any;
    checked: boolean;
    preview: any;
    edit: any;
    remove: any;
}
export default function StoryboardItemTableRow(props: TableRowProps) {
    const { item, setChecedkData, checked, preview, edit, remove } = props;

    const [visable, setVisable] = useState(false);

    useEffect(() => {
        if (!checked) {
            setVisable(false);
        } else {
            setVisable(true);
        }
    }, [checked]);

    const onMouseEnter = () => {
        if (checked) return;
        setVisable(true);
    };
    const onMouseLeave = () => {
        if (checked) return;
        setVisable(false);
    };
    const check = (e: any) => {
        setChecedkData(e.target.checked, e.target.value);
    };

    return (
        <>
            <tr
                className="w-full divide-x divide-gray-200 hover:bg-gray-100"
                onMouseEnter={() => {
                    onMouseEnter();
                }}
                onMouseLeave={() => {
                    onMouseLeave();
                }}
            >
                <td className=" ">
                    <div className=" mx-2 w-10 items-center flex justify-center">
                        {visable && (
                            <input
                                type={'checkbox'}
                                value={item.id}
                                className=""
                                defaultChecked={checked}
                                onChange={(e) => {
                                    check(e);
                                }}
                            />
                        )}
                    </div>
                </td>
                <td className="w-2/12 px-1 py-4 text-sm ">{item?.name}</td>
                <td className="w-2/12  px-1  py-4 text-sm  ">{item?.description}</td>
                <td className="w-2/12  px-1  py-4 text-sm  ">{item?.query}</td>
                <td className="w-1/12  px-1  py-4 text-sm  ">
                    {'chart' == item?.item_type ? '圖表' : '統計報告'}
                </td>
                {/* Add the storage_url to the data and open it in a new tab */}
                <td className=" py-4 px-1 text-center w-1/12 text-sm font-medium text-gray-900 ">
                    <a
                        // href={datum.document?.storage_url || '#'}
                        className="text-blue-500 hover:text-blue-700 underline"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => {
                            preview();
                        }}
                    >
                        點擊查看
                    </a>
                </td>
                <td className=" py-4 px-1 text-center  w-1/12 text-sm font-medium text-gray-900 ">
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
                    {' | '}
                    <a
                        className="cursor-pointer text-red-500 hover:text-red-700 underline"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => {
                            remove();
                        }}
                    >
                        刪除
                    </a>
                </td>
            </tr>
        </>
    );
}
