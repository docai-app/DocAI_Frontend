import { ChevronDownIcon } from '@heroicons/react/solid';
import ProjectRow from './ProjectRow';

interface ProjectItemProps {
    projects: any;
    updateProjectHandler: any;
}

export default function ProjectItem(props: ProjectItemProps) {
    const { projects, updateProjectHandler } = props;
    return (
        <>
            <div className="mt-4 rounded-lg shadow">
                <div className=" rounded-t-lg bg-gray-50 border-b px-4 py-2 flex justify-between items-center">
                    <div>
                        <h1>項目名稱</h1>
                    </div>
                    <button
                        type="button"
                        className="hidden relative  items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <ChevronDownIcon className="h-4 " />
                    </button>
                </div>
                <div className=" divide-y">
                    {projects?.map((project: any, index: number) => {
                        return (
                            <ProjectRow
                                key={index}
                                project={project}
                                updateProjectHandler={updateProjectHandler}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}
