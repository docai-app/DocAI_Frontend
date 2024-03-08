import SelectDropdown from "../../common/Widget/SelectDropdown";

interface ViewProps {
    chatbot: any;
    setChatbot: any;
}

export default function SetCategoryView(props: ViewProps) {
    const {
        chatbot,
        setChatbot
    } = props
    return (
        <>
            <div className="col-span-full">
                <label className="text-sm font-medium leading-6 text-gray-900 flex justify-start">
                    類型
                </label>
                <div className="mt-2 w-full">
                    <SelectDropdown
                        defaultValue={chatbot?.category || 'qa'}
                        onChange={(value: any) => {
                            setChatbot({
                                ...chatbot,
                                category: value
                            });
                        }}
                        options={[
                            {
                                name: '問答',
                                value: 'qa'
                            },
                            {
                                name: '圖表',
                                value: 'chart_generation'
                            },
                            {
                                name: '統計',
                                value: 'statistical_generation'
                            }
                        ]}
                    />
                </div>
            </div>
        </>
    )
}