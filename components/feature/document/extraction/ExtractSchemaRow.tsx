interface ChatbotRowProps {
    schema: any;
}

export default function ExtractSchemaRow(props: ChatbotRowProps) {
    const { schema } = props;

    return (
        <>
            <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    {schema?.key}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {schema?.data_type}
                </td>

                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {schema?.query}
                </td>

                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <a className="text-indigo-600 hover:text-indigo-900">
                        編輯<span className="sr-only">, Lindsay Walton</span>
                    </a>
                </td>
            </tr>
        </>
    );
}
