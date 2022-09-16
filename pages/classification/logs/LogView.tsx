import { useState, useEffect, Dispatch, SetStateAction, Fragment } from 'react';
import { Document, Page } from 'react-pdf';
import _get from 'lodash/get';
import FolderTree, { Folder } from '../../../components/common/Widget/FolderTree';
import { ClockIcon } from '@heroicons/react/outline';
import label from '../../setting/label';
import Router from 'next/router';

interface LatestPredictionDataProps {
    prediction: any;
}

function LogView(props: any) {
    const { currentTabStatus , setCurrentTabStatus, countDocumentsStatusByDateData, loading, error } = props;
    
    return (
        <>
            <div className=" container mx-auto md:px-4 lg:px-6 pb-10">
                <div className="mb-4 border-gray-300 border-b">
                    <ul className="flex flex-row -my-px">
                        <li
                            onClick={() => setCurrentTabStatus('all')}
                            className={`p-4 cursor-pointer ${
                                currentTabStatus === 'all'
                                    ? 'text-indigo-700 border-b-2 border-indigo-700'
                                    : 'text-gray-400'
                            } font-bold text-sm`}
                        >
                            全部
                        </li>
                        {/* <li
                            onClick={() => setCurrentTabStatus('unfinish')}
                            className={`p-4 cursor-pointer ${
                                currentTabStatus === 'unfinish'
                                    ? 'text-indigo-700 border-b-2 border-indigo-700'
                                    : 'text-gray-400'
                            } font-bold text-sm`}
                        >
                            未處理
                        </li>
                        <li
                            onClick={() => setCurrentTabStatus('finish')}
                            className={`p-4 cursor-pointer ${
                                currentTabStatus === 'finish'
                                    ? 'text-indigo-700 border-b-2 border-indigo-700'
                                    : 'text-gray-400'
                            } font-bold text-sm`}
                        >
                            已處理
                        </li> */}
                    </ul>
                </div>
                {loading ? (
                    <div>載入中...</div>
                ) : (
                    countDocumentsStatusByDateData && (
                        <>
                            <div className="  w-full   overflow-hidden  ">
                                {countDocumentsStatusByDateData?.data.map((item: any, index: number) => {
                                    return (
                                        <div className='mb-4' key={index}>
                                            <p className='text-back font-bold'>{item.date}</p>

                                            <div className='flex flex-row items-center my-0'>
                                                <label className=' text-sm' >共上傳了 <label className="font-bold">{item.uploaded_count}</label>  份文檔，智能處理了  <label className="font-bold">{item.confirmed_count}</label>  份，未處理  <label className="font-bold">{item.non_ready_count}</label>  份，已處理  <label className="font-bold">{item.ready_count}</label>  份</label>
                                                {
                                                    item.uploaded_count != item.ready_count && <a className='p-2 text-sm underline text-indigo-500' href={'/classification/validate'}>繼續處理</a>
                                                }
                                                {
                                                    item.uploaded_count == item.ready_count&& <button className='p-2 text-sm underline text-indigo-500' onClick={() => {
                                                        if( item.date )
                                                            Router.push({pathname: '/search', query: {'date': item.date}})
                                                    }}>查看</button>
                                                }
                                            </div>
                                            
                                            {
                                                ( item.estimated_time > 0 ) &&
                                                <div className='flex flex-row items-center'> 
                                                    <ClockIcon className='w-5 h-5 text-green-500'/>
                                                    <p className='ml-1 text-green-500 text-sm'>正在進行智能分類，需時  {item.estimated_time / 60}  分鐘</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )
                )}
            </div>
        </>
    );
}

export default LogView;
