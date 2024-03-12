import SelectDropdown from '../../common/Widget/SelectDropdown';

interface ViewProps {
    chatbot: any;
    setChatbot: any;
}

export default function SetToneView(props: ViewProps) {
    const { chatbot, setChatbot } = props;
    return (
        <>
            <div className="col-span-full my-4">
                <label className="text-sm font-medium leading-6 text-gray-900 flex justify-start">
                    語氣
                </label>
                <div className="mt-0 w-full">
                    <SelectDropdown
                        defaultValue={chatbot?.meta?.tone || '正常'}
                        onChange={(value: any) => {
                            setChatbot({
                                ...chatbot,
                                meta: {
                                    ...chatbot?.meta,
                                    tone: value
                                }
                            });
                        }}
                        options={[
                            {
                                name: '正常',
                                value: '正常'
                            },
                            {
                                name: '輕鬆',
                                value: '輕鬆'
                            },
                            {
                                name: '專業',
                                value: '專業'
                            }
                        ]}
                    />
                </div>
            </div>
        </>
    );
}
