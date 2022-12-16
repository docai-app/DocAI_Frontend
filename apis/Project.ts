import { AxiosRequestConfig } from 'axios';

// apis/Project.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class Project {
    getAllProjects(page: number) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/projects?page=${page}`,
            method: 'GET'
        };
        return requestHeader;
    }

    getProjectById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/projects/${id}`,
            method: 'GET'
        };
        return requestHeader;
    }

    addNewProject() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: '/api/v1/projects',
            method: 'POST'
        };
        return requestHeader;
    }

    getProjectTasksById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/projects/${id}/tasks`,
            method: 'GET'
        };
        return requestHeader;
    }

    updateProjectById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/projects/${id}`,
            method: 'PUT'
        };
        return requestHeader;
    }
}
