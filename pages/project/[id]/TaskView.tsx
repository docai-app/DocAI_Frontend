import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import OGView from '../../../components/common/Widget/OGView';
import Progress from '../../../components/common/Widget/Progress';
import EditTaskModal from '../../../components/feature/project/task/EditTaskModal';
import TaskRow from '../../../components/feature/project/task/TaskRow';

interface TaskViewProps {
    project: any;
    tasks: any;
    documentPath: { id: string | null; name: string }[];
    updateLocalData: any;
    addNewTaskHandler: any;
    updateTaskHandler: any;
    removeTaskHandler: any;
}

function TaskView(props: TaskViewProps) {
    const {
        project = null,
        tasks = null,
        documentPath,
        updateLocalData,
        addNewTaskHandler,
        updateTaskHandler,
        removeTaskHandler
    } = props;
    const [mode, setMode] = useState('');
    const [currentTask, setCurrentTask] = useState<any>(null);
    const route = useRouter();
    return (
        <>
            <div className="w-full mx-auto h-[calc(100vh-18.5rem)] px-1 sm:px-0 lg:px-8 mb-6">
                <header className="shadow bg-white   w-full z-20">
                    <div className=" py-2 px-4 sm:px-6 sm:py-4 lg:px-8 lg:py-6  flex justify-between">
                        <div className="flex flex-row items-center">
                            <ChevronLeftIcon
                                className="w-8 h-8 mr-2 text-gray-500 hover:bg-slate-50 cursor-pointer"
                                onClick={() => {
                                    Router.back();
                                }}
                            />
                            <h1 className="text-md font-bold text-gray-900">{project?.name}</h1>
                        </div>

                        {/* <button
                            className="relative inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => {
                                setMode('add');
                                setCurrentTask(null);
                            }}
                        >
                            新增
                        </button> */}
                    </div>
                </header>
                <div className="flex w-full flex-col  mt-2">
                    <p className="text-sm flex flex-0 mr-4">項目進度</p>
                    <div className="flex flex-1">
                        <Progress value={project?.progress} />
                    </div>
                </div>
                <div className="flex w-full">
                    <p className="text-sm text-gray-400">{project?.description || ''}</p>
                </div>
                <div className="flex flex-row items-center my-2 justify-between">
                    <p className="border-l-4 pl-2 border-l-gray-500">任務</p>
                    <button
                        className="relative inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => {
                            setMode('add');
                            setCurrentTask(null);
                        }}
                    >
                        新增
                    </button>
                </div>
                <div className="mt-4">
                    {tasks
                        ?.sort((a: any, b: any) => (a.is_completed > b.is_completed ? 1 : -1))
                        .map((task: any, index: number) => {
                            return (
                                <TaskRow
                                    key={index}
                                    task={task}
                                    completeTask={(data: any) => {
                                        updateLocalData();
                                        updateTaskHandler(data);
                                    }}
                                    updateTask={() => {
                                        updateLocalData();
                                        setMode('edit');
                                        setCurrentTask(task);
                                    }}
                                    removeTask={() => removeTaskHandler(task.id)}
                                />
                            );
                        })}
                </div>
                <div className="py-4">
                    {project && (
                        <OGView
                            title={project?.name}
                            description={project?.description}
                            documentPath={documentPath}
                            url={`/drive/${project?.folder_id}?name=${project?.folder?.name || ''}`}
                        />
                    )}
                </div>
            </div>
            <EditTaskModal
                visable={mode != ''}
                task={currentTask}
                cancelClick={() => {
                    setMode('');
                    setCurrentTask(null);
                }}
                confirmClick={(data: any) => {
                    // setMode('');
                    setCurrentTask(null);
                    if (mode == 'add') addNewTaskHandler(data);
                    else if (mode == 'edit') {
                        if (currentTask != null) {
                            currentTask.title = data.title;
                        }
                        updateLocalData();
                        updateTaskHandler(data);
                    }
                }}
            />
        </>
    );
}
export default TaskView;
