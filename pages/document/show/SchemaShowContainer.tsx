import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Api from '../../../apis';
import useAlert from '../../../hooks/useAlert';
import SchemaShowView from './SchemaShowView';

const apiSetting = new Api();

export default function SchemaShowContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [formUrl, setFormUrl] = useState('');
    const [data, setData] = useState<any>();
    const [selectedResult, setSelectedResult] = useState<any>();
    useEffect(() => {
        if (router.query.data) {
            setData(JSON.parse(router.query.data as string));
        }
        setFormUrl(`${router.query.form_url}`);
        if (router.query.selectedResult) {
            setSelectedResult(JSON.parse(router.query.selectedResult as string));
        }
    }, [router]);

    return (
        <SchemaShowView
            {...{
                formUrl,
                data,
                selectedResult
            }}
        />
    );
}
