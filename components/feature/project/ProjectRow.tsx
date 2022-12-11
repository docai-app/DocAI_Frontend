import { DocumentTextIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Progress from "../../common/Widget/Progress";

interface ProjectRowProps {
    project: any;
}

export default function ProjectRow(props: ProjectRowProps) {
    const {
        project
    } = props;
    return (
        <>
            <div className="flex flex-row px-4 py-2 items-center cursor-pointer justify-between">
                <div className="flex flex-1 flex-row items-center">
                    <DocumentTextIcon className="w-4 m-2" />
                    <Link href={`/project/${project?.id}`}>
                        <a className=" text-sm hover:underline">{project?.name}</a>
                    </Link>
                </div>
                <div className="flex w-1/6" >
                    <Progress value={project?.progress} />
                </div>
            </div>
        </>
    )
}