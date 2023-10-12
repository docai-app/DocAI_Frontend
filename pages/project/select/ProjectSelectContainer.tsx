import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Api from '../../../apis';
import useAlert from '../../../hooks/useAlert';
import ProjectSelectView from './ProjectSelectView';

const apiSetting = new Api();

export default function ProjectSelectContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [projects, setProjects] = useState();
    const [meta, setMeta] = useState();
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);

    const [{ data: getAllWorkflowData, loading: loading }, getAllWorkflow] = useAxios(
        apiSetting.ProjectWorkflow.getAllWorkflow(page),
        { manual: true }
    );

    useEffect(() => {
        setOpen(loading);
        return () => {
            setOpen(false)
        }
    }, [loading]);

    useEffect(() => {
        getAllWorkflow({
            ...apiSetting.ProjectWorkflow.getAllWorkflow(page),
            params: {
                is_template: true
            }
        });
    }, [router]);

    useEffect(() => {
        if (getAllWorkflowData && getAllWorkflowData.success) {
            setProjects(getAllWorkflowData.project_workflows);

        } else if (getAllWorkflowData && getAllWorkflowData.success) {

        }
    }, [getAllWorkflowData]);

    return (
        <ProjectSelectView
            {...{
                projects,
                meta,
                open,
                setOpen
            }}
        />
    );
}
