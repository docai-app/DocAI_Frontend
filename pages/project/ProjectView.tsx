import { PlusIcon } from '@heroicons/react/24/outline';
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
import { withTheme } from '@rjsf/core';
import { useEffect, useState } from 'react';
import { Folder } from '../../components/common/Widget/FolderTree';
import FolderTreeForSelect from '../../components/common/Widget/FolderTreeForSelect';
import MyDateDropdown from '../../components/common/Widget/MyDateDropdown';
import PaginationView from '../../components/common/Widget/PaginationView';
import EditProjectModal from '../../components/feature/project/EditProjectModal';
import ProjectItem from '../../components/feature/project/ProjectItem';

const Form = withTheme(Bootstrap4Theme);

interface ProjectViewProps {
    id: string | string[] | null | undefined;
    name: string | string[] | null | undefined;
    showAllItemsData: any;
    projects: any;
    meta: any;
    currentStatus: string;
    setCurrentStatus: any;
    addNewProjectHeadler: any;
    updateProjectHandler: any;
}

function ProjectView(props: ProjectViewProps) {
    const {
        id = null,
        name = 'Root',
        showAllItemsData = null,
        projects = null,
        meta,
        currentStatus,
        setCurrentStatus,
        addNewProjectHeadler,
        updateProjectHandler
    } = props;
    const [visiable, setVisiable] = useState(false);
    const [mode, setMode] = useState('');
    const [movingDest, setMovingDest] = useState<Folder | null>(null);
    const dates = [
        {
            name: '最近三天',
            value: '3'
        },
        {
            name: '最近一周',
            value: '7'
        },
        {
            name: '最近一個月',
            value: '30'
        },
        {
            name: '最近三個月',
            value: '90'
        },
        {
            name: '最近半年',
            value: '180'
        }
    ];
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
    const [date, setDate] = useState(dates[0].name);
    const [status, setStatus] = useState(statusDatas[0].name);
    const onSwitchStatus = (status: any) => {
        setStatus(status.name);
        setCurrentStatus(status.value);
    };
    const onSwitchDates = (status: any) => {
        setDate(status.name);
        // setCurrentTabStatus(status.value);
    };

    const [project, setProject] = useState({
        id: null,
        name: '',
        description: '',
        deadline_at: ''
    });

    function init() {
        // setMovingDest(null);
        setProject({
            id: null,
            name: '',
            description: '',
            deadline_at: ''
        });
    }

    useEffect(() => {
        if (movingDest?.id) {
            setVisiable(true);
            console.log(movingDest);
        }
    }, [movingDest]);

    return (
        <>
            <div className="max-w-7xl mx-auto h-[calc(100vh-18.5rem)] px-4 py-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            項目管理
                        </h2>
                    </div>
                </div>
                <div className="mt-4 hidden">
                    <div>
                        <MyDateDropdown
                            value={status}
                            datas={statusDatas}
                            onSwitch={onSwitchStatus}
                        />
                        <MyDateDropdown value={date} datas={dates} onSwitch={onSwitchDates} />
                    </div>
                    <div className="mt-2 rounded-lg shadow">
                        <div className=" rounded-t-lg bg-gray-50 border-b px-4 py-2 flex justify-between items-center">
                            <div>
                                <h1>收件箱(10)</h1>
                            </div>
                            <button
                                type="button"
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <PlusIcon className="h-4" />
                                <span>新增</span>
                            </button>
                        </div>
                        <div className=" divide-y">
                            {/* <ProjectRow
                                project={null}
                                setVisiable={setVisiable}
                                updateProjectHandler={updateProjectHandler}
                            /> */}
                        </div>
                    </div>
                </div>
                <div className="mt-4 pb-4">
                    <div className="flex flex-row justify-between items-center border-b py-2">
                        <h1>項目</h1>
                        <button
                            type="button"
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => {
                                init();
                                setVisiable(true);
                            }}
                        >
                            <PlusIcon className="h-4" />
                            <span>新增</span>
                        </button>
                    </div>
                    <div className="my-2">
                        <MyDateDropdown
                            value={status}
                            datas={statusDatas}
                            onSwitch={onSwitchStatus}
                        />
                    </div>
                    <div>
                        <ProjectItem
                            projects={projects}
                            setVisiable={setVisiable}
                            setProject={setProject}
                        />
                    </div>
                </div>
                <PaginationView meta={meta} pathname={'/project'} params={null} />
            </div>
            <EditProjectModal
                visable={visiable}
                setMode={setMode}
                movingDest={movingDest}
                project={project}
                setProject={setProject}
                cancelClick={() => {
                    setVisiable(false);
                }}
                confirmClick={(data: any) => {
                    // console.log(data);
                    // console.log("movingDest: ", movingDest);
                    setVisiable(false);
                    data.folder_id = data?.folder?.id;
                    data.parent_id = movingDest?.id;
                    if (data?.id) updateProjectHandler(data);
                    else addNewProjectHeadler(data);
                    init();
                }}
            />
            <FolderTreeForSelect
                {...{
                    mode,
                    setMode,
                    movingDest,
                    setMovingDest,
                    targetId: ''
                }}
            />
        </>
    );
}
export default ProjectView;
