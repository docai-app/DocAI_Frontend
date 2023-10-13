import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import SingleActionModel from "../../components/common/Widget/SingleActionModel";
import ShopRow from "../../components/feature/shop/ShopRow";

interface ViewProps {
    open: boolean;
    setOpen: any;
}
export default function ShopView(props: ViewProps) {
    const {
        open,
        setOpen
    } = props
    return (
        <>
            <SingleActionModel
                open={open}
                setOpen={setOpen}
                title={'進行中......'}
                content={'正在加載數據...'}
                icon={<PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />}
            />

            <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            商城
                        </h2>
                    </div>
                </div>
                <p className="text-2xl font-bold  mt-8">Recommended LLM Functions</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4 my-8">
                    <ShopRow
                        title={"CHYB_日常_撰寫Report"}
                        description={"報告內容大綱"}
                        price={"$10"}
                    />
                    <ShopRow
                        title={"GenCF_Email Writer"}
                        description={"Reply to an email or write an email to your designated personnel"}
                        price={"$11"}
                    />
                    <ShopRow
                        title={"CHYB_日常_文件翻譯"}
                        description={" 日常_文件翻譯..."}
                        price={"$5"}
                    />
                    <ShopRow
                        title={"CHYB_日常_構思SOP大綱"}
                        description={"工作流程或過程描述 "}
                        price={"$6"}
                    />
                    <ShopRow
                        title={"CHYB_Handling Customer's Complaints"}
                        description={" CHYB_Handling Customer's Complaints..."}
                        price={"$10"}
                    />
                    <ShopRow
                        title={"General_Bookkeeping"}
                        description={" General_Bookkeeping..."}
                        price={"$20"}
                    />
                </div>

            </div>

        </>
    );
}
