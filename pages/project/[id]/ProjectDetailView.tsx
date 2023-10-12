import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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

    useEffect(() => {
        if (project && project.steps && project.steps.length > 0) {
            const count = _.countBy(project.steps, function (step) {
                return step.status == 'completed';
            }).true;
            if (count) {
                setProgress(_.floor(_.divide(count, project.steps.length) * 100, 2));
            }
        }
    }, [project]);
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            工作流
                        </h2>
                    </div>
                </div>
                <header className="shadow bg-white flex flex-col justify-between items-center">
                    <div className="w-full   py-6 px-4 sm:px-6 lg:px-8   ">
                        <h1 className="text-2xl font-bold text-gray-900">{project?.name}</h1>
                        <h5 className="text-md text-gray-500 sm:text-md">{project?.description}</h5>
                    </div>
                    <Progress value={progress} />
                </header>
                <div className="my-2">
                    <StepsListView
                        tasks={tasks}
                        setTasks={setTasks}
                        users={users}
                    />
                </div>
            </div>
        </>
    );
}
export default ProjectDetailView;
