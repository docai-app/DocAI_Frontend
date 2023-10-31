import Router from 'next/router';
import PaginationView from '../../common/Widget/PaginationView';
import ProjectRow from './ProjectRow';

interface ProjectItemProps {
    projects: any;
    setVisiable: any;
    setProject: any;
    meta: any;
}

export default function ProjectItem(props: ProjectItemProps) {
    const { projects, setVisiable, setProject, meta } = props;
    return (
        <>
            <div className="mt-0 flow-root w-full">
                <div className="inline-block  align-middle w-full ">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="w-4/12 py-3.5  text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                >
                                    名稱
                                </th>
                                <th
                                    scope="col"
                                    className="w-1/12 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                    任務關係
                                </th>
                                <th
                                    scope="col"
                                    className="w-1/12 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                    運行次數
                                </th>
                                <th
                                    scope="col"
                                    className="w-1/12 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                    狀態
                                </th>
                                <th
                                    scope="col"
                                    className="w-2/12 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                    上一次運行
                                </th>
                                <th
                                    scope="col"
                                    className="w-2/12 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                    建立日期
                                </th>
                                <th
                                    scope="col"
                                    className="w-2/12 text-left text-md font-semibold text-gray-900">
                                    <div className="flex justify-end">
                                        <a
                                            className=" underline cursor-pointer block rounded-md  text-center text-md font-semibold text-indigo-500  hover:text-indigo-700  "
                                            onClick={() => {
                                                Router.push({ pathname: '/project/select' });
                                            }}
                                        >
                                            + 新增
                                        </a>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {projects?.map((project: any, index: number) => {
                                return (
                                    <ProjectRow
                                        key={index}
                                        project={project}
                                        setVisiable={setVisiable}
                                        setProject={setProject}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                    <PaginationView meta={meta} pathname={'/project'} params={null} />
                </div>
            </div>
        </>
    );
}
