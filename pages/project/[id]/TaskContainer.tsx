import useAxios from 'axios-hooks';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Api from '../../../apis';
import TaskView from './TaskView';

const apiSetting = new Api();

export default function TaskContainer() {
    const router = useRouter();
    const [project, setProject] = useState<any>();
    const [tasks, setTasks] = useState<any>([]);
    const [documentPath, setDocumentPath] = useState<{ id: string | null; name: string }[]>([
        { id: null, name: 'Root' }
    ]);

    const [
        { data: showProjectByIdData, loading: showProjectByIdLoading, error: showrojectByIdError },
        showProjectById
    ] = useAxios(apiSetting.Project.getProjectById(router.query.id + ''), { manual: false });

    const [
        {
            data: showProjectTaskByIdData,
            loading: showProjectTaskByIdLoading,
            error: showProjectTaskByIdError
        },
        showProjectTaskById
    ] = useAxios(apiSetting.Project.getProjectTasksById(router.query.id + ''), { manual: false });

    const [
        { data: addNewTaskData, loading: addNewTaskLoading, error: addNewTaskError },
        addNewTask
    ] = useAxios(apiSetting.ProjectTask.addNewProjectTask(), { manual: true });

    const [
        { data: updateTaskData, loading: updateTaskLoading, error: updateTaskError },
        updateTask
    ] = useAxios(apiSetting.ProjectTask.updateProjectTaskById(''), { manual: true });

    const [
        { data: removeTaskData, loading: removeTaskLoading, error: removeTaskError },
        removeTask
    ] = useAxios(apiSetting.ProjectTask.deleteProjectTaskById(''), { manual: true });

    const [{ data: showFolderByIDData }, showFolderByID] = useAxios({}, { manual: true });

    const addNewTaskHandler = useCallback(
        async (data) => {
            const { title, description, deadline_at } = data;

            addNewTask({
                data: {
                    project_id: router.query.id,
                    title: title,
                    description: description,
                    deadline_at: deadline_at
                }
            });
        },
        [router, addNewTask]
    );

    const updateTaskHandler = useCallback(
        async (data) => {
            const { id, title, description, is_completed, deadline_at } = data;
            // console.log(data);

            updateTask({
                ...apiSetting.ProjectTask.updateProjectTaskById(id),
                data: {
                    title: title,
                    description: description,
                    is_completed: is_completed,
                    deadline_at: deadline_at
                }
            });
        },
        [updateTask]
    );

    const removeTaskHandler = useCallback(
        async (task_id) => {
            if (task_id) removeTask(apiSetting.ProjectTask.deleteProjectTaskById(task_id));
        },
        [removeTask]
    );

    //更新本地数据
    const updateLocalData = () => {
        const newTasks = [...tasks];
        setTasks(newTasks);
        console.log(newTasks);
    };

    useEffect(() => {
        if (showProjectByIdData && showProjectByIdData.success) {
            setProject(showProjectByIdData.project);
        }
    }, [showProjectByIdData]);

    useEffect(() => {
        if (showProjectTaskByIdData && showProjectTaskByIdData.success) {
            const count = _.filter(showProjectTaskByIdData.project_tasks, function (p) {
                return p['is_completed'] === true;
            }).length;
            if (project)
                project.progress = Math.round(
                    (count / (showProjectTaskByIdData.project_tasks.length || 1).toFixed(0)) * 100
                );
            setTasks(showProjectTaskByIdData.project_tasks);
        }
    }, [showProjectTaskByIdData]);

    useEffect(() => {
        if (addNewTaskData && addNewTaskData.success) {
            showProjectTaskById();
        }
    }, [addNewTaskData]);

    useEffect(() => {
        if (updateTaskData && updateTaskData.success) {
            showProjectTaskById();
        }
    }, [updateTaskData]);

    useEffect(() => {
        if (removeTaskData && removeTaskData.success) {
            showProjectTaskById();
        }
    }, [removeTaskData]);

    useEffect(() => {
        if (project && project.folder?.id) {
            showFolderByID(apiSetting.Folders.showFolderByID(project.folder?.id));
        } else {
            setDocumentPath([{ id: null, name: 'Root' }]);
        }
    }, [project]);

    useEffect(() => {
        if (showFolderByIDData?.success) {
            setDocumentPath([
                { id: null, name: 'Root' },
                ...showFolderByIDData.ancestors.slice().reverse(),
                showFolderByIDData.folder
            ]);
        }
    }, [showFolderByIDData]);

    return (
        <TaskView
            {...{
                project,
                tasks,
                documentPath,
                updateLocalData,
                addNewTaskHandler,
                updateTaskHandler,
                removeTaskHandler
            }}
        />
    );
}
