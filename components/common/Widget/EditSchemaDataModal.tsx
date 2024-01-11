/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import _ from 'lodash';
import { Fragment, useEffect, useRef, useState } from 'react';
import useAlert from '../../../hooks/useAlert';
import MyDateDropdown from './MyDateDropdown';

export default function EditSchemaDataModal(props: any) {
    const cancelButtonRef = useRef(null);
    const [validate, setValidate] = useState(true);
    const [title, setTitle] = useState('數值');
    const { setAlert } = useAlert();

    const [data, setData] = useState<any>();

    useEffect(() => {
        setData({
            key: '',
            data_type: 'string',
            query: props?.accurateMode ? ['', ''] : ''
        });
    }, []);

    const data_types = [
        {
            name: '數值',
            value: 'string'
        },
        {
            name: '日期',
            value: 'date'
        },
        {
            name: '數字',
            value: 'number'
        }
    ];
    function findNameByValue(value: string) {
        if (_.isEmpty(value)) return '';
        const dataType = data_types.find((item) => item.value === value);
        return dataType ? dataType.name : '';
    }
    useEffect(() => {
        if (props?.extractSchema) {
            setData(props?.extractSchema);
            setTitle(findNameByValue(props?.extractSchema?.data_type));
        }
    }, [props?.extractSchema]);

    const onSwitch = (data_type: any) => {
        setData({
            ...data,
            data_type: data_type.value
        });
        setTitle(data_type.name);
    };

    const validateInput = (input: string) => {
        const pattern = /^[a-z_]+$/;
        const validate = pattern.test(input);
        setValidate(validate);
        return validate;
    };

    const validateForm = () => {
        if (!data?.key) {
            setAlert({ title: '請填寫 Column Name !', type: 'info' });
            return;
        }
        if (!data?.query) {
            setAlert({ title: '請填寫 Prompt !', type: 'info' });
            return;
        }
        props.confirmClick(data);
        setData({
            ...data,
            key: '',
            query: props?.accurateMode ? ['', ''] : ''
        });
    };

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
                        <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="sm:flex sm:items-center justify-center">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <div className="mt-2">
                                        <p className="text-xl text-black">{'編輯'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-4 ">
                                <div className="flex items-center">
                                    <label className="text-sm w-1/4"> Column Name:</label>
                                    <div className="w-3/4 ml-4 ">
                                        <input
                                            type={'text'}
                                            name="signature"
                                            className="w-full rounded-md border-gray-400 "
                                            placeholder="name"
                                            defaultValue={data?.key}
                                            onChange={(e) => {
                                                if (validateInput(e.target.value))
                                                    setData({
                                                        ...data,
                                                        key: e.target.value
                                                    });
                                            }}
                                        ></input>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <label className="text-sm w-1/4"> {''}</label>
                                    <div className="w-3/4 ml-4 ">
                                        <label
                                            className={`flex justify-start text-sm ${
                                                validate ? 'text-gray-400 ' : 'text-red-500'
                                            }`}
                                        >
                                            *只可以輸入小寫英文字母,不可以輸入中文,除了底線"_"外
                                        </label>
                                    </div>
                                </div>
                                <div className="flex items-center mt-4">
                                    <label className="text-sm w-1/4"> Data Type:</label>
                                    <div className="w-3/4 ml-4 ">
                                        <MyDateDropdown
                                            style={'w-full'}
                                            value={title || '-- 請選擇 --'}
                                            datas={data_types}
                                            onSwitch={onSwitch}
                                        />
                                        <label className="flex justify-start text-sm"></label>
                                    </div>
                                </div>
                                {props?.accurateMode ? (
                                    <>
                                        <div className="flex items-center mt-2">
                                            <label className="text-sm w-1/4"> 主力Prompt:</label>
                                            <div className="w-3/4 ml-4 ">
                                                <input
                                                    type={'text'}
                                                    name="signature"
                                                    className="w-full rounded-md border-gray-400 "
                                                    placeholder="員工姓名"
                                                    defaultValue={data?.query[0]}
                                                    onChange={(e) => {
                                                        setData({
                                                            ...data,
                                                            query: [e.target.value, data?.query[1]]
                                                        });
                                                    }}
                                                ></input>
                                                <label className="flex justify-start text-sm"></label>
                                            </div>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <label className="text-sm w-1/4"> 辅助Prompt:</label>
                                            <div className="w-3/4 ml-4 ">
                                                <input
                                                    type={'text'}
                                                    name="signature"
                                                    className="w-full rounded-md border-gray-400 "
                                                    placeholder="員工姓名"
                                                    defaultValue={data?.query[1]}
                                                    onChange={(e) => {
                                                        setData({
                                                            ...data,
                                                            query: [data?.query[0], e.target.value]
                                                        });
                                                    }}
                                                ></input>
                                                <label className="flex justify-start text-sm"></label>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex items-center mt-2">
                                        <label className="text-sm w-1/4"> Prompt:</label>
                                        <div className="w-3/4 ml-4 ">
                                            <input
                                                type={'text'}
                                                name="signature"
                                                className="w-full rounded-md border-gray-400 "
                                                placeholder="員工姓名"
                                                defaultValue={data?.query}
                                                onChange={(e) => {
                                                    setData({
                                                        ...data,
                                                        query: e.target.value
                                                    });
                                                }}
                                            ></input>
                                            <label className="flex justify-start text-sm"></label>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse justify-center">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => {
                                        validateForm();
                                    }}
                                >
                                    {props.confirmText || '確認'}
                                </button>

                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:white sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick={() => {
                                        props.cancelClick();
                                    }}
                                    ref={cancelButtonRef}
                                >
                                    {props.cancelText || '取消'}
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
