import { useCallback, useEffect, useState } from 'react';
import LabelView from './LableView';
import useAxios from 'axios-hooks';
import axios from 'axios';
import { EyeIcon } from '@heroicons/react/outline';
import React from 'react';
import _ from 'lodash';

export default function LabelTag({ label, updateLabelNameByIdHandler, unCheck, onEdit }: any) {
    return (
        <>
            <tr>
                <td className="pt-1"></td>
            </tr>
            <tr key={label?.id} className="rounded-md bg-white border border-gray-200">
                <td className="pl-4">{label?.name}</td>
                {/* <td className="">{'普通文檔'}</td> */}
                <td className="">{_.join(_.map(label?.functions, 'title'), ', ')}</td>
                <td className="flex flex-row justify-center">
                    <a
                        className="w-10 cursor-pointer h-full items-center justify-center text-center"
                        href={`/classification/${label?.id}?name=${label?.name}`}
                    >
                        <EyeIcon className="p-2 text-indigo-500 " />
                    </a>
                    <a
                        className=" cursor-pointer p-3 leading-none text-indigo-500 "
                        onClick={() => {
                            onEdit(label);
                        }}
                    >
                        編輯
                    </a>
                    {label && !label?.is_checked && (
                        <button
                            className=" my-1 p-2 bg-indigo-600 hover:bg-indigo-900 leading-none text-white rounded-md"
                            onClick={() => {
                                updateLabelNameByIdHandler(label.id, label?.name, true);
                            }}
                        >
                            加到名單
                        </button>
                    )}
                </td>
            </tr>
        </>
        // <form
        //     onSubmit={(e) => {
        //         e.preventDefault();
        //         const formData = new FormData(e.currentTarget);
        //         const newName = formData.get('name');
        //         if (newName !== label?.name) {
        //             updateLabelNameByIdHandler(label?.id, newName);
        //         }
        //         setReadOnly(true);
        //     }}
        //     key={label?.id}
        //     className="flex  flex-row  max-w-2xl"
        // >
        //     <div className="flex flex-row  w-4/5 rounded-md bg-white border border-gray-200">
        //         <input
        //             ref={inputRef}
        //             type="text"
        //             name="name"
        //             defaultValue={label?.name}
        //             readOnly={readOnly}
        //             className="flex-1 p-2 border-0   shadow-sm border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-slate-300"
        //         />
        //         {readOnly ? (
        //             <div className="flex-0 flex flex-row items-center">
        //                 <a
        //                     className="w-10 cursor-pointer h-full items-center justify-center text-center"
        //                     href={`/classification/${label?.id}?name=${label?.name}`}
        //                 >
        //                     <EyeIcon className="p-2 text-indigo-500 " />
        //                 </a>

        //                 <a
        //                     className=" cursor-pointer p-3 leading-none text-indigo-500 "
        //                     onClick={() => {
        //                         if (inputRef.current) inputRef.current.focus();
        //                         setReadOnly(false);
        //                     }}
        //                 >
        //                     編輯
        //                 </a>
        //             </div>
        //         ) : (
        //             <button
        //                 className="p-3 bg-indigo-600 hover:bg-indigo-900 leading-none text-white rounded-tr-md rounded-br-md"
        //                 type="submit"
        //             >
        //                 確認
        //             </button>
        //         )}
        //     </div>
        //     {unCheck && (
        //         <button
        //             className="ml-4 p-2 bg-indigo-600 hover:bg-indigo-900 leading-none text-white rounded-md"
        //             type="submit"
        //         >
        //             加到名單
        //         </button>
        //     )}
        // </form>
    );
}
