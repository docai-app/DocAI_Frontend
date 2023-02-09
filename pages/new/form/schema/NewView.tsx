import { TableCellsIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface NewViewProps {
    forms: any[];
}

export default function NewView(props: NewViewProps) {
    const { forms = [] } = props;
    return (
        <>
            <div className="max-w-7xl mx-auto h-[calc(100vh-18.5rem)] px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                填寫表格
                            </h2>
                        </div>
                    </div>
                    <div className="flex float-row flex-wrap">
                        {forms.map((item, index) => {
                            return (
                                <Link href={`/new/form/schema/${item.id}`} key={index}>
                                    <a className="p-8 hover:bg-gray-100  items-center text-center">
                                        <TableCellsIcon className="h-20" />
                                        <p>{item.name}</p>
                                    </a>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
