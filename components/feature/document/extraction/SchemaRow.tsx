import { TableCellsIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import Link from 'next/link';

interface ChatbotRowProps {
    schema: any;
    has_label?: boolean;
}

export default function ExtractSchemaRow(props: ChatbotRowProps) {
    const { schema, has_label = true } = props;

    return (
        <>
            <tr className=" ">
                <td className=" flex-row w-34/12 py-4   text-sm font-medium text-gray-900 sm:pl-0">
                    <Link href={`/document/smart_extraction_schema/${schema?.id}`}>
                        <div className="flex flex-row cursor-pointer">
                            <TableCellsIcon className="mr-1 w-5 h-5" />
                            <a className="text-indigo-500">{schema?.name}</a>
                        </div>
                    </Link>
                </td>
                <td className="w-3/12  py-4 px-1 text-sm text-gray-500">{schema?.description}</td>
                <td className="w-2/12  py-4 text-sm text-gray-500">數據提取</td>

                <td className="w-2/12  py-4 text-sm text-gray-500">
                    {moment(schema?.created_at).format('YYYY-MM-DD HH:ss')}
                </td>

                <td className="relative w-2/12  py-4   text-right text-sm font-medium sm:pr-0">
                    <Link
                        href={
                            has_label
                                ? `/document/extraction/${schema?.label_id}/schema?schema_id=${schema?.id}`
                                : `/document/extraction/documents/schema?schema_id=${schema?.id}`
                        }
                    >
                        <a className="text-indigo-600 hover:text-indigo-900">編輯</a>
                    </Link>
                </td>
            </tr>
        </>
    );
}
