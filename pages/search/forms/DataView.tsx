import { SearchCircleIcon } from '@heroicons/react/solid';
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
import { withTheme } from '@rjsf/core';
import Link from 'next/link';

const Form = withTheme(Bootstrap4Theme);

interface DataViewProps {
    showAllItemsData: any;
}

function DataView(props: DataViewProps) {
    const { showAllItemsData = null } = props;

    return (
        <>
            <div className="max-w-7xl mx-auto h-[calc(100vh-18.5rem)] px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* <HeadView formSchema={undefined} selectedFilter={[]} setSelectedFilter={function (selectedFilter: never[]): void {
                        throw new Error('Function not implemented.');
                    }} /> */}
                    <div className="flex float-row flex-wrap">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((s, index) => {
                            return (
                                <Link href={'/data/show'} key={index}>
                                    <a className="p-4 hover:bg-gray-100  items-center text-center">
                                        <SearchCircleIcon className="h-20" />
                                        <p>採購數字</p>
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
export default DataView;
