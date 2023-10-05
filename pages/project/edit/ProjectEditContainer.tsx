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
    const [meta, setMeta] = useState();
    const [open, setOpen] = useState(false);
    const [project, setProject] = useState({
        id: 0,
        name: '',
        description: '',
        meta: {},
        steps: [],
        status: 'draft',
        is_process_workflow: false
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

    const [
        { data: addProjectWorkflowStepByIdData, loading: addProjectWorkflowStepByIdLoading },
        addProjectWorkflowStepById
    ] = useAxios(apiSetting.ProjectWorkflow.addProjectWorkflowStepById(), { manual: true });

    const [
        { data: updateProjectWorkflowStepByIdData, loading: updateProjectWorkflowStepByIdLoading },
        updateProjectWorkflowStepById
    ] = useAxios(apiSetting.ProjectWorkflow.updateProjectWorkflowStepById(''), { manual: true });

    const [
        { data: deleteProjectWorkflowStepByIdData, loading: deleteProjectWorkflowStepByIdLoading },
        deleteProjectWorkflowStepById
    ] = useAxios(apiSetting.ProjectWorkflow.deleteProjectWorkflowStepById(''), { manual: true });

    useEffect(() => {
        setOpen(loading);
    }, [loading]);

    useEffect(() => {
        setOpen(updateProjectLoading);
    }, [updateProjectLoading]);

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

    useEffect(() => {
        if (updateProjectWorkflowStepByIdData && updateProjectWorkflowStepByIdData.success) {
            console.log('updateProjectWorkflowStepByIdData', updateProjectWorkflowStepByIdData);
        }
    }, [updateProjectWorkflowStepByIdData]);

    const addProjectHeadler = useCallback(
        async (data, tasks) => {
            // console.log(data, tasks);
            const { name, meta, is_process_workflow } = data;
            // console.log(parent_id);
            addNewProject({
                data: {
                    name: name,
                    description: meta?.description,
                    steps: tasks,
                    is_process_workflow: is_process_workflow
                }
            });
        },
        [addNewProject]
    );

    const updateProjectHandler = useCallback(
        async (id, data) => {
            const { name, meta, steps, is_process_workflow } = data;
            console.log(data);
            updateProjectWorkflowById({
                ...apiSetting.ProjectWorkflow.updateProjectWorkflowById(id),
                data: {
                    name: name,
                    description: meta?.description,
                    is_process_workflow: is_process_workflow
                }
            });
        },
        [updateProjectWorkflowById]
    );

    const handleSave = useCallback(
        async (data, tasks) => {
            if (router && router.query.id) {
                updateProjectHandler(router.query.id, data);
            } else {
                addProjectHeadler(data, tasks);
            }
        },
        [router]
    );

    const addProjectStepHandler = useCallback(
        async (data) => {
            // console.log(data);
            // console.log(project?.id);
            const { name, meta, deadline } = data;
            addProjectWorkflowStepById({
                data: {
                    project_workflow_id: project?.id,
                    name: name,
                    deadline: deadline,
                    description: meta.description,
                    assignee_id: 18
                }
            });
        },
        [project, addProjectWorkflowStepById]
    );

    const updateProjectStepHandler = useCallback(
        async (data) => {
            // console.log(data);
            const { id, name, meta, deadline } = data;
            updateProjectWorkflowStepById({
                ...apiSetting.ProjectWorkflow.updateProjectWorkflowStepById(id),
                data: {
                    name: name,
                    description: meta.description,
                    deadline: deadline,
                    assignee_id: 18
                }
            });
        },
        [project, updateProjectWorkflowStepById]
    );

    const deleteProjectStepHandler = useCallback(
        async (data) => {
            // console.log(data);
            const { id } = data;
            deleteProjectWorkflowStepById({
                ...apiSetting.ProjectWorkflow.deleteProjectWorkflowStepById(id)
            });
        },
        [project, deleteProjectWorkflowStepById]
    );

    useEffect(() => {
        if (addNewProjectData && addNewProjectData.success) {
            setAlert({ title: '保存成功', type: 'success' });
        } else if (addNewProjectData && !addNewProjectData.success) {
            setAlert({ title: '保存失败， 請重試', type: 'success' });
        }
    }, [addNewProjectData]);

    useEffect(() => {
        if (updateProjectData && updateProjectData.success) {
            setAlert({ title: '修改成功', type: 'success' });
        } else if (updateProjectData && !updateProjectData.success) {
            setAlert({ title: '修改失敗， 請重試', type: 'success' });
        }
    }, [updateProjectData]);

    useEffect(() => {
        if (addProjectWorkflowStepByIdData) {
            console.log('addProjectWorkflowStepByIdData', addProjectWorkflowStepByIdData);
        }
    }, [addProjectWorkflowStepByIdData]);

    return (
        <ProjectEditView
            {...{
                open,
                setOpen,
                project,
                setProject,
                addProjectStepHandler,
                updateProjectStepHandler,
                deleteProjectStepHandler,
                handleSave
            }}
        />
    );
}
