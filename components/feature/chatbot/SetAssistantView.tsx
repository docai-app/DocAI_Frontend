interface ViewProps {
    assistants: any;
    chatbot: any;
    setChatbot: any;
}

export default function SetAssistantView(props: ViewProps) {
    const { assistants, chatbot, setChatbot } = props;
    return (
        <>
            <div className="col-span-full my-0">
                <label className="text-sm font-medium leading-6 text-gray-900 flex justify-start">
                    助手
                </label>
                <div className="mt-0 w-full flex flex-col justify-start items-start">
                    {assistants?.map((item: any, index: number) => {
                        return (
                            <div key={index} className="flex flex-row items-start my-1">
                                <div className="py-0 px-2">
                                    <input
                                        type={'radio'}
                                        name="assistant"
                                        value={item.id}
                                        checked={item.id == chatbot?.meta?.assistant}
                                        onChange={(e) => {
                                            setChatbot({
                                                ...chatbot,
                                                meta: {
                                                    ...chatbot?.meta,
                                                    assistant: item.id
                                                }
                                            });
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
