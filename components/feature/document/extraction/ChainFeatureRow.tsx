import _ from 'lodash';

interface RowProps {
    chain_feature_id: any;
    chain_features: [];
    remove?: any;
}

export default function ChainFeatureRow(props: RowProps) {
    const { chain_feature_id, chain_features, remove } = props;

    const getChainFeature = (id: number) => {
        const chain_feature = _.find(chain_features, function (chain_feature: any) {
            return chain_feature?.fields?.id == id;
        });
        return chain_feature?.fields;
    };
    return (
        <>
            <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    {getChainFeature(chain_feature_id)?.name}
                </td>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    {getChainFeature(chain_feature_id)?.description}
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <a className="text-red-500 hover:text-red-600 cursor-pointer" onClick={remove}>
                        刪除
                    </a>
                </td>
            </tr>
        </>
    );
}
