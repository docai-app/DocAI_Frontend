import {
    ClipboardDocumentListIcon,
    PencilSquareIcon
} from '@heroicons/react/24/outline';
import _ from 'lodash';
import moment from 'moment';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import Progress from '../../common/Widget/Progress';

interface ProjectRowProps {
    project: any;
    setVisiable: any;
    setProject: any;
}

export default function ProjectRow(props: ProjectRowProps) {
    const { project, setProject, setVisiable } = props;
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (project && project.steps && project.steps.length > 0) {
            const count = _.countBy(project.steps, function (step) {
                return step.status == 'completed'
            }).true
            if (count) {
                setProgress(_.floor(_.divide(count, project.steps.length) * 100, 2))
            }
        }
    }, [project])
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex flex-1 flex-col">
                    <div className="flex flex-row px-2 py-0 items-center cursor-pointer justify-between">
                        <div className="flex flex-1 flex-row items-center">
                            <ClipboardDocumentListIcon className="w-4 m-2" />
                            <Link href={`/project/${project?.id}`}>
                                <a className=" text-md hover:underline">{project?.name}</a>
                            </Link>
                        </div>

                        <div className="flex w-1/6">
                            <Progress value={progress} />
                        </div>
                    </div>

                    <div className="flex px-2 ml-4 my-1 items-center hidden">
                        <div className="flex flex-row items-center">
                            <label className='text-sm text-gray-500' > {project?.description}</label>
                        </div>
                    </div>
                    <div className="flex px-2 my-1 items-center justify-between">
                        <div className="flex flex-row items-center">
                            {/* <UserCircleIcon className="w-4 m-1 text-gray-400" />
                            <label className="text-xs text-gray-400">
                                {project?.user?.nickname}
                            </label> */}
                            <div className="flex flex-row text-xs ml-4 text-gray-400 items-center">
                                更新時間:
                                {project?.updated_at &&
                                    moment(project?.updated_at).format('YYYY-MM-DD HH:mm')}
                            </div>
                        </div>

                        <div className="flex flex-row items-center">
                            <PencilSquareIcon
                                className="w-4 cursor-pointer"
                                onClick={() => {
                                    Router.push({
                                        pathname: '/project/edit',
                                        query: { id: project.id }
                                    });
                                    // setVisiable(true);
                                    // setProject(project);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
