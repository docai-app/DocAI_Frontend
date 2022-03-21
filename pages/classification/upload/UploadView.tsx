import { Fragment, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { useFormik } from 'formik';
import useAxios from 'axios-hooks';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

function UploadView() {
    const [{ data, loading, error, response }, refetch] = useAxios(
        { baseURL: 'http://localhost:8888', url: '/documents/lastest', method: 'GET' },
        { manual: true }
    );
    const formik = useFormik({
        initialValues: {
            document: []
        },
        onSubmit: (values) => {
            console.log(values);
        }
    });
    const handleChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            for (const i of event.target.files) {
                console.log(i);
                formik.setFieldValue('document', event.target.files);
            }
        }
    };
    const fetchData = async () => {
        console.log('Fetch!');
        await refetch();
        console.log(data);
    };
    return (
        <>
            <div className="min-h-full bg-slate-50">
                <header className="shadow bg-white">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">文檔分類</h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                            <p className="text-lg mb-2">上傳文檔</p>
                            <div className="h-70vh flex flex-col justify-center items-center text-gray-500 bg-white border-4 border-dashed border-gray-200 rounded-lg">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-20 w-20 stroke-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                    />
                                </svg>
                                <div className="flex justify-center items-center">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                        <p className="px-4">Select the files</p>
                                        <input
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            className="sr-only"
                                            multiple
                                            onChange={handleChange}
                                        />
                                    </label>
                                    {/* <input type="file" name="FileUpload" id="FileUpload" multiple className='flex justify-center items-center' /> */}
                                </div>
                                <span className="mt-2 block text-sm font-medium">
                                    PNG, JPG, PDF up to 5MB
                                </span>
                                <button
                                    type="button"
                                    className="mt-4 inline-flex items-center px-4 py-1 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => {
                                        formik.handleSubmit();
                                    }}>
                                    Upload Files
                                </button>
                                <button
                                    type="button"
                                    className="mt-4 inline-flex items-center px-4 py-1 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => {
                                        fetchData();
                                    }}>
                                    HiHi
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default UploadView;
