import { Transition, Dialog } from '@headlessui/react';
import { CheckIcon, ExclamationIcon, InformationCircleIcon, XIcon } from '@heroicons/react/outline';
import { useEffect } from 'react';
import { useState } from 'react';
import { Fragment } from 'react';
import useAlert from '../../../hooks/useAlert';

function AlertModel() {
    const alert = useAlert();
    const {
        title,
        type = 'info',
        content,
        confirmText = 'OK',
        cancelText,
        show: alertShow,
        setAlert
    } = alert;
    const [show, setShow] = useState(alertShow);
    useEffect(() => {
        setShow(alertShow);
    }, [alertShow]);
    return (
        <div>
            <Transition.Root show={show} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed z-10 inset-0 overflow-y-auto"
                    onClose={() => setAlert({ ...alert, show: false })}
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                <div>
                                    {type === 'success' ? (
                                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                            <CheckIcon
                                                className="h-6 w-6 text-green-600"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    ) : type === 'warning' ? (
                                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                                            <ExclamationIcon
                                                className="h-6 w-6 text-yellow-600"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    ) : type === 'error' ? (
                                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                            <XIcon
                                                className="h-6 w-6 text-red-600"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    ) : (
                                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                                            <InformationCircleIcon
                                                className="h-6 w-6 text-blue-600"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    )}
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg leading-6 font-medium text-gray-900"
                                        >
                                            {title}
                                        </Dialog.Title>
                                        {content && (
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">{content}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => setAlert({ ...alert, show: false })}
                                        >
                                            {confirmText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
}
export default AlertModel;
