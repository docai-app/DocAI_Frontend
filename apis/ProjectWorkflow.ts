import { AxiosRequestConfig } from 'axios';

// apis/Project.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class ProjectWorkflow {
    getAllWorkflow(page: number) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/project_workflows?page=${page}`,
            method: 'GET'
        };
        return requestHeader;
    }

    getProjectWorkflowById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/project_workflows/${id}`,
            method: 'GET'
        };
        return requestHeader;
    }

    addProjectWorkflow() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: '/api/v1/project_workflows',
            method: 'POST'
        };
        return requestHeader;
    }

    updateProjectWorkflowById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/project_workflows/${id}`,
            method: 'PUT'
        };
        return requestHeader;
    }

    getAllProjectWorkflowStep(page: number) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/project_workflow_steps?page=${page}`,
            method: 'get'
        };
        return requestHeader;
    }

    addProjectWorkflowStepById() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/project_workflow_steps`,
            method: 'POST'
        };
        return requestHeader;
    }

    updateProjectWorkflowStepById(id: any) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/project_workflow_steps/${id}`,
            method: 'PUT'
        };
        return requestHeader;
    }

    deleteProjectWorkflowStepById(id: any) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/project_workflow_steps/${id}`,
            method: 'DELETE'
        };
        return requestHeader;
    }
}
