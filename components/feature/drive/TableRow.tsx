import { DocumentIcon, FolderIcon, ShareIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Dropdowns from './Dropdowns';

interface TableRowProps {
    doc: any;
    type: string;
    setMode: Dispatch<SetStateAction<'view' | 'move' | 'share' | 'newFolder'>>;
    setTarget: any;
    setVisableDelete?: any;
    setVisableRename: any;
    setCurrent?: any;
    setCheckedData?: any;
    checked?: boolean;
}
export default function TableRow(props: TableRowProps) {
    const {
        doc,
        type,
        setMode,
        setTarget,
        setVisableDelete,
        setVisableRename,
        setCurrent,
        setCheckedData,
        checked
    } = props;
    const [visable, setVisable] = useState(false);
    const updated_at = new Date(doc.updated_at);
    const now = new Date();
    let date = '';
    if (updated_at.getFullYear() === now.getFullYear()) {
        if (updated_at.getMonth() === now.getMonth() && updated_at.getDate() === now.getDate())
            date = `${
                updated_at.getHours() < 10
                    ? '0' + updated_at.getHours().toString()
                    : updated_at.getHours()
            }:${
                updated_at.getMinutes() < 10
                    ? '0' + updated_at.getMinutes().toString()
                    : updated_at.getMinutes()
            }`;
        else
            date = `${
                updated_at.getMonth() < 9
                    ? '0' + (updated_at.getMonth() + 1).toString()
                    : updated_at.getMonth() + 1
            }/${
                updated_at.getDate() < 10
                    ? '0' + updated_at.getDate().toString()
                    : updated_at.getDate()
            }`;
    } else {
        date = `${updated_at.getFullYear()}/${
            updated_at.getMonth() < 9
                ? '0' + (updated_at.getMonth() + 1).toString()
                : updated_at.getMonth() + 1
        }/${
            updated_at.getDate() < 10 ? '0' + updated_at.getDate().toString() : updated_at.getDate()
        }`;
    }
    const url = doc.storage_url || `/drive/${doc.id}`;
    const onMouseEnter = () => {
        if (checked) return;
        setVisable(true);
    };
    const onMouseLeave = () => {
        if (checked) return;
        setVisable(false);
    };
    const check = (e: any) => {
        setCheckedData(type, e.target.checked, e.target.value);
    };

    useEffect(() => {
        if (!checked) {
            setVisable(false);
        }
    }, [checked]);

    return (
        <div
            key={doc.id}
            className={`flex hover:bg-gray-100`}
            onMouseEnter={() => {
                onMouseEnter();
            }}
            onMouseLeave={() => {
                onMouseLeave();
            }}
            data-id={doc.id}
            data-type={type}
        >
            <div className="mx-2 w-10 items-center flex justify-center" data-disableselect="true">
                {(visable || checked) && (
                    <input
                        type={'checkbox'}
                        value={doc.id}
                        className=""
                        onChange={(e) => {
                            check(e);
                        }}
                        checked={checked}
                    />
                )}
            </div>
            <div className="px-2 py-3 flex flex-row items-center">
                {type === 'documents' ? (
                    <DocumentIcon className="ml-auto h-6 text-gray-200" />
                ) : (
                    <FolderIcon className="ml-auto h-6 text-blue-200" />
                )}
            </div>
            <div className="px-2 py-4 text-left w-5/12">
                {type === 'folders' ? (
                    <Link href={`${url}?name=${doc.name}`}>
                        <a className="hover:underline">{doc.name}</a>
                    </Link>
                ) : (
                    <a href={url} target="_blank" rel="noreferrer" className="hover:underline">
                        {doc.name}
                    </a>
                )}
            </div>
            <div className="px-2 py-4 flex justify-end gap-2 w-2/12 flex-wrap">
                {type !== 'folders' &&
                    (doc?.is_classified === false && doc?.labels?.length == 0 ? (
                        <span className="inline-flex items-center px-2.5 h-6 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            未分類
                        </span>
                    ) : (
                        doc?.labels?.map((label: any, index: number) => {
                            return (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-2.5 h-6 rounded-full text-xs font-medium bg-green-100 text-black"
                                >
                                    {label?.name}
                                </span>
                            );
                        })
                    ))}
            </div>
            <div className="px-2 py-4 flex justify-end gap-2 w-2/12">
                {type === 'folders' && (
                    <ShareIcon
                        className="h-5 text-gray-300 hover:text-gray-500 cursor-pointer"
                        onClick={() => {
                            setMode('share');
                            setTarget([doc]);
                        }}
                    />
                )}
                <Dropdowns
                    type={type}
                    url={url}
                    name={doc?.name}
                    rename={() => {
                        setVisableRename(true);
                        setCurrent({
                            id: doc?.id,
                            name: doc?.name,
                            type: type
                        });
                    }}
                    download={() => {}}
                    move={() => {
                        setMode('move');
                        setTarget([doc]);
                        setCurrent({
                            id: doc?.id,
                            name: doc?.name,
                            type: type
                        });
                    }}
                    remove={() => {
                        setVisableDelete(true);
                        setCurrent({
                            id: doc?.id,
                            name: doc?.name,
                            type: type
                        });
                    }}
                />
                {/* <DocumentSquare2StackIcon
                    className="h-5 text-gray-300 hover:text-gray-500 cursor-pointer"
                    onClick={() => {
                        setMode('move');
                        setTarget([doc]);
                    }}
                /> */}
            </div>
            <div className="pr-6 py-4 text-right w-2/12">{date}</div>
            <div className="pr-6 py-4 text-right w-2/12">{doc?.user?.nickname}</div>
        </div>
    );
}
