import _ from 'lodash';
import { useEffect, useState } from 'react';
import AI2AnswerModal from './models/AI2AnswerModel';

interface ViewProps {
    chatbot: any;
    setChatbot: any;
    assistants: any;
    expert_ids: any;
    experts: any;
    setExpert_ids: any;
}

export default function AI2AnswerView(props: ViewProps) {
    const { chatbot, setChatbot, assistants, expert_ids, experts, setExpert_ids } = props;

    const [visible, setVisible] = useState(false);
    const feature_name = 'chatting_plus';
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (chatbot) {
            setChecked(_.includes(chatbot?.meta?.selected_features, feature_name));
        }
    }, [chatbot]);

    const showAssistantLabel = () => {
        const assistan = _.find(assistants, function (ass) {
            return ass.id == chatbot?.meta?.assistant;
        });
        if (assistan) {
            return assistan?.name;
        }
        return '未選擇';
    };

    const showExpertLabel = () => {
        const nameCollection = _.chain(experts)
            .filter((item) => _.includes(expert_ids, item.id))
            .map('name')
            .value();
        if (nameCollection) {
            return nameCollection.toString();
        }
        return '未選擇';
    };

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
                        <label className="text-black">超智能回答</label>
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
                    <div>
                        <label className="text-gray-500 text-sm">
                            助手: <span className="ml-2">{showAssistantLabel()}</span>
                        </label>
                    </div>
                    <div>
                        <label className="text-gray-500 text-sm">
                            專家: <span className="ml-2">{showExpertLabel()}</span>
                        </label>
                    </div>
                </div>
            </div>
            <AI2AnswerModal
                {...{
                    visable: visible,
                    chatbot,
                    setChatbot,
                    assistants,
                    expert_ids,
                    experts,
                    setExpert_ids,
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
