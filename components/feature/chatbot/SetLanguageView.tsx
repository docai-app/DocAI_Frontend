import SelectDropdown from '../../common/Widget/SelectDropdown';

interface ViewProps {
    chatbot: any;
    setChatbot: any;
}

export default function SetLanguageView(props: ViewProps) {
    const { chatbot, setChatbot } = props;
    return (
        <>
            <div className="col-span-full my-4">
                <label className="  text-sm font-medium leading-6 text-gray-900  flex justify-start">
                    語言
                </label>
                <div className="mt-0 w-full">
                    <SelectDropdown
                        defaultValue={chatbot?.meta?.language || '繁體中文'}
                        onChange={(value: any) => {
                            setChatbot({
                                ...chatbot,
                                meta: {
                                    ...chatbot?.meta,
                                    language: value
                                }
                            });
                        }}
                        options={[
                            {
                                name: '繁體中文',
                                value: '繁體中文'
                            },
                            {
                                name: '简体中文',
                                value: '简体中文'
                            },
                            {
                                name: '英文',
                                value: '英文'
                            }
                        ]}
                    />
                </div>
            </div>
        </>
    );
}
