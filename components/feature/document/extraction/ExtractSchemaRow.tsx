import _ from 'lodash';
interface ChatbotRowProps {
    position: number;
    schema: any;
    edit: any;
    remove: any;
    visableAdd: boolean;
}

export default function ExtractSchemaRow(props: ChatbotRowProps) {
    const { position, schema, edit, remove, visableAdd } = props;
    const data_types = [
        {
            name: '數值',
            value: 'string'
        },
        {
            name: '日期',
            value: 'date'
        },
        {
            name: '數字',
            value: 'number'
        }
    ];
    function findNameByValue(value: string) {
        if (_.isEmpty(value)) return '';
        const dataType = data_types.find((item) => item.value === value);
        return dataType ? dataType.name : '';
    }
    return (
        <>
            <tr>
                <td className="  py-4 w-2/12 text-sm font-medium text-gray-900 sm:pl-0">
                    {schema?.key}
                </td>
                <td className=" w-2/12 py-4 text-sm text-gray-500">
                    {findNameByValue(schema?.data_type)}
                </td>

                <td className=" w-6/12 py-4 text-sm text-gray-500">
                    {_.isArray(schema?.query) ? (
                        <>
                            {schema?.query?.map((q: string, index: number) => {
                                return <p key={index}>{q}</p>;
                            })}
                        </>
                    ) : (
                        <>{schema?.query}</>
                    )}
                </td>

                <td className="  py-4  w-2/12 text-right text-sm font-medium sm:pr-0">
                    {visableAdd && (
                        <>
                            <a
                                className="text-indigo-600 cursor-pointer hover:text-indigo-900"
                                onClick={() => {
                                    edit(position);
                                }}
                            >
                                編輯
                            </a>
                            {' | '}
                            <a
                                className="text-red-600 cursor-pointer hover:text-indigo-900"
                                onClick={() => {
                                    remove(position);
                                }}
                            >
                                刪除
                            </a>
                        </>
                    )}
                </td>
            </tr>
        </>
    );
}
