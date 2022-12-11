import { ChevronLeftIcon } from '@heroicons/react/solid';
import Router from 'next/router';
import { useState } from 'react';
import Progress from '../../../components/common/Widget/Progress';
import EditTaskModal from '../../../components/feature/project/task/EditTaskModal';
import TaskRow from '../../../components/feature/project/task/TaskRow';

interface TaskViewProps {
    project: any;
    tasks: any;
    updateLocalData: any;
    addNewTaskHandler: any;
    updateTaskHandler: any;
    removeTaskHandler: any;
}

function TaskView(props: TaskViewProps) {
    const {
        project = null,
        tasks = null,
        updateLocalData,
        addNewTaskHandler,
        updateTaskHandler,
        removeTaskHandler
    } = props;
    const [mode, setMode] = useState('');
    const [currentTask, setCurrentTask] = useState<any>(null)
    return (
        <>
            <div className="w-full mx-auto h-[calc(100vh-18.5rem)] px-1 sm:px-0 lg:px-8 mb-6">
                <header className="shadow bg-white   w-full z-20">
                    <div className=" py-2 px-4 sm:px-6 sm:py-4 lg:px-8 lg:py-6  flex justify-between">
                        <div className="flex flex-row items-center">
                            <ChevronLeftIcon className="w-8 h-8 mr-2 text-gray-500 hover:bg-slate-50 cursor-pointer"
                                onClick={() => {
                                    Router.back()
                                }} />
                            <h1 className="text-md font-bold text-gray-900">{project?.name}</h1>
                        </div>

                        <button
                            className="relative inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => {
                                setMode('add');
                                setCurrentTask(null);
                            }}>
                            新增
                        </button>
                    </div>
                </header>
                <div className="flex w-full" >
                    <Progress value={project?.progress} />
                </div>
                <div className="mt-4">
                    {tasks?.sort((a: any, b: any) => a.created_at > b.created_at ? 1 : -1).map((task: any, index: number) => {
                        return (
                            <TaskRow
                                key={index}
                                task={task}
                                completeTask={(data: any) => { updateLocalData(); updateTaskHandler(data) }}
                                updateTask={() => { updateLocalData(); setMode('edit'); setCurrentTask(task) }}
                                removeTask={() => removeTaskHandler(task.id)}
                            />
                        )
                    })}
                </div>
                <div className="mt-4">

                </div>
            </div>
            <EditTaskModal
                visable={mode != ''}
                task={currentTask}
                cancelClick={() => { setMode(''); setCurrentTask(null) }}
                confirmClick={(data: any) => {
                    setMode('');
                    setCurrentTask(null);
                    if (mode == 'add')
                        addNewTaskHandler(data)
                    else if (mode == 'edit') {
                        if (currentTask != null) {
                            currentTask.title = data.title
                        }
                        updateLocalData();
                        updateTaskHandler(data);
                    }
                }}
            />
        </>
    )
}
export default TaskView;
