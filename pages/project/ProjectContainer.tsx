import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import Api from '../../apis';
import useAlert from '../../hooks/useAlert';
import ProjectView from './ProjectView';

const apiSetting = new Api();

export default function ProjectContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const queryId = useRef(router.query.id);
    const queryName = useRef(router.query.name);
    const [id, setId] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [projects, setProjects] = useState();
    const [tasks, setTasks] = useState<any>([]);
    const [meta, setMeta] = useState();
    const [page, setPage] = useState(1);

    const [metaSteps, setMetaSteps] = useState();
    const [users, setUsers] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const [currentStatus, setCurrentStatus] = useState('');
    const [
        { data: showAllItemsData, loading: showAllItemsLoading, error: showAllItemsError },
        showAllItems
    ] = useAxios({}, { manual: true });

    const [{ data: getAllWorkflowData, loading: getAllWorkflowDataLoading }, getAllWorkflow] =
        useAxios(apiSetting.ProjectWorkflow.getAllWorkflow(page), { manual: true });

    const [{ data: getAllProjectWorkflowStepData, loading }, getAllProjectWorkflowStep] = useAxios(
        apiSetting.ProjectWorkflow.getAllProjectWorkflowStep(page),
        { manual: true }
    );

    const [
        { data: addProjectWorkflowStepByIdData, loading: addProjectWorkflowStepByIdLoading },
        addProjectWorkflowStepById
    ] = useAxios(apiSetting.ProjectWorkflow.addProjectWorkflowStepById(), { manual: true });

    const [{ data: getAllUsersData }, getAllUsers] = useAxios(apiSetting.User.getAllUsers(), {
        manual: true
    });

    useEffect(() => {
        setOpen(loading);
    }, [loading]);

    useEffect(() => {
        getAllWorkflow();
        getAllProjectWorkflowStep({
            params: {
                status: 'pending'
            }
        });
        getAllUsers();
    }, [router]);

    useEffect(() => {
        if (router.asPath !== router.route) {
            queryId.current = router.query.id;
            queryName.current = router.query.name;
            if (queryId.current) {
                showAllItems(apiSetting.Drive.showAllFolderItems(queryId.current.toString()));
            } else {
                showAllItems(apiSetting.Drive.showAllRootItems());
            }
        } else {
            showAllItems(apiSetting.Drive.showAllRootItems());
        }
    }, [router, showAllItems]);

    useEffect(() => {
        if (!showAllItemsLoading && showAllItemsData) {
            setId(queryId.current?.toString() || null);
            setName(queryName.current?.toString() || null);
        }
    }, [showAllItemsLoading, showAllItemsData]);

    useEffect(() => {
        if (getAllWorkflowData && getAllWorkflowData.success) {
            console.log('getAllWorkflowData', getAllWorkflowData);
            setProjects(getAllWorkflowData.project_workflows);
            setMeta(getAllWorkflowData.meta);
        }
    }, [getAllWorkflowData]);

    useEffect(() => {
        if (getAllProjectWorkflowStepData && getAllProjectWorkflowStepData.success) {
            console.log(getAllProjectWorkflowStepData);
            setTasks(getAllProjectWorkflowStepData.project_workflow_steps);
            setMetaSteps(getAllProjectWorkflowStepData.meta);
        }
    }, [getAllProjectWorkflowStepData]);

    useEffect(() => {
        if (router.query.page) {
            setPage(parseInt(router.query.page + '') || 1);
        }
    }, [router.query.page]);

    useEffect(() => {
        if (getAllUsersData && getAllUsersData.success) {
            setUsers(getAllUsersData.users);
        }
    }, [getAllUsersData]);

    const addProjectStepHandler = useCallback(
        async (data) => {
            console.log(data);
            // console.log(project?.id);
            const { name, description, deadline, assignee_id } = data;
            addProjectWorkflowStepById({
                data: {
                    name: name,
                    deadline: deadline,
                    description: description,
                    assignee_id: assignee_id
                }
            }).then((res: any) => {
                if (res.data && res.data.success) {
                    setTasks((arr: any) => [...arr, data]);
                } else {
                    console.log('error', res.data);
                    setAlert({ title: '添加失敗', type: 'error' });
                }
            });
        },
        [addProjectWorkflowStepById]
    );
    // useEffect(() => {
    //     console.log(addProjectWorkflowStepByIdData);
    //     if (addProjectWorkflowStepByIdData && addProjectWorkflowStepByIdData.success) {
    //         setTasks((arr: any) => [...arr, addProjectWorkflowStepByIdData.project_workflow_step]);
    //     }
    // }, [addProjectWorkflowStepByIdData]);

    return (
        <ProjectView
            {...{
                id,
                name,
                showAllItemsData,
                projects,
                meta,
                metaSteps,
                currentStatus,
                setCurrentStatus,
                open,
                setOpen,
                tasks,
                setTasks,
                addProjectStepHandler,
                users
            }}
        />
    );
}
