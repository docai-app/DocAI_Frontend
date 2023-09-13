import { EyeIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';

export default function LabelTag({
    label,
    updateLabelNameByIdHandler,
    setLabel,
    unCheck,
    onEdit
}: any) {
    return (
        <>
            <tr>
                <td className="pt-1"></td>
            </tr>
            <tr key={label?.id} className="rounded-md bg-white border border-gray-200">
                <td className="pl-4">
                    <a
                        className="w-10 cursor-pointer h-full items-center justify-center text-center text-indigo-500"
                        href={`/search?content=&tag_id=${label?.id}&from=&to=`}
                    >
                        {label?.name}
                    </a>
                </td>
                <td className="">{_.join(_.map(label?.functions, 'title'), ', ')}</td>
                <td className="flex flex-row justify-center items-center">
                    <a
                        className="w-10 cursor-pointer h-full items-center justify-center text-center hidden"
                        href={`/search?content=&tag_id=${label?.id}&from=&to=`}
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
                    {label && label?.is_checked && (
                        <>
                            {'|'}
                            <a
                                className=" cursor-pointer p-3 leading-none text-indigo-500 "
                                onClick={() => {
                                    setLabel(label);
                                }}
                            >
                                選擇Features
                            </a>
                        </>
                    )}
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
    );
}
