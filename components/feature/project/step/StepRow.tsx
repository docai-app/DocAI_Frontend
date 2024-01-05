import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import StatusLabelView from './StatusLabelView';

interface TaskRowProps {
    task: any;
    currentTask: any;
    completeTask: any;
    updateTask: any;
    removeTask: any;
}

export default function StepRow(props: TaskRowProps) {
    const { task, currentTask, completeTask, updateTask, removeTask } = props;
    const statusDatas = [
        {
            name: '待辦',
            value: 'pending'
        },
        {
            name: '進行中',
            value: 'running'
        },
        {
            name: '完成',
            value: 'completed'
        },
        {
            name: '失敗',
            value: 'failed'
        }
    ];
    const [status, setStatus] = useState(statusDatas[0].name);
    const onSwitchStatus = (status: any) => {
        setStatus(status.name);
        // setCurrentStatus(status.value);
    };

    const [visable, setVisable] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const onMouseEnter = () => {
        setVisable(true);
    };
    const onMouseLeave = () => {
        setVisable(false);
    };

    const handleStepStatus = () => {
        if (task.status == 'completed') {
            task.status = 'pending';
        } else if (task.status == 'pending') {
            task.status = 'completed';
        }
        updateTask(task);
    };

    return (
        <>
            <div
                className={`flex flex-row px-4 h-10 items-center justify-between cursor-pointer  border-b  w-full hover:bg-gray-100 ${
                    currentTask && currentTask.id == task.id
                        ? 'bg-blue-100 border-l-4 border-l-blue-500'
                        : ''
                } `}
                onMouseEnter={() => {
                    onMouseEnter();
                }}
                onMouseLeave={() => {
                    onMouseLeave();
                }}
            >
                <div className="flex  flex-row items-center flex-1">
                    <div className="w-4">
                        {visable && (
                            <input
                                type={'checkbox'}
                                className=" w-3 h-3 cursor-pointer "
                                onClick={() => {
                                    handleStepStatus();
                                }}
                            />
                        )}
                    </div>
                    {isEdit ? (
                        <input
                            className="text-sm border-0 p-2 mx-2 w-full"
                            type={'text'}
                            defaultValue={task?.name}
                            onChange={() => {}}
                            onBlur={() => {
                                setIsEdit(false);
                            }}
                        />
                    ) : (
                        <span className="text-sm mx-2 hover:underline">{task?.name}</span>
                    )}
                    {/* {visable && !isEdit &&
                        <div className=' rounded-sm p-1 hover:bg-gray-200'
                            onClick={() => {
                            }}>
                            <PencilIcon className='w-4' />
                        </div>
                    } */}
                </div>
                <div className="flex flex-row items-center">
                    {/* <span className='text-xs mx-2 hover:bg-blue-400 text-blue-900 bg-blue-300 px-1 py-0 rounded-sm'>{task?.name}</span> */}
                    {/* <Dropdowns /> */}
                    <StatusLabelView status={task?.status} />
                    <UserCircleIcon className="mx-2 w-6 h-6 hover:text-gray-500" />
                </div>
            </div>
        </>
    );
}
