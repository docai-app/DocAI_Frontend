import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Api from '../../../apis';
import DocumentExtractionView from './DocumentExtractionView';

const apiSetting = new Api();

export default function DocumentExtractionContainer() {
    const router = useRouter();
    const [labels, setLabels] = useState([]);
    const [{ data: tagFunctionsData }] = useAxios(apiSetting.Form.schemasStatusReady(), {
        manual: false
    });

    const [{ data: getAllLabelsData, loading: loading, error: getAllLabelsError }, getAllLabels] =
        useAxios(apiSetting.Tag.getAllTags(), { manual: true });

    useEffect(() => {
        getAllLabels();
    }, [router]);

    useEffect(() => {
        if (getAllLabelsData && getAllLabelsData.success) {
            setLabels(getAllLabelsData.tags);
        }
    }, [getAllLabelsData]);

    return <DocumentExtractionView labels={labels} />;
}
