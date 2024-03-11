import _ from 'lodash';

interface ViewProps {
    expert_ids: any;
    experts: any;
    setExpert_ids: any;
}

export default function SetExpertView(props: ViewProps) {
    const { expert_ids, experts, setExpert_ids } = props;
    return (
        <>
            <div className="col-span-full my-2">
                <label className="  text-sm font-medium leading-6 text-gray-900 text-left items-start flex justify-start">
                    專家
                </label>
                <div className="mt-2 w-full flex flex-col justify-start items-start">
                    {experts?.map((item: any, index: number) => {
                        return (
                            <div key={index} className="flex flex-row items-start my-1">
                                <div className="py-0 px-2">
                                    <input
                                        type={'checkbox'}
                                        name="expert"
                                        value={item.id}
                                        checked={expert_ids && expert_ids?.indexOf(item.id) != -1}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setExpert_ids((arr: any) => [...arr, item.id]);
                                            } else {
                                                const ids = _.remove(expert_ids, function (x) {
                                                    return x !== item.id;
                                                });
                                                setExpert_ids(ids);
                                            }
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col items-start justify-start">
                                    {item.name}
                                    <span className="text-xs text-gray-500 text-left">
                                        ({item.description})
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
