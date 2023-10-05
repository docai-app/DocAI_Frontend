import {
    ClipboardDocumentListIcon,
    PencilSquareIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline';
import moment from 'moment';
import Link from 'next/link';
import Router from 'next/router';

interface ProjectRowProps {
    project: any;
    setVisiable: any;
    setProject: any;
}

export default function ProjectRow(props: ProjectRowProps) {
    const { project, setProject, setVisiable } = props;
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex flex-1 flex-col">
                    <div className="flex flex-row px-2 py-0 items-center cursor-pointer justify-between">
                        <div className="flex flex-1 flex-row items-center">
                            <ClipboardDocumentListIcon className="w-4 m-2" />
                            <Link href={`/project/${project?.id}`}>
                                <a className=" text-sm hover:underline">{project?.name}</a>
                            </Link>
                        </div>
                        {/* <div className="flex w-1/6 hidden">
                            <Progress value={project?.progress} />
                        </div> */}
                    </div>
                    <div className="flex px-2 items-center justify-between">
                        <div className="flex flex-row items-center">
                            <UserCircleIcon className="w-4 m-1 text-gray-400" />
                            <label className="text-xs text-gray-400">
                                {project?.user?.nickname}
                            </label>
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
