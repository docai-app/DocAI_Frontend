import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { CalendarIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import moment from 'moment';
import { useCallback, useEffect, useRef, useState } from 'react';
import Dropdowns from './Dropdowns';

interface TaskRowProps {
    task: any;
    users?: [];
    completeTask: any;
    updateTask: any;
    removeTask: any;
    visiableMore?: boolean;
    showProjectName?: boolean;
}

export default function TaskRow(props: TaskRowProps) {
    const {
        task,
        users,
        completeTask,
        updateTask,
        removeTask,
        visiableMore = true,
        showProjectName = false
    } = props;
    const [visiable, setVisiable] = useState(false);
    const [overflow, setOverflow] = useState(false);
    const content = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setVisiable(visiableMore);
    }, [visiableMore]);
    function useWinSize() {
        const [size, setSize] = useState({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        });

        const onResize = useCallback(() => {
            setSize({
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            });
        }, []);
        useEffect(() => {
            window.addEventListener('resize', onResize);
            return () => {
                window.removeEventListener('resize', onResize);
            };
        }, []);

        return size;
    }

    const size = useWinSize();

    useEffect(() => {
        if (content.current) {
            setOverflow(content.current.scrollWidth > content.current.clientWidth);
        }
    }, [size]);

    const getAssigneeName = () => {
        if (task?.assignee?.nickname) return task?.assignee?.nickname;
        const assignee = _.find(users, function (user: any) {
            return user.id == task?.assignee_id;
        });
        return assignee?.nickname;
    };

    return (
        <>
            <div className="flex flex-row px-4 py-2 items-start cursor-pointer  border rounded-md my-2  w-full ">
                {visiableMore &&
                    <div className=" flex-row items-center">
                        {task?.status == 'completed' && (
                            <input
                                type={'checkbox'}
                                className=" w-4 h-4  mt-1 cursor-pointer "
                                defaultChecked={true}
                                disabled={true}
                            />
                        )}
                        {task?.status == 'pending' && (
                            <input
                                type={'radio'}
                                className=" w-4 h-4  mt-1 cursor-pointer "
                                onClick={completeTask}
                            />
                        )}
                        {(task?.status == '' || task?.status == null) && (
                            <input
                                type={'radio'}
                                className=" w-4 h-4  mt-1 cursor-pointer "
                                disabled={true}
                            />
                        )}
                    </div>
                }
                <div
                    ref={content}
                    className={
                        visiable
                            ? `ml-2 break-words break-all`
                            : `ml-2  overflow-hidden text-ellipsis whitespace-nowrap `
                    }
                    onClick={() => {
                        setVisiable(!visiable);
                    }}
                >
                    <span className={`text-md ml-2  break-words break-all  text-black `}>
                        {task?.name}
                    </span>
                    {showProjectName && task?.project_workflow?.name && (
                        <>
                            <br />
                            <span className="text-sm font-bold ml-2 ">
                                ({task?.project_workflow?.name})
                            </span>
                        </>
                    )}
                    <br />
                    <span className="text-sm ml-2  text-gray-400 ">{task?.description}</span>
                    <div className="flex flex-row ml-2 items-center">
                        <label className=" text-blue-500">@{getAssigneeName()}</label>
                        {task?.deadline && (
                            <div className="flex flex-row ml-4">
                                <CalendarIcon className="w-4 text-yellow-400" />
                                <p className="text-sm ml-2   text-yellow-400 ">
                                    {moment(task?.deadline).format('YYYY-MM-DD')}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className=" flex flex-1 ml-2 items-end justify-end ">
                    {visiable && overflow ? (
                        <ChevronUpIcon
                            className="w-5 h-5 mx-2 text-gray-500 "
                            onClick={() => {
                                setVisiable(!visiable);
                            }}
                        />
                    ) : overflow ? (
                        <ChevronDownIcon
                            className="w-5 h-5 mx-2 text-gray-500 "
                            onClick={() => {
                                setVisiable(!visiable);
                            }}
                        />
                    ) : null}
                    {visiableMore && (
                        <Dropdowns
                            type={'type'}
                            is_completed={task?.is_completed}
                            rename={updateTask}
                            remove={removeTask}
                            move={() => {
                                alert('新功能開發中，敬請期待！');
                            }}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
