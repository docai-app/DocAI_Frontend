import SelectDropdown from "../../common/Widget/SelectDropdown";

interface ViewProps {
    chatbot: any;
    setChatbot: any;
}

export default function SetLengthView(props: ViewProps) {
    const {
        chatbot,
        setChatbot
    } = props
    return (
        <>
            <div className="col-span-full my-4">
                <label className="text-sm font-medium leading-6 text-gray-900 flex justify-start">
                    回答長度
                </label>
                <div className="mt-0 w-full">
                    <SelectDropdown
                        defaultValue={chatbot?.meta?.length || 'normal'}
                        onChange={(value: any) => {
                            setChatbot({
                                ...chatbot,
                                meta: {
                                    ...chatbot?.meta,
                                    length: value
                                }
                            });
                        }}
                        options={[
                            {
                                name: '正常',
                                value: 'normal'
                            },
                            {
                                name: '簡短的',
                                value: 'brief'
                            },
                            {
                                name: '詳細的',
                                value: 'detailed'
                            }
                        ]}
                    />
                </div>
            </div>
        </>
    )
}