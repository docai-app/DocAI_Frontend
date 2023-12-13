import Dropdowns from './Dropdowns';

interface Props {
    item: any;
    edit: any;
    isEdit?: boolean;
    remove: any;
    add?: any;
}
export default function StoryboardStatisticItemView(props: Props) {
    const { item, isEdit = false, edit, remove, add } = props;
    return (
        <>
            <div className=" relative h-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm flex items-start space-x-3  focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                {item != null ? (
                    <>
                        <div className=" min-h-[300px]">
                            <p className="text-md font-medium text-gray-900">{item?.query}</p>
                            <div className="text-sm text-gray-500  mt-2 break-all">
                                {item?.data?.split('\n').map((item: string, index: number) => (
                                    <p key={index}>{item}</p>
                                ))}
                            </div>
                        </div>
                        {isEdit && (
                            <div className=" absolute top-2 right-2">
                                <Dropdowns edit={edit} remove={remove} />
                            </div>
                        )}
                    </>
                ) : (
                    <div
                        className="w-full min-h-[300px] flex justify-center items-center cursor-pointer"
                        onClick={add}
                    >
                        <p className="text-4xl   text-gray-400 ">+</p>
                    </div>
                )}
            </div>
        </>
    );
}
