import Link from 'next/link';
import PaginationView from '../../../common/Widget/PaginationView';
import SchemaRow from './SchemaRow';

interface Props {
    label: any;
    smart_extraction_schemas: any;
    meta: any;
}

export default function SchemaList(props: Props) {
    const { label, smart_extraction_schemas, meta } = props;

    return (
        <>
            <div className="inline-block min-w-full py-0 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                            >
                                名稱
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                                描述
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                                功能
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                                創建時間
                            </th>

                            <th
                                scope="col"
                                className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
                            >
                                <div className="flex justify-end">
                                    <Link href={`/document/extraction/${label?.id}/schema`}>
                                        <a className=" cursor-pointer block rounded-md  text-center text-sm font-semibold text-indigo-500  hover:text-indigo-700  ">
                                            + Schema
                                        </a>
                                    </Link>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {smart_extraction_schemas?.map((schema: any, index: number) => {
                            return <SchemaRow schema={schema} key={index} />;
                        })}
                    </tbody>
                </table>
                <PaginationView
                    meta={meta}
                    pathname={`/document/extraction/${label?.id}`}
                    params={null}
                />
            </div>
        </>
    );
}
