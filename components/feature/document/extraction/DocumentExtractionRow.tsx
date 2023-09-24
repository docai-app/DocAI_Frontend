import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useAlert from '../../../../hooks/useAlert';
import ChainFeatureSelect from '../../chatbot/ChainFeatureSelect';
import EditLabel from './EditLabel';
import LabelDropdowns from './LabelDropdowns';
interface RowProps {
    position: number;
    label: any;
    updateTagFeatureHandler: any;
    updateLabelNameByIdHandler?: any;
    setCurrectLabel?: any;
    chain_features: [];
}

export default function DocumentExtractionRow(props: RowProps) {
    const {
        position,
        label,
        updateTagFeatureHandler,
        updateLabelNameByIdHandler,
        setCurrectLabel,
        chain_features
    } = props;
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const { setAlert } = useAlert();
    const [chainFeatureIsOpen, setChainFeatureIsOpen] = useState(false);
    const [chain_feature_ids, set_chain_feature_ids] = useState<any>([]);

    useEffect(() => {
        if (label) {
            set_chain_feature_ids(label?.meta?.chain_features || []);
        }
    }, [label]);

    const handleSave = (chain_feature_ids: any) => {
        updateTagFeatureHandler(label?.id, chain_feature_ids);
    };

    const onMouseEnter = () => {
        setVisible(true);
    };
    const onMouseLeave = () => {
        setVisible(false);
    };
    return (
        <>
            <div
                className={`p-8 hover:bg-gray-100 cursor-pointer relative  `}
                onMouseEnter={() => {
                    onMouseEnter();
                }}
                onMouseLeave={() => {
                    onMouseLeave();
                }}
            >
                <Link href={`/search?content=&tag_id=${label?.id}&from=&to=`}>
                    <a className=" items-center text-center">
                        <DocumentMagnifyingGlassIcon className="w-20 h-20" />
                        <p className="w-20">{label.name}</p>
                    </a>
                </Link>
                {visible && (
                    <div className="absolute top-3 right-3 w-6 h-6">
                        <LabelDropdowns
                            edit={() => {
                                setOpen(true);
                            }}
                            data_search={() => {
                                router.push(`/document/extraction/${label.id}`);
                            }}
                            chain_feature={() => {
                                setVisible(false);
                                setChainFeatureIsOpen(true);
                            }}
                            from_filling={() => {
                                setAlert({ title: '未做' });
                            }}
                            approval={() => {
                                setAlert({ title: '未做' });
                            }}
                            add_approval={() => {
                                setAlert({ title: '未做' });
                            }}
                        />
                    </div>
                )}
            </div>
            <EditLabel
                {...{
                    open,
                    setOpen,
                    tag: label,
                    updateLabelNameByIdHandler: updateLabelNameByIdHandler
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
