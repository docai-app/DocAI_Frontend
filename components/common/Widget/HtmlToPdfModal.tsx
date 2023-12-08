/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import copy from 'copy-to-clipboard';
import { Fragment, useRef } from 'react';
import useAlert from '../../../hooks/useAlert';
import BButton from './button/BButton';

export default function HtmlToPdfModal(props: any) {
    const cancelButtonRef = useRef(null);
    const { setAlert } = useAlert();

    return (
        <Transition.Root show={props.visable || false} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={props.cancelClick}
            >
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                        <div className="h-80vh relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-center  transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full  ">
                            <div className="w-full  h-full  flex flex-col">
                                <div className="flex-0 my-2 text-xl">{props.title}</div>
                                <div className="w-full flex-1 overflow-y-auto  break-words text-left p-2">
                                    {props?.description
                                        ?.split('\n')
                                        .map((item: string, index: number) => (
                                            <p key={index}>{item}</p>
                                        ))}
                                </div>
                                <div className="flex-0 w-full justify-center flex flex-row">
                                    <BButton
                                        name="關閉"
                                        bgColor={'bg-red-500 hover:bg-red-700 '}
                                        onClick={props.cancelClick}
                                    />

                                    <BButton
                                        name="Copy"
                                        icon={
                                            <ClipboardDocumentIcon className="h-5 w-5 text-white mr-2" />
                                        }
                                        onClick={() => {
                                            copy(props.description);
                                            setAlert({
                                                title: '已複製到粘貼板',
                                                type: 'success'
                                            });
                                        }}
                                    />
                                    {props?.save && (
                                        <BButton
                                            name="儲存結果"
                                            icon={
                                                <ClipboardDocumentIcon className="h-5 w-5 text-white mr-2" />
                                            }
                                            onClick={() => {
                                                props?.save();
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
