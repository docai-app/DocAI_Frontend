import useAxios from 'axios-hooks';
import Api from '../../apis/index';
import ClassificationView from './ClassificationView';

const apiSetting = new Api();

function ClassificationContainer() {
    const [{ data: getTagByTaggingData }] = useAxios(apiSetting.Tag.getTagByTagging(), {
        manual: false
    });
    return (
        <>
            <ClassificationView {...{ getTagByTaggingData }} />
        </>
    );
}

export default ClassificationContainer;
