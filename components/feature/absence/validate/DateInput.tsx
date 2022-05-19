import { useEffect, useState } from 'react';

interface DateInputData {
    title: string;
    value: string;
}

interface DateInputProps {
    data: DateInputData;
    updateResult: Function;
    componentId: string | number;
}

function DateInput(props: DateInputProps) {
    const { updateResult = () => {}, componentId = '' } = props;
    const [data, setData] = useState<DateInputData>(props.data);

    useEffect(() => {
        console.log(data);
        setData(props.data);
    }, [props.data]);

    return (
        <div className="col-span-full lg:col-span-5">
            <h3 className="font-bold">{data.title}</h3>
            {/* <input type="date" value={ data.value.replaceAll('/','-') } onChange={(e) => {
                let update = {...data};
                update.value = e.target.value;
                updateResult(componentId,update);
            }} className="mt-1 border p-2 rounded-md shadow-sm border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-slate-300 w-full"/> */}
        </div>
    );
}

export default DateInput;
