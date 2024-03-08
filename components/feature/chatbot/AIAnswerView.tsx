import _ from "lodash";
import { useState } from "react";
import AIAnswerModal from "./models/AIAnswerModel";

interface ViewProps {
    chatbot: any;
    setChatbot: any;
}

export default function AIAnswerView(props: ViewProps) {
    const {
        chatbot,
        setChatbot
    } = props

    const [visible, setVisible] = useState(false)
    const options =
        [
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
        ]
    const showLengthLabel = () => {
        if (!chatbot?.meta?.length) return '正常'
        const option = _.find(options, function (option) {
            return option.value == chatbot?.meta?.length
        })
        return option?.name
    }

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
                        <label className='text-black'>智能回答</label>
                        <a className='text-blue-500 underline cursor-pointer text-sm'
                            onClick={() => {
                                setVisible(true)
                            }}>編輯</a>
                    </div>
                    <div className="mt-2">
                        <label className='text-gray-500 text-sm'>顯示標題:<span className='ml-2'>基本問題</span> </label>
                    </div>
                    <div>
                        <label className='text-gray-500 text-sm'>語言: <span className='ml-2'>{chatbot?.meta?.language || '繁體中文'}</span></label>
                    </div>
                    <div>
                        <label className='text-gray-500 text-sm'>語氣: <span className='ml-2'>{chatbot?.meta?.tone || '正常'}</span></label>
                    </div>
                    <div>
                        <label className='text-gray-500 text-sm'>回答長度: <span className='ml-2'>{showLengthLabel()}</span></label>
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