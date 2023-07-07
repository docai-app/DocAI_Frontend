import copy from 'copy-to-clipboard';
import moment from 'moment';

interface LogRowProps {
    log?: any;
    setAlert?: any;
    setVisible?: any;
    data: any;
    setData?: any;
}
export default function GenerateLogRow(props: LogRowProps) {
    const { log, setAlert, setVisible, data, setData } = props;

    return (
        <div className="flex flex-col justify-between p-2">
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
            <div className="m-2 flex justify-end  items-center">
                <a
                    className="cursor-pointer p-[0.5rem] mx-2 rounded bg-white text-black border-gray-300 border leading-none hover:border-transparent hover:bg-gray-300"
                    onClick={() => {
                        copy(log?.content);
                        setAlert({
                            title: '已複製到粘貼板',
                            type: 'success'
                        });
                    }}
                >
                    Copy
                </a>
                <a
                    className="cursor-pointer p-[0.5rem] mx-2 rounded  bg-indigo-600 text-white border-indigo-500 border leading-none hover:border-transparent hover:bg-indigo-500"
                    onClick={() => {
                        setData({
                            ...data,
                            content: log?.content
                        })
                        setVisible(true)
                    }}
                >
                    儲存
                </a>
            </div>

        </div>
    );
}
