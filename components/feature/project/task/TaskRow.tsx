import { CheckCircleIcon } from '@heroicons/react/outline';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { useCallback, useEffect, useRef, useState } from 'react';
import Dropdowns from './Dropdowns';

interface TaskRowProps {
    task: any;
    completeTask: any;
    updateTask: any;
    removeTask: any;
}

export default function TaskRow(props: TaskRowProps) {
    const { task, completeTask, updateTask, removeTask } = props;
    const [visiable, setVisiable] = useState(false);
    const [overflow, setOverflow] = useState(false);
    const content = useRef<HTMLDivElement>(null);

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

    return (
        <>
            <div className="flex flex-row px-4 py-2 items-start cursor-pointer   w-full ">
                <div className="  flex-row items-start">
                    {task?.is_completed ? (
                        <CheckCircleIcon className="w-5 h-5 mt-1 text-gray-500" />
                    ) : (
                        <input
                            type={'radio'}
                            className=" w-5 h-5  mt-1 cursor-pointer "
                            onClick={() => {
                                task.is_completed = true;
                                completeTask({
                                    id: task?.id,
                                    is_completed: true
                                });
                            }}
                        />
                    )}
                </div>
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
                    <span
                        className={`text-md ml-2  text-black break-words break-all ${
                            task?.is_completed ? 'line-through text-gray-500 ' : ''
                        }`}
                    >
                        {task?.title}
                    </span>
                    <br />
                    <span className="text-sm ml-2  text-gray-400 ">{task?.description}</span>
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
                    <Dropdowns
                        type={'type'}
                        is_completed={task?.is_completed}
                        rename={updateTask}
                        remove={removeTask}
                        move={() => {
                            alert('未做');
                        }}
                    />
                </div>
            </div>
        </>
    );
}
