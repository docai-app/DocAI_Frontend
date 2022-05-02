import { useEffect, useState } from 'react';
import ValidateView from './ValidateView';
import Api from '../../../apis/index';
import { useRouter } from 'next/router';

const apiSetting = new Api();

function ValidateContainer() {
    const router = useRouter();
    const [formUrl, setFormUrl] = useState('');
    const [result, setResult] = useState({});
    useEffect(() => {
        if (router.query.form_url && router.query.result) {
            setFormUrl(`${router.query.form_url}`);
            setResult(JSON.parse(`${router.query.result}`));
        }
    }, [router]);

    return (
        <>
            <ValidateView
                {...{
                    formUrl,
                    result
                }}
            />
        </>
    );
}

export default ValidateContainer;
