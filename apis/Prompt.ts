import { AxiosRequestConfig } from 'axios';

// apis/DocumentApproval.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL_PORMHUB;

export default class Prompt {
    getPromptById(id: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            url: `/api/document_prompts/${id}`,
            method: 'GET'
        };
        return requestHeader;
    }

    doc_ai_llm(prompt: string, model?: string) {
        const requestHeader: AxiosRequestConfig = {
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json'
            },
            url: `/prompts/doc_ai_llm/run.json`,
            method: 'POST',
            data: {
                params: {
                    prompt: prompt,
                    openai_meta: { model: model || 'gpt-3.5-turbo-16k' }
                },
                llm_response: true,
                load_cache: true
            }
        };
        return requestHeader;
    }
}
