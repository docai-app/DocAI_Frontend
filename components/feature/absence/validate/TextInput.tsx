import { useEffect, useState } from 'react';

interface TextInputData {
    title: string;
    value: string;
}

interface TextInputProps {
    data: TextInputData;
    updateResult: Function;
    componentId: string | number;
}

function TextInput(props: TextInputProps) {
    const { updateResult = () => {}, componentId = '' } = props;
    const [data, setData] = useState<TextInputData>(props.data);

    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    return (
        <div className="col-span-full lg:col-span-6">
            <h3 className="font-bold">{props.data.title}</h3>
            <input
                type="text"
                value={props.data.value}
                onChange={(e) => {
                    let update = { ...data };
                    update.value = e.target.value;
                    updateResult(componentId, update);
                }}
                className="mt-1 border p-2 rounded-md shadow-sm border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-slate-300 w-full"
            />
        </div>
    );
}

export default TextInput;
