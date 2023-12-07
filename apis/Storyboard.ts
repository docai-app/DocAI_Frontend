import { AxiosRequestConfig } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class Storyboard {
    createStoryboard() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/storyboards`,
            method: 'POST'
        };
        return requestHeader;
    }
    getAllStoryboards(page = 1) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/storyboards?page=${page}`,
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return requestHeader;
    }
    deleteStoryboardById(storyboard_id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/storyboards/${storyboard_id}`,
            method: 'DELETE'
        };
        return requestHeader;
    }

    getStoryboardById(storyboard_id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/storyboards/${storyboard_id}`,
            method: 'GET'
        };
        return requestHeader;
    }

    updateStoryboardById(storyboard_id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/storyboards/${storyboard_id}`,
            method: 'PUT'
        };
        return requestHeader;
    }

    getAllStoryboardItems(page = 1) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/storyboard_items?page=${page}`,
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return requestHeader;
    }

    updateStoryboardItemById(storyboard_item_id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/storyboard_items/${storyboard_item_id}`,
            method: 'PUT'
        };
        return requestHeader;
    }

    deleteStoryboardItemById(storyboard_item_id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/v1/storyboard_items/${storyboard_item_id}`,
            method: 'DELETE'
        };
        return requestHeader;
    }
}
