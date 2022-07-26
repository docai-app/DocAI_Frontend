import axios from 'axios';
import useAxios from 'axios-hooks';
import { useEffect } from 'react';
import Api from '../../apis/index';
import ClassificationView from './ClassificationView';

const apiSetting = new Api();

function ClassificationContainer() {
    const [{ data: getTagByTaggingData }] = useAxios(apiSetting.Tag.getTagByTagging(), {
        manual: false
    });
    useEffect(() => {
        axios.defaults.headers.common['authorization'] =
            localStorage.getItem('authorization') || '';
    }, []);
    return (
        <>
            <ClassificationView {...{ getTagByTaggingData }} />
        </>
    );
}

export default ClassificationContainer;
