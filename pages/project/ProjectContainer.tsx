import axios from 'axios';
import useAxios from 'axios-hooks';
import _ from 'lodash';
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
    const [meta, setMeta] = useState();
    const [page, setPage] = useState(1);
    const [currentStatus, setCurrentStatus] = useState('');
    const [
        { data: showAllItemsData, loading: showAllItemsLoading, error: showAllItemsError },
        showAllItems
    ] = useAxios({}, { manual: true });

    const [
        { data: showAllProjectsData, loading: showAllProjectsLoading, error: showAllProjectsError },
        showAllProjects
    ] = useAxios(apiSetting.Project.getAllProjects(page), { manual: false });

    const [
        { data: addNewProjectData, loading: addNewProjectLoading, error: addNewProjectError },
        addNewProject
    ] = useAxios(apiSetting.Project.addNewProject(), { manual: true });

    const [
        { data: updateProjectData, loading: updateProjectLoading, error: updateProjectError },
        updateProject
    ] = useAxios(apiSetting.Project.updateProjectById(''), { manual: true });

    const addNewProjectHeadler = useCallback(
        async (data) => {
            const { name, description, deadline_at, folder_id } = data;
            // console.log("add data", data);
            addNewProject({
                data: {
                    name: name,
                    description: description,
                    deadline_at: deadline_at,
                    parent_id: folder_id
                }
            });
        },
        [addNewProject]
    );

    const updateProjectHandler = useCallback(
        async (data) => {
            const { id, name, description, deadline_at, folder_id, parent_id } = data;
            // console.log("update data", data);
            updateProject({
                ...apiSetting.Project.updateProjectById(id),
                data: {
                    name: name,
                    description: description,
                    deadline_at: deadline_at
                }
            });
            if (folder_id && parent_id)
                axios.request(
                    apiSetting.Folders.updateFolderById(folder_id, parent_id)
                );
        },
        [updateProject]
    );

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
        if (!showAllProjectsLoading && showAllProjectsData) {
            showAllProjectsData.projects.map((project: any) => {
                const count = _.filter(project.project_tasks, function (p) {
                    return p['is_completed'] === true;
                }).length;
                project.progress = Math.round(
                    (count / (project.project_tasks.length || 1).toFixed(0)) * 100
                );
                return project;
            });
            setProjects(showAllProjectsData.projects);
            setMeta(showAllProjectsData?.meta);
        }
    }, [showAllProjectsLoading, showAllProjectsData]);

    useEffect(() => {
        if (addNewProjectData && addNewProjectData.success) {
            router.reload();
        }
    }, [addNewProjectData]);

    useEffect(() => {
        if (updateProjectData && updateProjectData.success) {
            router.reload();
        } else if (updateProjectData && !updateProjectData.success) {
            setAlert({ title: updateProjectData.error, type: 'error' });
        }
    }, [updateProjectData]);

    useEffect(() => {
        if (currentStatus && projects) {
            const data: any = _.filter(showAllProjectsData?.projects, function (o: any) {
                if (currentStatus == 'all') return o;
                else if (currentStatus == 'finish') return o['progress'] == 100;
                else if (currentStatus == 'unfinish') return o['progress'] != 100;
            });
            setProjects(data);
        }
    }, [currentStatus]);

    useEffect(() => {
        if (router.query.page) {
            setPage(parseInt(router.query.page + '') || 1);
        }
    }, [router.query.page]);

    return (
        <ProjectView
            {...{
                id,
                name,
                showAllItemsData,
                projects,
                meta,
                currentStatus,
                setCurrentStatus,
                addNewProjectHeadler,
                updateProjectHandler
            }}
        />
    );
}
