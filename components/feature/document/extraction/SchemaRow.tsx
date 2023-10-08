import moment from 'moment';
import Link from 'next/link';

interface ChatbotRowProps {
    schema: any;
}

export default function ExtractSchemaRow(props: ChatbotRowProps) {
    const { schema } = props;

    return (
        <>
            <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    <Link href={`/document/smart_extraction_schema/${schema?.id}`}>
                        <a className="text-indigo-500">{schema?.name}</a>
                    </Link>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {schema?.description}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">數據提取</td>

                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {moment(schema?.created_at).format('YYYY-MM-DD HH:ss')}
                </td>

                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <Link
                        href={`/document/extraction/${schema?.label_id}/schema?schema_id=${schema?.id}`}
                    >
                        <a className="text-indigo-600 hover:text-indigo-900">編輯</a>
                    </Link>
                </td>
            </tr>
        </>
    );
}
