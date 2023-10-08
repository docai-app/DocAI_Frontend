import { PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import { useState } from 'react';
import MyModal from '../../../common/Widget/MyModal';
import StatusLabelView from './StatusLabelView';

interface EditStepProps {
    step: any;
    setStep: any;
    setVisibleEditStep: any;
    updateTask: any;
    removeTask: any;
}

export default function EditStepView(props: EditStepProps) {
    const { step, setStep, setVisibleEditStep, updateTask, removeTask } = props;
    const [visableDelete, setVisableDelete] = useState(false);
    // useEffect(() => {
    //     if (step) {
    //         setTask(step)
    //     }
    // }, [step])
    const [isEdit, setIsEdit] = useState(false);
    return (
        <>
            <div className="w-1/3 px-4 items-center">
                <div className="flex justify-between items-center">
                    <label className="text-sm">ID-{step?.id}</label>
                    <div
                        className=" cursor-pointer"
                        onClick={() => {
                            setVisibleEditStep(false);
                        }}
                    >
                        <XMarkIcon className="w-6" />
                    </div>
                </div>
                <div className="my-2 flex flex-row">
                    {isEdit ? (
                        <input
                            className="text-md font-bold border-0 p-2 w-full"
                            type={'text'}
                            defaultValue={step?.name}
                            onChange={(e) => {
                                setStep({
                                    ...step,
                                    name: e.target.value
                                });
                            }}
                            onBlur={() => {
                                setIsEdit(false);
                            }}
                        />
                    ) : (
                        <label className="text-md font-bold">{step?.name}</label>
                    )}
                    <div
                        className=" rounded-sm p-1 hover:bg-gray-200"
                        onClick={() => {
                            setIsEdit(true);
                        }}
                    >
                        <PencilIcon className="w-4" />
                    </div>
                </div>
                <div className="my-2">
                    <div className="flex flex-row items-center">
                        <StatusLabelView status={step?.status} />
                    </div>
                </div>
                <div className="my-2">
                    <label className="text-sm text-gray-700">負責人: 我</label>
                </div>
                <div className=" flex flex-row  ">
                    <div className=" flex justify-left items-center ">
                        <label htmlFor="new-type" className="block text-sm text-gray-700">
                            截止日期:
                        </label>
                    </div>
                    <div className=" ">
                        <input
                            id="type"
                            name="type"
                            type="date"
                            value={moment(step?.deadline).format('YYYY-MM-DD')}
                            className="ml-2 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={async (e) => {
                                setStep({
                                    ...step,
                                    deadline: e.target.value
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="my-2 flex flex-col">
                    <label className="text-sm">描述</label>
                    <textarea
                        className="my-1 text-sm rounded-md min-h-[100px]"
                        placeholder="描述..."
                        value={step?.meta?.description || ''}
                        onChange={(e) => {
                            setStep({
                                ...step,
                                meta: {
                                    ...step.meta,
                                    description: e.target.value
                                }
                            });
                        }}
                    ></textarea>
                    <div className=" flex justify-end">
                        <button
                            className=" rounded-md text-xs px-2 py-1 border bg-blue-500 text-white hover:bg-blue-600"
                            onClick={() => {
                                updateTask(step);
                            }}
                        >
                            保存
                        </button>
                    </div>
                </div>
                <div className="my-2">
                    <p className="text-xs text-gray-400">
                        創建時間: {moment(step?.created_at).format('YYYY-MM-DD HH:mm')}
                    </p>
                    <p className="text-xs text-gray-400">
                        更新日期: {moment(step?.updated_at).format('YYYY-MM-DD HH:mm')}
                    </p>
                </div>
                <div className="my-2 flex justify-end">
                    <button
                        className=" rounded-md text-xs px-2 py-1 border bg-red-500 text-white hover:bg-red-600"
                        onClick={() => {
                            setVisableDelete(true);
                        }}
                    >
                        刪除
                    </button>
                </div>
            </div>

            <MyModal
                visable={visableDelete}
                description={`是否刪除?`}
                cancelClick={() => {
                    setVisableDelete(false);
                }}
                confirmClick={() => {
                    setVisableDelete(false);
                    setVisibleEditStep(false);
                    removeTask();
                }}
            />
        </>
    );
}
