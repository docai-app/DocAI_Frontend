import { useState } from "react";
import AIAnswerModal from "./models/AIAnswerModel";

interface ViewProps {
    chatbot: any;
    setChatbot: any;
}

export default function AIDataView(props: ViewProps) {
    const {
        chatbot,
        setChatbot
    } = props

    const [visible, setVisible] = useState(false)

    return (
        <>
            <div className='my-4 border rounded-md flex flex-row w-full p-2  bg-gray-100'>
                <div className='px-2'>
                    <input
                        type={'checkbox'}
                        onClick={() => {

                        }}
                    />
                </div>
                <div className='flex flex-col w-full'>
                    <div className='flex flex-row justify-between'>
                        <label className='text-black'>智能數據</label>

                    </div>
                </div>

            </div>
            <AIAnswerModal
                {...{
                    visable: visible,
                    chatbot,
                    setChatbot,
                    cancelClick: () => {
                        setVisible(false)
                    },
                    confirmClick: () => {
                        setVisible(false);
                    }
                }} />
        </>
    )
}