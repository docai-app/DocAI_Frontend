interface ViewProps {
    title: string;
    placeholder: string;
    defaultValue: string;
    onChange: any;
}

export default function InputTextView(props: ViewProps) {
    const { title, placeholder, defaultValue, onChange } = props;

    return (
        <div className="w-full flex flex-col items-start">
            <label className="block text-sm font-medium leading-6 text-gray-900">{title}</label>
            <div className="mt-2 w-full">
                <input
                    id="name"
                    type="text"
                    name="name"
                    defaultValue={defaultValue}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={placeholder}
                    onChange={(e) => {
                        onChange(e.target.value);
                    }}
                />
            </div>
        </div>
    );
}
