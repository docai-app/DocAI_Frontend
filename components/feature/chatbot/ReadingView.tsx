import _ from 'lodash';
import { useEffect, useState } from 'react';
import AIReadingModel from './models/AIReadingModel';

interface ViewProps {
    chatbot: any;
    setChatbot: any;
}

export default function ReadingView(props: ViewProps) {
    const { chatbot, setChatbot } = props;

    const feature_name = 'reading_comprehension';
    const [checked, setChecked] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (chatbot) {
            setChecked(_.includes(chatbot?.meta?.selected_features, feature_name));
        }
    }, [chatbot]);

    const updateFeature = () => {
        return checked
            ? _.remove(chatbot?.meta?.selected_features, function (feature) {
                  return feature != feature_name;
              })
            : _.concat(chatbot?.meta?.selected_features, feature_name);
    };

    return (
        <>
            <div className="my-4 border rounded-md flex flex-row w-full p-2  bg-gray-100">
                <div className="px-2">
                    <input
                        type={'checkbox'}
                        checked={checked}
                        onClick={() => {
                            setChatbot({
                                ...chatbot,
                                meta: {
                                    ...chatbot?.meta,
                                    selected_features: updateFeature()
                                }
                            });
                        }}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex flex-row justify-between">
                        <label className="text-black">閱讀理解</label>
                        <a
                            className="text-blue-500 underline cursor-pointer  text-sm"
                            onClick={() => {
                                setVisible(true);
                            }}
                        >
                            編輯
                        </a>
                    </div>
                    <div className="mt-2">
                        <label className="text-gray-500 text-sm">
                            顯示標題:
                            <span className="ml-2">
                                {chatbot &&
                                    _.get(chatbot?.meta?.selected_features_titles, feature_name)}
                            </span>{' '}
                        </label>
                    </div>
                </div>
            </div>

            <AIReadingModel
                {...{
                    visable: visible,
                    chatbot,
                    setChatbot,
                    feature_name,
                    cancelClick: () => {
                        setVisible(false);
                    },
                    confirmClick: () => {
                        setVisible(false);
                    }
                }}
            />
        </>
    );
}
