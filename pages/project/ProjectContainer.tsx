import useAxios from 'axios-hooks';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import Api from '../../apis';
import ProjectView from './ProjectView';

const apiSetting = new Api();

export default function ProjectContainer() {
    const router = useRouter();
    const queryId = useRef(router.query.id);
    const queryName = useRef(router.query.name);
    const [id, setId] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [projects, setProjects] = useState();
    const [currentStatus, setCurrentStatus] = useState("")
    const [
        { data: showAllItemsData, loading: showAllItemsLoading, error: showAllItemsError },
        showAllItems
    ] = useAxios({}, { manual: true });

    const [
        { data: showAllProjectsData, loading: showAllProjectsLoading, error: showAllProjectsError },
        showAllProjects
    ] = useAxios(apiSetting.Project.getAllProjects(), { manual: false });

    const [
        { data: addNewProjectData, loading: addNewProjectLoading, error: addNewProjectError },
        addNewProject
    ] = useAxios(apiSetting.Project.addNewProject(), { manual: true });

    const addNewProjectHeadler = useCallback(async (data) => {
        const { name } = data
        console.log(data)
        addNewProject({ data: { name: name } });
    }, [addNewProject])

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
                    return p["is_completed"] === true
                }).length
                project.progress = Math.round(count / (project.project_tasks.length || 1).toFixed(0) * 100)
                return project
            })
            setProjects(showAllProjectsData.projects)

        }
    }, [showAllProjectsLoading, showAllProjectsData]);

    useEffect(() => {
        if (addNewProjectData && addNewProjectData.success) {
            router.reload()
        }
    }, [addNewProjectData]);

    useEffect(() => {
        if (currentStatus && projects) {
            const data: any = _.filter(showAllProjectsData?.projects, function (o: any) {
                if (currentStatus == "all")
                    return o;
                else if (currentStatus == "finish")
                    return o["progress"] == 100;
                else if (currentStatus == "unfinish")
                    return o["progress"] != 100;
            });
            setProjects(data)
        }
    }, [currentStatus]);

    return <ProjectView {...{
        id,
        name,
        showAllItemsData,
        projects,
        currentStatus,
        setCurrentStatus,
        addNewProjectHeadler
    }} />;
}