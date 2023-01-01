import { DocumentSearchIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import HeadView from '../../../components/feature/data/HeadView';

interface SearchFormViewProps {
    forms: any[];
}

function SearchFormView(props: SearchFormViewProps) {
    const { forms = [] } = props;

    return (
        <>
            <div className="max-w-7xl mx-auto h-[calc(100vh-18.5rem)] px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <HeadView />
                    <div className="flex float-row flex-wrap">
                        {forms.map((item, index) => {
                            return (
                                <Link href={`/search/form/${item.id}`} key={index}>
                                    <a className="p-4 hover:bg-gray-100  items-center text-center">
                                        <DocumentSearchIcon className="h-20" />
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
export default SearchFormView;
