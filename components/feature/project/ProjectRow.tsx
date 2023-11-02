import _ from 'lodash';
import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ProjectRowProps {
    project: any;
    setVisiable: any;
    setProject: any;
}

export default function ProjectRow(props: ProjectRowProps) {
    const { project, setProject, setVisiable } = props;
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
            <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    <Link href={`/project/${project?.id}`}>
                        <a className="text-indigo-500">{project?.name}</a>
                    </Link>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">0</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">進行中</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {moment(project?.updated_at).format('YYYY-MM-DD HH:ss')}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {moment(project?.created_at).format('YYYY-MM-DD HH:ss')}
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <Link href={`/project/edit?id=${project?.id}`}>
                        <a className="text-indigo-600 hover:text-indigo-900">編輯</a>
                    </Link>
                </td>
            </tr>
        </>
    );
}
