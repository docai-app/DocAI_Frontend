import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';

function UploadView() {
    return (
        <>
            <div className="min-h-full bg-slate-50">
                <header className="shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">文檔分類</h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                            <div className="bg-white border-4 border-dashed border-gray-200 rounded-lg h-80vh" />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default UploadView;
