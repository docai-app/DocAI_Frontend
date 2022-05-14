import { useEffect, useState } from "react";

interface MultipleChoiceOption {
    name: string;
    selected: boolean;
}

interface MultipleChoiceData {
    title: string;
    options: MultipleChoiceOption[];
}

interface MultipleChoiceProps {
    data: MultipleChoiceData;
    updateResult: Function;
    componentId: string | number;
}

function MultipleChoice(props: MultipleChoiceProps) {

    const { updateResult = () => {}, componentId = '' } = props;
    const [ data, setData ] = useState<MultipleChoiceData>(props.data);

    useEffect(() => {
        setData(props.data);
    }, [props.data])

    return (
        <>
            <h3 className="font-bold">
                { data.title }
            </h3>
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 flex-wrap">
                {
                    Array.from(data.options.entries()).map(([key, option]) => (
                        <label className="flex flex-row items-center" key={ key }>
                            <input className="rounded-md p-2 checked:text-slate-500 focus:ring-3 focus:ring-offset-0 focus:ring-slate-300 shadow" type="checkbox" value="" checked={ option.selected || false } onChange={(e) => {
                                let update = {...data};
                                update.options[key].selected = e.target.checked;
                                updateResult(componentId, update);
                            }} />
                            <span className="ml-2">{ option.name }</span>
                        </label>
                    ))
                }
                {/*
                    Relation to the deaceased...
                    Appear when checkbox is ticked?
                */
                    // <div className="col-span-full pl-6">
                    //     <div>
                    //         與死者關係
                    //     </div>
                    //     <input type="text" className="mt-1 border p-2 rounded-md shadow-sm border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-slate-300" />
                    // </div>
                }
                {/* <label className="flex flex-row items-center col-span-full">
                    <input className="rounded-md p-2 checked:text-slate-500 focus:ring-3 focus:ring-offset-0 focus:ring-slate-300 shadow" type="checkbox" value="" />
                    <span className="ml-2">其他</span>
                </label> */}
                {/*
                    Description? Appear when ticked?
                */
                    // <div className="col-span-full pl-6">
                    //     <input type="text" className="border p-2 rounded-md shadow-sm border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-slate-300" />
                    // </div>
                }
            </div>
        </>
    )
}

export default MultipleChoice;