import useAxios from 'axios-hooks';
import Api from '../../apis/index';
import ClassificationView from './ClassificationView';

const apiSetting = new Api();

function ClassificationContainer() {
    const [
        {
            data: allLabelsData,
            loading: allLabelsLoading,
            error: allLabelsError,
            response: allLabelsResponse
        },
        getAllLabels
    ] = useAxios(apiSetting.Label.getAllLabels(), {
        manual: false
    });
    return (
        <>
            <ClassificationView {...{ allLabelsData }} />
        </>
    );
}

export default ClassificationContainer;
