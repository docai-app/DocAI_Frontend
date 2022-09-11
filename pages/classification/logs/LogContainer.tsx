import { useCallback, useEffect, useState } from 'react';
import LogView from './LogView';
import useAxios from 'axios-hooks';
import Api from '../../../apis/index';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Folder } from '../../../components/common/Widget/FolderTree';

const apiSetting = new Api();

function LogContainer() {
    const [currentTabStatus, setCurrentTabStatus] = useState<'all' | 'unfinish' | 'finish'>(
        'all'
    );

    const data = [
        {'status': 'finish', description: '共上傳了1份文檔，智能分類了0份，未處理0份，已處理0份', date: '2022-01-01', other: ''},
        {'status': 'wait', description: '共上傳了1份文檔，智能分類了0份，未處理0份，已處理0份', date: '2022-02-01', other: '等待智能分類中'},
        {'status': 'start', description: '共上傳了1份文檔，智能分類了0份，未處理0份，已處理0份', date: '2022-03-01', other: '正在進行智能分類，需時100分鐘'},
        {'status': 'doing', description: '共上傳了1份文檔，智能分類了0份，未處理0份，已處理0份', date: '2022-04-01', other: ''}
    ]

    const [props, setProps] = useState<any>({
        data: [],
        currentTabStatus: currentTabStatus,
        setCurrentTabStatus: setCurrentTabStatus
    });

    useEffect(() => {
        setProps((p: any) => ({
            ...p,
            data: data
        }));
    }, []);

    useEffect(() => {
        setProps((p: any) => ({
            ...p,
            currentTabStatus: currentTabStatus,
            setCurrentTabStatus: setCurrentTabStatus
        }));
    }, [currentTabStatus]);
    
    return (
        <>
            <LogView
                // data = {data}
                loading = {false}
                {...props}
                // currentTabStatus= {currentTabStatus}
                // setCurrentTabStatus={ setCurrentTabStatus}
            />
        </>
    )
}
export default LogContainer;