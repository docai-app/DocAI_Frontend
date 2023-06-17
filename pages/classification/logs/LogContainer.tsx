import { useEffect, useState } from 'react';
import LogView from './LogView';
import useAxios from 'axios-hooks';
import Api from '../../../apis/index';
import { useRouter } from 'next/router';
import moment from 'moment';

const apiSetting = new Api();

function LogContainer() {
    const router = useRouter();
    const [{ data: countDocumentsStatusByDateData, loading }, countDocumentsStatusByDate] =
        useAxios(
            apiSetting.Statistics.countDocumentsStatusByDate(
                moment().format('YYYY-MM-DD'),
                router.query.page
            ),
            {
                manual: true
            }
        );

    useEffect(() => {
        countDocumentsStatusByDate();
    }, [countDocumentsStatusByDate]);

    const [currentTabStatus, setCurrentTabStatus] = useState<'all' | 'unfinish' | 'finish'>('all');

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
    }, [currentTabStatus, countDocumentsStatusByDateData]);

    useEffect(()=>{
        const interval = setInterval(() => {
            countDocumentsStatusByDate()
            console.log('This will load data');
          }, 1000 * 10);
          return () => clearInterval(interval);
    },[])

    return (
        <>
            <LogView
                // data = {data}
                loading={loading}
                {...props}
            />
        </>
    );
}
export default LogContainer;
