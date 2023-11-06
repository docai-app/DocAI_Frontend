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
    disabled?: boolean;
}

export default function TaskRow(props: TaskRowProps) {
    const {
        task,
        users,
        completeTask,
        updateTask,
        removeTask,
        visiableMore = true,
        showProjectName = false,
        disabled = false
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
        if (task?.assignee?.email) return task?.assignee?.email;
        const assignee = _.find(users, function (user: any) {
            return user.id == task?.assignee_id;
        });
        return assignee?.email || localStorage.getItem('email');
    };

    return (
        <>
            <div className="flex flex-row px-4 py-2 items-start  border rounded-md my-2  w-full ">
                {visiableMore && (
                    <div className=" flex-row items-center">
                        {task?.status == 'completed' && (
                            <input
                                type={'checkbox'}
                                className=" w-4 h-4  mt-1 cursor-pointer "
                                defaultChecked={true}
                                onClick={completeTask}
                                disabled={disabled}
                            />
                        )}
                        {task?.status == 'pending' && (
                            <input
                                type={'radio'}
                                className=" w-4 h-4  mt-1 cursor-pointer "
                                onClick={completeTask}
                                disabled={disabled}
                            />
                        )}
                        {(task?.status == '' || task?.status == null) && (
                            <input
                                type={'radio'}
                                className=" w-4 h-4  mt-1 cursor-pointer"
                                disabled={true}
                            />
                        )}
                    </div>
                )}
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
                    <p
                        className={`text-md ml-2  break-words break-all  text-black ${
                            task?.status == 'completed' ? 'line-through' : ''
                        }`}
                    >
                        {task?.name}
                    </p>
                    {showProjectName && task?.project_workflow?.name && (
                        <>
                            <span className="text-sm font-bold ml-2 ">
                                ({task?.project_workflow?.name})
                            </span>
                        </>
                    )}
                    <div>
                        <span
                            className="text-sm ml-2  text-gray-400  "
                            dangerouslySetInnerHTML={{
                                __html: task?.description
                                // __html: `<a href="http://localhost:8080/form/approval/7f72b9cc-720d-47a8-968b-346c58180d3a?form_schema_id=162e2131-ce6e-48d9-9e07-bbb1efe29651" style="text-decoration: underline">审核</a>`
                            }}
                        ></span>
                    </div>
                    {task?.dag_meta?.dag_id && (
                        <div className="text-gray-400 ml-2">
                            <label>Chain feature: {task?.dag_meta?.dag_name}</label>
                        </div>
                    )}
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
                            is_completed={task?.status == 'completed'}
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
