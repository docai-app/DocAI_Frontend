import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import SingleActionModel from '../../../components/common/Widget/SingleActionModel';
import DocumentExtractionRow from '../../../components/feature/document/extraction/DocumentExtractionRow';

interface DocumentExtractionViewProps {
    open: boolean;
    setOpen: any;
    labels: any[];
    updateTagFeatureHandler: any;
    updateLabelNameByIdHandler?: any;
    chain_features?: any;
}

function DocumentExtractionView(props: DocumentExtractionViewProps) {
    const {
        open,
        setOpen,
        labels = [],
        updateTagFeatureHandler,
        updateLabelNameByIdHandler,
        chain_features
    } = props;
    const [chainFeatureIsOpen, setChainFeatureIsOpen] = useState(false);
    const [chain_feature_ids, set_chain_feature_ids] = useState<any>([]);
    const [currectLabel, setCurrectLabel] = useState<any>();

    const handleSave = (chain_feature_ids: any) => {
        updateTagFeatureHandler(currectLabel?.id, chain_feature_ids);
    };

    return (
        <>
            <SingleActionModel
                {...{
                    open,
                    setOpen,
                    title: '正在進行中...',
                    content: '正在加載數據',
                    icon: (
                        <PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    )
                }}
            />
            <div className="max-w-7xl mx-auto h-[calc(100vh-18.5rem)] px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                資源應用工具
                            </h2>
                        </div>
                    </div>
                    <div className="flex float-row flex-wrap">
                        {labels?.map((label, index) => {
                            return (
                                <DocumentExtractionRow
                                    key={index}
                                    position={index}
                                    label={label}
                                    updateTagFeatureHandler={updateTagFeatureHandler}
                                    updateLabelNameByIdHandler={updateLabelNameByIdHandler}
                                    chain_features={chain_features}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
export default DocumentExtractionView;
