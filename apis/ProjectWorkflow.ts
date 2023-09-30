import { AxiosRequestConfig } from 'axios';

// apis/Project.ts
const baseURL = process.env.NEXT_PUBLIC_EXAMHERO_URL;

export default class ProjectWorkflow {
    getAllWorkflow(page: number) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/project_workflows?page=${page}`,
            method: 'GET'
        };
        return requestHeader;
    }

    getProjectWorkflowById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/project_workflows/${id}`,
            method: 'GET'
        };
        return requestHeader;
    }

    addProjectWorkflow() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: '/api/project_workflows',
            method: 'POST'
        };
        return requestHeader;
    }



    updateProjectWorkflowById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/project_workflows/${id}`,
            method: 'PUT'
        };
        return requestHeader;
    }

    addProjectWorkflowStepById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/project_workflow_steps`,
            method: 'POST'
        };
        return requestHeader;
    }
}
