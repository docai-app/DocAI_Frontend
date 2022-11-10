import { DocumentIcon, FolderIcon, ShareIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import Dropdowns from './Dropdowns';

interface TableRowProps {
    doc: any;
    type: string;
    setMode: Dispatch<SetStateAction<'view' | 'move' | 'share' | 'newFolder'>>;
    setTarget: any;
}
export default function TableRow(props: TableRowProps) {
    const { doc, type, setMode, setTarget } = props;
    const updated_at = new Date(doc.updated_at);
    const now = new Date();
    let date = '';
    if (updated_at.getFullYear() === now.getFullYear()) {
        if (updated_at.getMonth() === now.getMonth() && updated_at.getDate() === now.getDate())
            date = `${updated_at.getHours() < 10
                ? '0' + updated_at.getHours().toString()
                : updated_at.getHours()
                }:${updated_at.getMinutes() < 10
                    ? '0' + updated_at.getMinutes().toString()
                    : updated_at.getMinutes()
                }`;
        else
            date = `${updated_at.getMonth() < 9
                ? '0' + (updated_at.getMonth() + 1).toString()
                : updated_at.getMonth() + 1
                }/${updated_at.getDate() < 10
                    ? '0' + updated_at.getDate().toString()
                    : updated_at.getDate()
                }`;
    } else {
        date = `${updated_at.getFullYear()}/${updated_at.getMonth() < 9
            ? '0' + (updated_at.getMonth() + 1).toString()
            : updated_at.getMonth() + 1
            }/${updated_at.getDate() < 10 ? '0' + updated_at.getDate().toString() : updated_at.getDate()
            }`;
    }
    const url = doc.storage_url || `/drive/${doc.id}`;
    return (
        <tr key={doc.id}>
            <td scope="col" className="px-2 py-3">
                {type === 'documents' ? (
                    <DocumentIcon className="ml-auto h-6 text-gray-200" />
                ) : (
                    <FolderIcon className="ml-auto h-6 text-blue-200" />
                )}
            </td>
            <td className="px-2 py-4 text-left">
                {type === 'folders' ? (
                    <Link href={`${url}?name=${doc.name}`}>
                        <a className="hover:underline">{doc.name}</a>
                    </Link>
                ) : (
                    <a href={url} target="_blank" rel="noreferrer" className="hover:underline">
                        {doc.name}
                    </a>
                )}
            </td>
            <td className="px-2 py-4 flex justify-end gap-2">
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
                    rename={() => {

                    }}
                    download={() => {

                    }}
                    move={() => {
                        setMode('move');
                        setTarget([doc]);
                    }}
                    remove={() => {

                    }}
                />
                {/* <DocumentDuplicateIcon
                    className="h-5 text-gray-300 hover:text-gray-500 cursor-pointer"
                    onClick={() => {
                        setMode('move');
                        setTarget([doc]);
                    }}
                /> */}
            </td>
            <td className="pr-6 py-4 text-right">{date}</td>
        </tr>
    );
}
