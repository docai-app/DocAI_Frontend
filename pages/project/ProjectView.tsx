import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { PlusIcon } from '@heroicons/react/24/outline';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Folder } from '../../components/common/Widget/FolderTree';
import FolderTreeForSelect from '../../components/common/Widget/FolderTreeForSelect';
import MyDateDropdown from '../../components/common/Widget/MyDateDropdown';
import PaginationView from '../../components/common/Widget/PaginationView';
import SingleActionModel from '../../components/common/Widget/SingleActionModel';
import ProjectItem from '../../components/feature/project/ProjectItem';
import StepsListView from '../../components/feature/project/step/StepsListView';
import EditTaskModal from '../../components/feature/project/task/EditTaskModal';

interface ProjectViewProps {
    id: string | string[] | null | undefined;
    projects: any;
    meta: any;
    metaSteps: any;
    currentStatus: string;
    setCurrentStatus: any;
    open: boolean;
    setOpen: any;
    tasks: [];
    setTasks: any;
    addProjectStepHandler: any;
    users: [];
    chain_features: [];
}

function ProjectView(props: ProjectViewProps) {
    const {
        id = null,
        projects = null,
        meta,
        metaSteps,
        setCurrentStatus,
        open,
        setOpen,
        tasks,
        setTasks,
        addProjectStepHandler,
        users,
        chain_features
    } = props;
    const [visiable, setVisiable] = useState(false);
    const [dest, setDest] = useState<Folder | null>(null);
    const [currentTypeTab, setCurrentTypeTab] = useState<'tasks' | 'project_workflow'>('tasks');
    const statusDatas = [
        {
            name: '全部',
            value: 'all'
        },
        {
            name: '未完成',
            value: 'unfinish'
        },
        {
            name: '完成',
            value: 'finish'
        }
    ];
    const [status, setStatus] = useState(statusDatas[0].name);
    const onSwitchStatus = (status: any) => {
        setStatus(status.name);
        setCurrentStatus(status.value);
    };

    const [mode, setMode] = useState<'add' | 'edit' | ''>('');
    const [currentTask, setCurrentTask] = useState<any>(null);
    const [currectPosition, setCurrectPosition] = useState(-1);

    const [project, setProject] = useState({
        id: null,
        name: '',
        description: '',
        deadline_at: ''
    });

    const handleClickAdd = () => {
        if (currentTypeTab == 'tasks') {
            setMode('add');
        } else {
            Router.push({ pathname: '/project/select' });
        }
    };

    useEffect(() => {
        if (dest?.id) {
            setVisiable(true);
            console.log(dest);
        }
    }, [dest]);

    return (
        <>
            <SingleActionModel
                open={open}
                setOpen={setOpen}
                title={'進行中......'}
                content={'正在加載數據...'}
                icon={<PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />}
            />
            <div className="max-w-7xl mx-auto h-[calc(100vh-18.5rem)] px-4 py-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            待辦事項與工作流
                        </h2>
                    </div>
                </div>
                <div className="mt-4 pb-4">
                    <div className="flex flex-row justify-between items-center  py-2">
                        <ul className="flex flex-row -my-px">
                            <li
                                onClick={() => setCurrentTypeTab('tasks')}
                                className={`p-4 cursor-pointer ${currentTypeTab === 'tasks'
                                        ? 'text-indigo-700 border-b-2 border-indigo-700'
                                        : 'text-gray-400'
                                    } font-bold text-sm`}
                            >
                                待辦事項
                            </li>
                            <li
                                onClick={() => setCurrentTypeTab('project_workflow')}
                                className={`p-4 cursor-pointer ${currentTypeTab === 'project_workflow'
                                        ? 'text-indigo-700 border-b-2 border-indigo-700'
                                        : 'text-gray-400'
                                    } font-bold text-sm`}
                            >
                                工作流
                            </li>
                        </ul>

                        <button
                            type="button"
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => {
                                handleClickAdd();
                            }}
                        >
                            <PlusIcon className="h-4" />
                            <span>新增</span>
                        </button>
                    </div>
                    <div className="my-2 hidden">
                        <MyDateDropdown
                            value={status}
                            datas={statusDatas}
                            onSwitch={onSwitchStatus}
                        />
                    </div>
                    {currentTypeTab == 'tasks' && (
                        <div className="mt-0 rounded-lg">
                            <StepsListView
                                tasks={tasks}
                                setTasks={setTasks}
                                users={users}
                                showArrow={false}
                                showProjectName={true}
                            />
                            <PaginationView meta={metaSteps} pathname={'/project'} params={null} />
                        </div>
                    )}
                    {currentTypeTab == 'project_workflow' && (
                        <div>
                            <ProjectItem
                                projects={projects}
                                setVisiable={setVisiable}
                                setProject={setProject}
                            />
                            <PaginationView meta={meta} pathname={'/project'} params={null} />
                        </div>
                    )}
                </div>
                {/* <PaginationView meta={meta} pathname={'/project'} params={null} /> */}
            </div>

            <EditTaskModal
                title={currentTask ? '編輯任務' : '新增任務'}
                users={users}
                chain_features={chain_features}
                visable={mode != ''}
                task={currentTask}
                cancelClick={() => {
                    setMode('');
                    setCurrentTask(null);
                }}
                confirmClick={(data: never) => {
                    setMode('');
                    setCurrentTask(null);
                    addProjectStepHandler(data);
                }}
            />

            <FolderTreeForSelect
                {...{
                    mode,
                    setMode,
                    dest,
                    setDest,
                    targetId: ''
                }}
            />
        </>
    );
}
export default ProjectView;
