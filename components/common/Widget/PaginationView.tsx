import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import Router from 'next/router';
import { useEffect } from 'react';

interface PaginationProps {
    meta: any;
    params: any;
    pathname: any;
}

export default function PaginationView({ meta, pathname, params }: PaginationProps) {
    const previous = () => {
        var general = {
            page: meta?.current_page - 1
        };
        let query = { ...general, ...params };
        Router.push({ pathname: pathname, query: query });
    };

    const next = () => {
        var general = {
            page: meta?.current_page + 1
        };
        let query = { ...general, ...params };
        Router.push({ pathname: pathname, query: query });
    };

    return (
        <>
            {meta && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button
                            disabled={meta?.current_page <= 1}
                            onClick={previous}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Previous
                        </button>
                        <button
                            disabled={meta?.current_page >= meta?.total_pages}
                            onClick={next}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{meta?.current_page}</span> to{' '}
                                <span className="font-medium">{meta?.total_pages}</span> of{' '}
                                <span className="font-medium">{meta?.total_count}</span> results
                            </p>
                        </div>
                        <div>
                            <nav
                                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                aria-label="Pagination"
                            >
                                <button
                                    disabled={meta?.current_page <= 1}
                                    onClick={previous}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <span className="sr-only">Previous</span>
                                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                                <button
                                    disabled={meta?.current_page >= meta?.total_pages}
                                    onClick={next}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <span className="sr-only">Next</span>
                                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
