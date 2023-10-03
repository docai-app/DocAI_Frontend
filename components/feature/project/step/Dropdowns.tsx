import { useState } from "react";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

interface DropdownsProps {
    type?: string;
    move?: any;
    rename?: any;
    remove?: any;
    is_completed?: boolean;
}

export default function Dropdowns(props: DropdownsProps) {
    const { type, move, rename, remove, is_completed } = props;
    const statusDatas = [
        {
            name: '待辦',
            value: 'pending'
        },
        {
            name: '進行中',
            value: 'running'
        },
        {
            name: '完成',
            value: 'completed'
        },
        {
            name: '失敗',
            value: 'failed'
        }
    ];
    const [status, setStatus] = useState(statusDatas[0].name);
    return (
        <div >
            <select
                defaultValue={'failed'}
                className="py-0 pr-6 text-center bg-gray-300 text-xs border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                onChange={async (e) => {
                }}
            >
                {statusDatas.map((item, index) => {
                    return (
                        <option key={index} value={item.value} className="text-xs" >
                            {item.name}
                        </option>
                    )
                })}
            </select>
        </div>
    );
}
