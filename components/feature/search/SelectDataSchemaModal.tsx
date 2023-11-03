import { Dialog, Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import useAxios from 'axios-hooks';
import Router, { useRouter } from 'next/router';
import { Fragment, useEffect, useRef, useState } from 'react';
import Api from '../../../apis';
import useAlert from '../../../hooks/useAlert';

interface Props {
    open: boolean;
    setOpen: any;
    document_id: string;
}
const apiSetting = new Api();
export default function SelectDataSchemaModal(props: Props) {
    const { open, setOpen, document_id } = props;
    const cancelButtonRef = useRef(null);
    const router = useRouter();
    const { setAlert } = useAlert();
    const [smart_extraction_schemas, set_smart_extraction_schemas] = useState([]);
    const [select_schema_id, set_select_schema_id] = useState('');

    const [{ data: getSmartExtractionSchemasData, loading: loading }, getSmartExtractionSchemas] =
        useAxios(apiSetting.SmartExtractionSchemas.getSmartExtractionSchemas('false', 1), {
            manual: true
        });

    const [
        { data: updateSchemasByDocuemntsByIdData, loading: updateSchemasByDocuemntsByIdLoading },
        updateSchemasByDocuemntsById
    ] = useAxios(apiSetting.SmartExtractionSchemas.updateSchemasByDocuemntsById(''), {
        manual: true
    });

    useEffect(() => {
        getSmartExtractionSchemas();
    }, [router]);

    useEffect(() => {
        if (getSmartExtractionSchemasData && getSmartExtractionSchemasData.success) {
            set_smart_extraction_schemas(getSmartExtractionSchemasData.smart_extraction_schemas);
        }
    }, [getSmartExtractionSchemasData]);

    useEffect(() => {
        if (updateSchemasByDocuemntsByIdData && updateSchemasByDocuemntsByIdData.success) {
            setAlert({ title: '添加成功', type: 'success' });
            console.log('getSmartExtractionSchemasData', updateSchemasByDocuemntsByIdData);
        } else if (updateSchemasByDocuemntsByIdData && !updateSchemasByDocuemntsByIdData.success) {
            setAlert({ title: '添加失敗', type: 'error' });
            console.log('getSmartExtractionSchemasData', updateSchemasByDocuemntsByIdData);
        }
    }, [updateSchemasByDocuemntsByIdData]);

    const addDocumentToSchema = () => {
        if (!select_schema_id) return;
        // console.log(select_schema_id);
        // console.log(document_id);
        setOpen(false);
        updateSchemasByDocuemntsById({
            ...apiSetting.SmartExtractionSchemas.updateSchemasByDocuemntsById(select_schema_id),
            data: {
                document_ids: [document_id]
            }
        });
    };

    const add = () => {
        Router.push({ pathname: '/document/extraction/documents/schema' });
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={setOpen}
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
                        <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <InformationCircleIcon
                                        className="h-6 w-6 text-sky-600"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg leading-6 font-medium text-gray-900"
                                    >
                                        選擇數據總表{' '}
                                        {loading && (
                                            <label className="text-blue-500 text-sm">
                                                {' '}
                                                正在加載中...
                                            </label>
                                        )}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div className="w-full">
                                            <label
                                                htmlFor="new-type"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                選擇現有的數據總表
                                            </label>
                                            <div className="flex mt-1">
                                                <select
                                                    id="new-type"
                                                    name="new-type"
                                                    defaultValue={''}
                                                    className="mt-1 w-full block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                    onChange={(e) => {
                                                        set_select_schema_id(e.target.value);
                                                    }}
                                                >
                                                    <option value="" disabled hidden>
                                                        請選擇數據總表
                                                    </option>
                                                    {smart_extraction_schemas?.map((item: any) => {
                                                        return (
                                                            <option key={item.id} value={item.id}>
                                                                {item.name}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <div className="w-full">
                                            <label
                                                htmlFor="type"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                若找不到數據總表,可以建立新數據總表
                                            </label>
                                            <div className="flex mt-1">
                                                <button
                                                    type="submit"
                                                    className="min-w-fit ml-0 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    onClick={() => add()}
                                                >
                                                    新增數據總表
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => addDocumentToSchema()}
                                >
                                    確認
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick={() => setOpen(false)}
                                    ref={cancelButtonRef}
                                >
                                    取消
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
