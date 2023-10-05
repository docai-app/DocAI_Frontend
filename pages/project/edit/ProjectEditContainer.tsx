import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Api from '../../../apis';
import useAlert from '../../../hooks/useAlert';
import ProjectEditView from './ProjectEditView';

const apiSetting = new Api();

export default function ProjectEditContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [projects, setProjects] = useState();
    const [meta, setMeta] = useState();
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [project, setProject] = useState({
        name: '',
        description: '',
        meta: {}
    });

    const [
        { data: addNewProjectData, loading: addNewProjectLoading, error: addNewProjectError },
        addNewProject
    ] = useAxios(apiSetting.ProjectWorkflow.addProjectWorkflow(), { manual: true });

    const [{ data: getProjectWorkflowByIdData, loading }, getProjectWorkflowById] = useAxios(
        apiSetting.ProjectWorkflow.getProjectWorkflowById(''),
        { manual: true }
    );

    const [{ data: updateProjectData, loading: updateProjectLoading }, updateProjectWorkflowById] =
        useAxios(apiSetting.ProjectWorkflow.updateProjectWorkflowById(''), { manual: true });

    useEffect(() => {
        if (router && router.query.id) {
            getProjectWorkflowById({
                ...apiSetting.ProjectWorkflow.getProjectWorkflowById(router.query.id as string)
            });
        }
    }, [router]);

    useEffect(() => {
        if (getProjectWorkflowByIdData && getProjectWorkflowByIdData.success) {
            console.log('getProjectWorkflowByIdData', getProjectWorkflowByIdData);
            setProject(getProjectWorkflowByIdData.doc);
        }
    }, [getProjectWorkflowByIdData]);

    const addNewProjectHeadler = useCallback(
        async (data) => {
            const { name, meta } = data;
            addNewProject({
                data: {
                    name: name,
                    description: meta?.description
                }
            });
        },
        [addNewProject]
    );

    useEffect(() => {
        if (addNewProjectData) {
            console.log('addNewProjectData', addNewProjectData);
        }
    }, [addNewProjectData]);

    const updateProjectHandler = useCallback(
        async (data) => {
            const { name, meta } = data;
            addNewProject({
                data: {
                    name: name,
                    description: meta?.description
                }
            });
        },
        [addNewProject]
    );

    useEffect(() => {
        if (router.query.page) {
            setPage(parseInt(router.query.page + '') || 1);
        }
    }, [router.query.page]);

    return (
        <ProjectEditView
            {...{
                addNewProjectHeadler,
                updateProjectHandler,
                open,
                setOpen,
                project,
                setProject
            }}
        />
    );
}
