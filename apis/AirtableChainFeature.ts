import Airtable from 'airtable';

// Airtable.configure({
//     apiKey: 'pat8aArOWSiVdiIow.e7064c2f684f7b5e505b37358173120fbdebc18ed3e274b4bfb51ecb05c1f3fb'
// });
// const base = Airtable.base('appiWxjZpXRxUqEkj');
// const table = base('chainfeature');

Airtable.configure({
    apiKey: 'patDV2jBs7LFPmbFb.c1d05a75966bd0d6d7fc51a7266a29da9b8792f5867962ebb3f52a72dd4c866a'
});
const base = Airtable.base('appLD2vnww3WcuOVl');
const table = base('Chain Feature Database');

export async function getAllChainFeatureDatas() {
    const records = await table
        ._selectRecords({ sort: [{ field: 'updated_at', direction: 'desc' }] })
        .all();
    return records;
}

export async function getAllWorkflowChainFeatureDatas() {
    const records = await table
        ._selectRecords({
            filterByFormula: 'NOT(dag_id = 0)',
            sort: [{ field: 'updated_at', direction: 'desc' }]
        })
        .all();
    return records;
}

export async function getAllChainFeatureByIdsDatas(ids?: any[]) {
    let fiters = '';
    ids?.forEach((id, index) => {
        fiters += 'id = "' + id + '"';
        if (index !== ids.length - 1) fiters += ',';
    });

    if (ids && ids.length > 0) {
        const records = await table
            ._selectRecords({
                filterByFormula: 'OR(' + fiters + ')',
                sort: [{ field: 'updated_at', direction: 'desc' }]
            })
            .all();
        return records;
    } else {
        return [];
    }
}

export async function findChainFeatureById(id: string) {
    if (!id) return null;
    const records = await table.find(id);
    return records;
}

export async function createChainFeature(item: any) {
    const records = await table.create([{ fields: item }]);
    return records;
}

export async function updateChainFeatureById(id: string, item: any) {
    if (!id) return null;
    const records = await table.update([{ id: id, fields: item }]);
    return records;
}

export async function deleteChainFeatureById(id: string) {
    if (!id) return null;
    const records = await table.destroy([id]);
    return records;
}
