// apis/Storage.ts
import axios from 'axios';
import useAxios from 'axios-hooks';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Paramter {
    document: Array<any>;
}

export default class Storage {
    async upload({ document }: Paramter): Promise<any> {
        const response = await axios.post('/upload', {
            document: document
        });
        console.log(response);
        const result = response.data;
        return result;
    }
}
