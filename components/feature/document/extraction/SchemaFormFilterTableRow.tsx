import Router from 'next/router';
import { useEffect, useState } from 'react';

interface TableRowProps {
    index: number;
    datum: any;
    selectedResult: any;
    editFormDocument: any;
    setDatumId: any;
    setVisibleDelete: any;
    setChecedkData: any;
    checked: boolean;
}
export default function SchemaFormFilterTableRow(props: TableRowProps) {
    const {
        index,
        datum,
        editFormDocument,
        selectedResult,
        setDatumId,
        setVisibleDelete,
        setChecedkData,
        checked
    } = props;

    const [visable, setVisable] = useState(false);

    useEffect(() => {
        if (!checked) {
            setVisable(false);
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
                className="divide-x divide-gray-200 hover:bg-gray-100"
                onMouseEnter={() => {
                    onMouseEnter();
                }}
                onMouseLeave={() => {
                    onMouseLeave();
                }}
            >
                <td className="hidden">
                    <div className=" mx-2 w-10 items-center flex justify-center">
                        {visable && (
                            <input
                                type={'checkbox'}
                                value={datum.id}
                                className=""
                                onChange={(e) => {
                                    check(e);
                                }}
                            />
                        )}
                    </div>
                </td>
                {/* Add the index to the data */}
                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                    {index + 1}
                </td>
                {selectedResult?.map((result: any, index: number) => {
                    return (
                        <td
                            key={index}
                            className="  py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6 max-w-sm break-all break-words whitespace-break-spaces"
                        >
                            {datum.data[result.key]}
                        </td>
                    );
                })}
                {/* Add the storage_url to the data and open it in a new tab */}
                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                    <a
                        // href={datum.document?.storage_url || '#'}
                        className="text-blue-500 hover:text-blue-700 underline"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => {
                            Router.push({
                                pathname: `/document/smart_extraction_schema/${datum.id}/show`,
                                query: {
                                    form_url: datum.document?.storage_url,
                                    data: JSON.stringify(datum.data),
                                    selectedResult: JSON.stringify(selectedResult)
                                }
                            })
                        }}
                    >
                        點擊開啟
                    </a>
                </td>
                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                    <a
                        className=" cursor-pointer text-blue-500 hover:text-blue-700 underline"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => {
                            editFormDocument(datum);
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
                            setDatumId(datum?.id);
                            setVisibleDelete(true);
                        }}
                    >
                        刪除
                    </a>
                </td>
            </tr>
        </>
    );
}
