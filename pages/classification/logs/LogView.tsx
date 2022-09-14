import { useState, useEffect, Dispatch, SetStateAction, Fragment } from 'react';
import { Document, Page } from 'react-pdf';
import _get from 'lodash/get';
import FolderTree, { Folder } from '../../../components/common/Widget/FolderTree';
import { ClockIcon } from '@heroicons/react/outline';

interface LatestPredictionDataProps {
    prediction: any;
}

interface LogViewProps {
    latestPredictionData: LatestPredictionDataProps;
    confirmDocumentFormik: any;
    addNewTagFormik: any;
    allLabelsData: object;
    mode: 'view' | 'move';
    setMode: Dispatch<SetStateAction<'view' | 'move'>>;
    movingDest: Folder | null;
    setMovingDest: Dispatch<SetStateAction<Folder | null>>;
    documentPath: { id: string | null; name: string }[];
    visable: boolean;
    setVisable: any;
}

function LogView(props: any) {
    const { data = [], currentTabStatus, setCurrentTabStatus, formSchema, loading, error } = props;
    const [open, setOpen] = useState(false);

    function handleChange(e: any) {
        console.log(e.target.value);
    }
    return (
        <>
            <div className=" container mx-auto md:px-4 lg:px-6">
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
                        <li
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
                        </li>
                    </ul>
                </div>
                {loading ? (
                    <div>載入中...</div>
                ) : (
                    data && (
                        <>
                            <div className="  w-full   overflow-hidden  ">
                                {data.map((item: any, index: number) => {
                                    return (
                                        <div className="mt-6" key={index}>
                                            <p className="text-back font-bold">{item.date}</p>

                                            <div className="flex flex-row items-center my-2">
                                                <label className=" text-sm">
                                                    {item.description}
                                                </label>
                                                {item.status == 'doing' && (
                                                    <a
                                                        className="p-2 text-sm underline text-indigo-500"
                                                        href={'/classification/validate'}
                                                    >
                                                        繼續處理
                                                    </a>
                                                )}
                                                {item.status == 'finish' && (
                                                    <a
                                                        className="p-2 text-sm underline text-indigo-500"
                                                        href={'/classification/validate'}
                                                    >
                                                        查看
                                                    </a>
                                                )}
                                            </div>

                                            {(item.status == 'wait' || item.status == 'start') && (
                                                <div className="flex flex-row items-center">
                                                    <ClockIcon className="w-5 h-5 text-green-500" />
                                                    <p className="ml-1 text-green-500 text-sm">
                                                        {item.other}
                                                    </p>
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
