import moment from 'moment';
import Link from 'next/link';

interface MiniappRowProps {
    item: any;
    share?: any;
}

export default function MiniappRow(props: MiniappRowProps) {
    const { item, share } = props;
    return (
        <>
            <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    <Link href={`/miniapp/${item?.id}`}>
                        <a className="text-indigo-500">{item?.name}</a>
                    </Link>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {item?.description}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {item?.folder?.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {moment(item?.created_at).format('YYYY-MM-DD HH:ss')}
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <label
                        className=" cursor-pointer text-indigo-600 hover:text-indigo-900"
                        onClick={() => {
                            share(item);
                        }}
                    >
                        分享<span className="sr-only">, Lindsay Walton</span>
                    </label>
                    {'  | '}
                    <Link href={`/miniapp/create?id=${item?.id}`}>
                        <a className="text-indigo-600 hover:text-indigo-900">
                            編輯<span className="sr-only">, Lindsay Walton</span>
                        </a>
                    </Link>
                </td>
            </tr>
        </>
    );
}
