interface Props {
    item: any;
}
export default function StoryboardStatisticItemView(props: Props) {
    const { item } = props;
    return (
        <>
            <div className="h-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm flex items-start space-x-3  focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <div className=" min-h-[300px]">
                    <p className="text-md font-medium text-gray-900">{item.query}</p>
                    <div className="text-sm text-gray-500  mt-2 break-all">
                        {item.data?.split('\n').map((item: string, index: number) => (
                            <p key={index}>{item}</p>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
