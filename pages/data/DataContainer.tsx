import useAxios from 'axios-hooks';
import { useEffect } from 'react';
import Api from '../../apis';
import DataView from './DataView';

const apiSetting = new Api();

export default function DataContainer() {
    const [{ data: tagFunctionsData }, getTagFunctions] = useAxios(
        apiSetting.Tag.getTagFunctionsById(''),
        {
            manual: false
        }
    );

    useEffect(() => {
        if (tagFunctionsData) {
            console.log('tagFunctionsData', tagFunctionsData);
        }
    }, [tagFunctionsData]);

    return <DataView showAllItemsData={undefined} {...{}} />;
}
