import { Switch } from '@headlessui/react';
import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import _ from 'lodash';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import HeaderBreadCrumb from '../../../components/common/Widget/HeaderBreadCrumb';
import Progress from '../../../components/common/Widget/Progress';
import SingleActionModel from '../../../components/common/Widget/SingleActionModel';
import StepsListView from '../../../components/feature/project/step/StepsListView';

interface ProjectDetailViewProps {
    project: any;
    tasks: [];
    setTasks: any;
    open: boolean;
    setOpen: any;
    users: any;
}

function ProjectDetailView(props: ProjectDetailViewProps) {
    const { project = null, tasks, setTasks, open, setOpen, users } = props;
    const route = useRouter();
    const [progress, setProgress] = useState(0);
    const [tmpTasks, setTmpTasks] = useState<any>([])
    const [hideCompletedTask, setHideCompleted] = useState(false)

    useEffect(() => {
        if (tasks && tasks.length > 0) {
            const count = _.countBy(tasks, function (step: any) {
                return step.status == 'completed';
            }).true;
            if (count > 0) {
                setProgress(_.floor(_.divide(count, tasks.length) * 100, 2));
            } else {
                setProgress(0)
            }
        }
    }, [tasks, tmpTasks]);

    useEffect(() => {
        setTmpTasks(tasks)
    }, [tasks])


    useEffect(() => {
        if (hideCompletedTask) {
            setTmpTasks(_.filter(tmpTasks, function (task: any) {
                return task.status != "completed"
            }))
        }
        else {
            setTmpTasks(tasks)
        }
    }, [hideCompletedTask])

    return (
        <>
            <SingleActionModel
                open={open}
                setOpen={setOpen}
                title={'進行中......'}
                content={'正在加載數據...'}
                icon={<PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />}
            />
            <div className="w-full mx-auto h-[calc(100vh-18.5rem)] px-1 sm:px-0 lg:px-8 mb-6">

                <HeaderBreadCrumb
                    title={'工作流'}
                    back={() => {
                        Router.back()
                    }}
                />
                <header className="shadow bg-white flex flex-col justify-between items-center">
                    <div className="w-full   py-6 px-4 sm:px-6 lg:px-8   ">
                        <h1 className="text-2xl font-bold text-gray-900">{project?.name}</h1>
                        <h5 className="text-md text-gray-500 sm:text-md">{project?.description}</h5>
                    </div>
                    <Progress value={progress} />
                </header>
                <div className='my-2  items-center'>
                    <Switch.Group as="div" className="flex items-center">
                        <Switch
                            defaultChecked={hideCompletedTask}
                            onChange={() => {
                                setHideCompleted(!hideCompletedTask)
                            }}
                            className={`${hideCompletedTask ? 'bg-indigo-600' : 'bg-gray-200'}
                                'relative inline-flex flex-shrink-0 h-5 w-10 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            `}
                        >
                            <span
                                aria-hidden="true"
                                className={`${hideCompletedTask ? 'translate-x-5' : 'translate-x-0'}
                                    'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                `}
                            />
                        </Switch>
                        <Switch.Label as="span" className="ml-3">
                            <span className="text-sm font-medium text-gray-900">隱藏完成任務 </span>
                        </Switch.Label>
                    </Switch.Group>
                </div>
                <div className="my-2">
                    <StepsListView
                        tasks={tmpTasks?.sort((a: any, b: any) => (a.status > b.status ? -1 : 1))}
                        setTasks={setTmpTasks}
                        users={users}
                    />
                </div>
            </div>
        </>
    );
}
export default ProjectDetailView;
