import _ from "lodash";

interface StatusLabelViewProps {
    status: string
}

export default function StatusLabelView(props: StatusLabelViewProps) {
    const {
        status,
    } = props

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

    const showStatusName = (value: string) => {
        if (_.isEmpty(value)) return '';
        const data: any = _.find(statusDatas, function (s) {
            return (s.value == value);
        });
        return data.name;
    };

    const showStatusColor = (value: string) => {
        let color = ''
        switch (value) {
            case 'pending':
                color = 'bg-gray-500'
                break;
            case 'running':
                color = 'bg-gray-500'
                break;
            case 'completed':
                color = 'bg-green-500'
                break;
            case 'failed':
                color = 'bg-red-500'
                break;
            default:
                color = 'bg-gray-500'
                break;
        }
        return color
    };

    return (
        <div className={`flex flex-0 flex-row px-2 py-1   rounded-md  ${showStatusColor(status)} `}>
            <label className={`text-xs text-white`}>
                {showStatusName(status)}
            </label>
            {/* <ChevronDownIcon className="w-4 text-white" /> */}
        </div>
    )
}