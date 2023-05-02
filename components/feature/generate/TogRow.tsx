import copy from 'copy-to-clipboard';
import moment from 'moment';

interface LogRowProps {
    log?: any;
    setAlert?: any;
}
export default function GenerateLogRow(props: LogRowProps) {
    const { log, setAlert } = props;
    return (
        <div className="flex flex-row justify-between items-center p-2">
            <div className="flex-wrap">
                <div>
                    <label className="text-sm">{log?.content}</label>
                    <span className="inline-flex items-center ml-2 px-1 h-4 rounded-full text-xs font-medium bg-green-100 text-black">
                        Complete
                    </span>
                </div>
                <div>
                    <label className="text-sm text-gray-500">
                        {moment(log?.created_at).toNow()}
                    </label>
                    <label className="text-sm text-gray-500"> · Created by {log?.email}</label>
                </div>
            </div>
            <div>
                <a
                    className=" cursor-pointer p-[0.25rem] ml-4 rounded bg-white text-black border-gray-300 border leading-none"
                    onClick={() => {
                        copy(log?.content);
                        setAlert({
                            title: '已複製到粘貼板',
                            type: 'success'
                        });
                    }}
                >
                    copy
                </a>
            </div>
        </div>
    );
}
