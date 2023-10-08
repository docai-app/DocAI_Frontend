import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Api from '../../../apis';
import ProjectDetailView from './ProjectDetailView';

const apiSetting = new Api();

export default function ProjectDetailContainer() {
    const router = useRouter();
    const [project, setProject] = useState<any>();
    const [tasks, setTasks] = useState<any>([]);
    const [open, setOpen] = useState(false);

    const [{ data: getProjectWorkflowByIdData, loading }, getProjectWorkflowById] = useAxios(
        apiSetting.ProjectWorkflow.getProjectWorkflowById(''),
        { manual: true }
    );

    const [
        { data: getAllUsersData },
        getAllUsers
    ] = useAxios(apiSetting.User.getAllUsers(), { manual: true });


    useEffect(() => {
        setOpen(loading);
    }, [loading]);

    useEffect(() => {
        if (router && router.query.id) {
            getProjectWorkflowById({
                ...apiSetting.ProjectWorkflow.getProjectWorkflowById(router.query.id as string)
            });
        }
    }, [router]);


    useEffect(() => {
        if (getProjectWorkflowByIdData && getProjectWorkflowByIdData.success) {
            // console.log(getProjectWorkflowByIdData);
            setProject(getProjectWorkflowByIdData.project_workflow);
            setTasks(getProjectWorkflowByIdData.project_workflow.steps);
        }
    }, [getProjectWorkflowByIdData]);

    return (
        <ProjectDetailView
            {...{
                project,
                tasks,
                setTasks,
                open,
                setOpen
            }}
        />
    );
}
