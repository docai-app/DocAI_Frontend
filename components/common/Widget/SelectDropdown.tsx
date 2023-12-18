/* This example requires Tailwind CSS v2.0+ */

interface Props {
    defaultValue: any;
    onChange: any;
    options: any;
}

export default function SelectDropdown(props: Props) {
    const { defaultValue = '', onChange, options } = props;
    return (
        <select
            key={Date.now()}
            className="w-full border border-gray-300 rounded-md  "
            defaultValue={defaultValue}
            onChange={(e) => {
                onChange(e.target.value);
            }}
        >
            {options?.map((item: any, index: number) => {
                return (
                    <option key={index} className="w-full border rounded-md  " value={item.value}>
                        {item.name}
                    </option>
                );
            })}
        </select>
    );
}
