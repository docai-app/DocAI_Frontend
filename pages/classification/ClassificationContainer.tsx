import useAxios from 'axios-hooks';
import Api from '../../apis/index';
import ClassificationView from './ClassificationView';

const apiSetting = new Api();

function ClassificationContainer() {
    const [
        {
            data: getDocumentsLabelData,
            loading: getDocumentsLabelLoading,
            error: getDocumentsLabelError,
            response: getDocumentsLabelResponse
        },
        getDocumentsLabel
    ] = useAxios(apiSetting.Classification.getDocumentsLabel(), {
        manual: false
    });
    return (
        <>
            <ClassificationView {...{ getDocumentsLabelData }} />
        </>
    );
}

export default ClassificationContainer;
