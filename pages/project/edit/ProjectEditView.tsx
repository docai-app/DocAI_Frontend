import { ArrowLongDownIcon, PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { PlusIcon } from '@heroicons/react/24/outline';
import Router from 'next/router';
import { useState } from 'react';
import Api from '../../../apis';
import DocumentPath from '../../../components/common/Widget/DocumentPath';
import SingleActionModel from '../../../components/common/Widget/SingleActionModel';
import EditTaskModal from '../../../components/feature/project/task/EditTaskModal';
import TaskRow from '../../../components/feature/project/task/TaskRow';

const apiSetting = new Api();
interface ProjectViewProps {
    project: any;
    setProject: any;
    addNewProjectHeadler: any;
    updateProjectHandler: any;
    open: boolean;
    setOpen: any;
}

function ProjectEditView(props: ProjectViewProps) {
    const { project, setProject, addNewProjectHeadler, updateProjectHandler, open, setOpen } =
        props;

    const [target_folder_id, set_target_folder_id] = useState('');
    const [mode, setMode] = useState<'add' | 'edit' | ''>('');
    const [currentTask, setCurrentTask] = useState<any>(null);
    const [currectPosition, setCurrectPosition] = useState(-1);
    const [tasks, setTasks] = useState<any>([]);
    const methods = [
        { id: 'undepend', title: '不依賴' },
        { id: 'depend', title: '依賴' }
    ];

    const removeTask = (position: number) => {
        tasks.splice(position, 1);
        updateLocalData();
    };

    const updateLocalData = () => {
        const newTasks = [...tasks];
        setTasks(newTasks);
    };

    const updateTask = (task: any, position: number) => {
        setMode('edit');
        setCurrentTask(task);
        setCurrectPosition(position);
    };

    const handleBack = () => {
        Router.back();
    };

    const handleSave = () => {
        addNewProjectHeadler(project);
    };

    return (
        <>
            <SingleActionModel
                {...{
                    open,
                    setOpen,
                    title: '進行中......',
                    content: '正在保存數據',
                    icon: (
                        <PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    )
                }}
            />
            <div className="max-w-7xl mx-auto h-50vh px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto my-8 h-auto flex justify-center items-center">
                    <div className="w-full mx-auto text-center">
                        <h1 className="text-4xl  text-gray-900 sm:text-5xl mb-2">
                            Workflow Builder
                        </h1>
                    </div>
                </div>
                <div className="my-2 flex justify-between">
                    <button
                        type="button"
                        className="rounded-md bg-blue-500 text-white py-2 px-4 shadow text-sm"
                        onClick={handleBack}
                    >
                        返回
                    </button>
                    <button
                        type="button"
                        className="rounded-md bg-blue-500 text-white py-2 px-4 shadow text-sm"
                        onClick={handleSave}
                    >
                        發佈
                    </button>
                </div>
                <div className="w-full items-center flex justify-center  mt-4">
                    <div className="w-3/4">
                        <div className="my-2">
                            <label>名稱: </label>
                            <input
                                type={'text'}
                                className="block w-full rounded-md border-0 py-2 pl-4   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="名稱..."
                                defaultValue={project?.name}
                                onChange={(e) => {
                                    setProject({
                                        ...project,
                                        name: e.target.value
                                    });
                                }}
                            />
                        </div>
                        <div className="my-2">
                            <label>描述:</label>
                            <textarea
                                className="block w-full rounded-md border-0 py-2 pl-4   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="描述..."
                                defaultValue={project?.meta?.description}
                                onChange={(e) => {
                                    setProject({
                                        ...project,
                                        meta: {
                                            ...project.meta,
                                            description: e.target.value
                                        }
                                    });
                                }}
                            />
                        </div>
                        <DocumentPath
                            modeType={'move'}
                            target_folder_id={target_folder_id}
                            set_target_folder_id={set_target_folder_id}
                        />
                        <div className="my-2">
                            <label>任務關係:</label>
                            <div className=" mt-2 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                                {methods.map((method) => (
                                    <div key={method.id} className="flex items-center">
                                        <input
                                            id={method.id}
                                            name="method"
                                            type="radio"
                                            defaultChecked={method.id === 'undepend'}
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                        />
                                        <label
                                            htmlFor={method.id}
                                            className="ml-3 block text-sm font-medium text-gray-700"
                                        >
                                            {method.title}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="my-2 flex justify-end">
                            <button
                                type="button"
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={() => {
                                    setMode('add');
                                }}
                            >
                                <PlusIcon className="h-4" />
                                <span>新增</span>
                            </button>
                        </div>
                        <div className="my-2">
                            {tasks?.map((task: any, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col justify-center items-center"
                                    >
                                        <TaskRow
                                            task={task}
                                            completeTask={() => {}}
                                            updateTask={() => updateTask(task, index)}
                                            removeTask={removeTask}
                                        />
                                        {index != tasks.length - 1 && (
                                            // <div className='h-6 w-0.5 bg-gray-500'></div>
                                            <ArrowLongDownIcon className="  h-6 text-gray-500  " />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <EditTaskModal
                visable={mode != ''}
                task={currentTask}
                cancelClick={() => {
                    setMode('');
                    setCurrentTask(null);
                }}
                confirmClick={(data: never) => {
                    setMode('');
                    setCurrentTask(null);
                    if (mode == 'add') setTasks((arr: any) => [...arr, data]);
                    else if (mode == 'edit') {
                        tasks.splice(currectPosition, 1, data);
                        updateLocalData();
                    }
                }}
            />
        </>
    );
}
export default ProjectEditView;
