import { useEffect, useState } from "react";

interface NumberInputData {
    title: string;
    value: number;
}

interface NumberInputProps {
    data: NumberInputData;
    updateResult: Function;
    componentId: string | number;
}

function NumberInput (props: NumberInputProps) {

    const { updateResult = () => {}, componentId = '' } = props;
    const [data, setData] = useState<NumberInputData>(props.data);

    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    return (
        <div className="col-span-4 lg:col-span-3">
            <h3 className="font-bold">
                { data.title }
            </h3>
            <input type="number" value={ data.value } onChange={(e) => {
                let update = {...data};
                if (/^-?\d+$/.test(e.target.value)) update.value = parseInt(e.target.value);
                else if (e.target.value === '') update.value = 0;
                updateResult(componentId,update);
            }} className="mt-1 border p-2 rounded-md shadow-sm border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-slate-300 w-full"/>
        </div>
    )
}

export default NumberInput;