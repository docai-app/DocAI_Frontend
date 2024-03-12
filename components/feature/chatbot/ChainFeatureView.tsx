import _ from 'lodash';
import { useEffect, useState } from 'react';
import ChainFeatureSelect from './ChainFeatureSelect';
import AIChainFeatureModel from './models/AIChainFeatureModel';

interface ViewProps {
    chatbot: any;
    setChatbot: any;
    chain_features: any;
    chain_feature_ids: any;
    set_chain_feature_ids: any;
}

export default function ChainFeatureView(props: ViewProps) {
    const { chatbot, setChatbot, chain_features, chain_feature_ids, set_chain_feature_ids } = props;
    const [chainFeatureIsOpen, setChainFeatureIsOpen] = useState(false);
    const [chain_feature_labels, set_chain_feature_labels] = useState('');

    const feature_name = 'intelligent_mission';
    const [checked, setChecked] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (chain_feature_ids?.length == 0) {
            set_chain_feature_labels('未選擇');
        } else {
            const nameCollection = _.chain(chain_features)
                .filter((item) => _.includes(chain_feature_ids, item.fields.id))
                .map('fields.name')
                .value();
            if (nameCollection) {
                set_chain_feature_labels(nameCollection.toString());
            }
        }
    }, [chain_features, chain_feature_ids]);

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
                        <label className="text-black">智能任务</label>
                        <a
                            className="text-blue-500 underline cursor-pointer  text-sm"
                            onClick={() => {
                                // setChainFeatureIsOpen(!chainFeatureIsOpen);
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
                            Chain Feature: <span className="ml-2">{chain_feature_labels}</span>
                        </label>
                    </div>
                </div>
            </div>

            <AIChainFeatureModel
                {...{
                    visable: visible,
                    chatbot,
                    setChatbot,
                    feature_name,
                    setIsOpen: setChainFeatureIsOpen,
                    chain_feature_labels,
                    cancelClick: () => {
                        setVisible(false);
                    },
                    confirmClick: () => {
                        setVisible(false);
                    }
                }}
            />

            <ChainFeatureSelect
                {...{
                    chain_features: chain_features,
                    isOpen: chainFeatureIsOpen,
                    setIsOpen: setChainFeatureIsOpen,
                    chain_feature_ids,
                    set_chain_feature_ids
                }}
            />
        </>
    );
}
