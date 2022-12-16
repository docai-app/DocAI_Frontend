import { AxiosRequestConfig } from 'axios';

// apis/ProjectTask.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class ProjectTask {
    getAllProjectTasks() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/tasks`,
            method: 'GET'
        };
        return requestHeader;
    }

    getProjectTaskById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/tasks/${id}`,
            method: 'GET'
        };
        return requestHeader;
    }

    addNewProjectTask() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: '/api/v1/tasks',
            method: 'POST'
        };
        return requestHeader;
    }

    updateProjectTaskById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/tasks/${id}`,
            method: 'PUT'
        };
        return requestHeader;
    }

    deleteProjectTaskById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/tasks/${id}`,
            method: 'DELETE'
        };
        return requestHeader;
    }
}
