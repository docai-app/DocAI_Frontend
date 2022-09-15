import { useCallback, useEffect, useState } from 'react';
import LogView from './LogView';
import useAxios from 'axios-hooks';
import Api from '../../../apis/index';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Folder } from '../../../components/common/Widget/FolderTree';
import moment from 'moment';

const apiSetting = new Api();

function LogContainer() {

    const [{ data: countDocumentsStatusByDateData, loading }, countDocumentsStatusByDate] = useAxios(
        apiSetting.Statistics.countDocumentsStatusByDate(
            moment().format('YYYY-MM-DD')
        ),
        { manual: true }
    );

    useEffect(() => {
        countDocumentsStatusByDate();
    }, [ countDocumentsStatusByDate]);

    const [currentTabStatus, setCurrentTabStatus] = useState<'all' | 'unfinish' | 'finish'>(
        'all'
    );


    const [props, setProps] = useState<any>({
        currentTabStatus: currentTabStatus,
        setCurrentTabStatus: setCurrentTabStatus
    });


    useEffect(() => {
        setProps((p: any) => ({
            ...p,
            currentTabStatus: currentTabStatus,
            setCurrentTabStatus: setCurrentTabStatus,
            countDocumentsStatusByDateData
        }));
    }, [currentTabStatus,countDocumentsStatusByDateData]);
    
    return (
        <>
            <LogView
                // data = {data}
                loading = {loading}
                {...props}
            />
        </>
    )
}
export default LogContainer;