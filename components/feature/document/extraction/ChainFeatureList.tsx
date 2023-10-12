import { useState } from 'react';
import MyModal from '../../../common/Widget/MyModal';
import ChainFeatureSelect from '../../chatbot/ChainFeatureSelect';
import ChainFeatureRow from './ChainFeatureRow';

interface Props {
    label: any;
    chain_features: [];
    chain_feature_ids: any;
    set_chain_feature_ids: any;
    handleSave?: any;
}

export default function ChainFeatureList(props: Props) {
    const { label, chain_features, chain_feature_ids, set_chain_feature_ids, handleSave } = props;
    const [visableDelete, setVisableDelete] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [chainFeatureIsOpen, setChainFeatureIsOpen] = useState(false);
    const removeChainFeature = () => {
        chain_feature_ids?.splice(currentPosition, 1);
        const newTasks = [...chain_feature_ids];
        set_chain_feature_ids(newTasks);
        handleSave(chain_feature_ids);
    };
    return (
        <>
            <div className="inline-block min-w-full py-0 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                            >
                                名稱
                            </th>
                            <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                            >
                                描述
                            </th>
                            <th
                                scope="col"
                                className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
                            >
                                <div className="flex justify-end">
                                    <a
                                        className=" cursor-pointer block rounded-md  text-center text-sm font-semibold text-indigo-500  hover:text-indigo-700  "
                                        onClick={() => {
                                            setChainFeatureIsOpen(true);
                                        }}
                                    >
                                        + Chain Feature
                                    </a>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {chain_feature_ids?.map((chain_feature_id: any, index: number) => {
                            return (
                                <ChainFeatureRow
                                    key={index}
                                    chain_features={chain_features}
                                    chain_feature_id={chain_feature_id}
                                    remove={() => {
                                        setCurrentPosition(index);
                                        setVisableDelete(true);
                                    }}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <MyModal
                visable={visableDelete}
                description={`是否刪除?`}
                cancelClick={() => {
                    setVisableDelete(false);
                }}
                confirmClick={() => {
                    setVisableDelete(false);
                    removeChainFeature();
                }}
            />

            <ChainFeatureSelect
                chain_features={chain_features}
                isOpen={chainFeatureIsOpen}
                setIsOpen={setChainFeatureIsOpen}
                chain_feature_ids={chain_feature_ids}
                set_chain_feature_ids={set_chain_feature_ids}
                handleSave={handleSave}
            />
        </>
    );
}
