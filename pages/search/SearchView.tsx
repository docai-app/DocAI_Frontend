import { MagnifyingGlassIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PaginationView from '../../components/common/Widget/PaginationView';
import SingleActionModel from '../../components/common/Widget/SingleActionModel';
import AmendLabel from '../../components/feature/classification/AmendLabel';
import DeepUnderstandingModal from '../../components/feature/drive/DeepUnderstandingModal';
import SearchDocumentFilter from '../../components/feature/search/SearchDocumentFilter';
import SearchEditItems from '../../components/feature/search/SearchEditItems';
import SearchRow from '../../components/feature/search/SearchRow';
import EditLabel from '../../components/feature/setting/label/EditLabel';

interface SearchViewProps {
    label?: any;
    searchDocumentFormik: any;
    documents: Array<any>;
    meta: any;
    open: boolean;
    setOpen: any;
    documents_items: any;
    setDocumentsItems: any;
    updateTag: any;
    setUpdateTag: any;
    getAllLabelsData: any;
    confirmDocumentFormik: any;
    newLabelName: string;
    setNewLabelName: any;
    addNewLabelHandler: any;
    schemasStatusReadyData?: any;
    handleDeepUnderstanding?: any;
}

export default function SearchView(props: SearchViewProps) {
    const {
        label,
        searchDocumentFormik = { handleChange: () => {} },
        documents = [],
        meta,
        open,
        setOpen,
        documents_items,
        setDocumentsItems,
        updateTag,
        setUpdateTag,
        getAllLabelsData,
        confirmDocumentFormik,
        newLabelName,
        setNewLabelName,
        addNewLabelHandler,
        schemasStatusReadyData,
        handleDeepUnderstanding
    } = props;
    const router = useRouter();
    const [document, setDocument] = useState<any>();
    const [openEditLabel, setOpenEditLabel] = useState(false);
    const [openAmendLabel, setOpenAmendLabel] = useState(false);
    const [openDeepUnderstanding, setOpenDeepUnderstanding] = useState(false);
    const setChecedkData = (checked: boolean, value: string) => {
        setDocumentsItems([value]);
        // const newData = checked
        //     ? [...documents_items, value]
        //     : documents_items.filter((_value: string) => _value !== value);
        // setDocumentsItems(newData);
    };

    const [searchParam, setSearchParam] = useState({
        tag_id: '',
        label: '',
        from: '',
        to: '',
        content: '',
        page: 1
    });
    useEffect(() => {
        if (router) {
            setSearchParam({
                ...searchParam,
                tag_id: router.query.tag_id as string,
                label: router.query.label as string,
                from: router.query.from as string,
                to: router.query.to as string,
                content: router.query.content as string
            });
        }
    }, [router]);

    return (
        <>
            <SingleActionModel
                open={updateTag}
                setOpen={setUpdateTag}
                title={'進行中......'}
                content={'正在更新...'}
                icon={<PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />}
            />
            <AmendLabel
                open={openAmendLabel}
                setOpen={setOpenAmendLabel}
                allLabelsData={getAllLabelsData}
                confirmDocumentFormik={confirmDocumentFormik}
                isSubmit={true}
                setTagName={(name: string) => {}}
                setOpenEditLabel={setOpenEditLabel}
            />
            <EditLabel
                {...{
                    open: openEditLabel,
                    setOpen: setOpenEditLabel,
                    tagTypes: null,
                    newLabelName: '',
                    setNewLabelName: null,
                    addNewLabelHandler: null
                }}
            />
            <SearchEditItems
                openItems={() => {
                    if (document) window.open(document?.storage_url, '_blank', 'noreferrer');
                }}
                searchItems={() => {
                    if (document)
                        Router.push({
                            pathname: '/generate',
                            query: { document_ids: document.id }
                        });
                }}
                updateTag={() => {
                    setOpenAmendLabel(true);
                }}
                clearItems={() => {
                    setDocumentsItems([]);
                }}
                visibleDeepUnderstanding={true}
                deepUnderstanding={() => {
                    setOpenDeepUnderstanding(true);
                }}
                // count={documents_items?.length}
                count={0}
            />
            <SingleActionModel
                {...{
                    open,
                    setOpen,
                    title: '正在搜尋......',
                    content: '文檔搜尋中，請稍候。',
                    icon: (
                        <MagnifyingGlassIcon
                            className="h-6 w-6 text-green-600"
                            aria-hidden="true"
                        />
                    )
                }}
            />

            <div className="px-16 py-2 flex flex-col h-full">
                <div>
                    <p className=" text-black text-xl font-bold">
                        與 "
                        {searchDocumentFormik?.values?.content ||
                            searchDocumentFormik?.values?.date}
                        " 相關的文檔共有 {meta?.total_count} 份
                    </p>
                </div>
                <div className="flex flex-1 flex-col overflow-y-auto ">
                    <div className="mt-8 mb-8  grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {documents.map((document: any) => {
                            return (
                                <SearchRow
                                    key={document?.id}
                                    document={document}
                                    setChecedkData={setChecedkData}
                                    checked={_.includes(documents_items, document?.id)}
                                    setDocument={setDocument}
                                />
                            );
                        })}
                    </div>
                    <PaginationView
                        meta={meta}
                        pathname={'/search'}
                        params={
                            searchDocumentFormik?.values?.date
                                ? { date: searchDocumentFormik?.values?.date }
                                : searchDocumentFormik?.values?.tag_id
                                ? {
                                      content: searchDocumentFormik?.values?.content,
                                      tag_id: searchDocumentFormik?.values?.tag_id,
                                      from: searchDocumentFormik?.values?.from,
                                      to: searchDocumentFormik?.values?.to
                                  }
                                : { content: searchDocumentFormik?.values?.content }
                        }
                    />
                </div>
                <DeepUnderstandingModal
                    visable={openDeepUnderstanding}
                    schemasStatusReadyData={schemasStatusReadyData}
                    description={`選擇深度理解模型`}
                    cancelClick={() => {
                        setOpenDeepUnderstanding(false);
                    }}
                    confirmClick={(form_schema_id: string, needs_approval: boolean) => {
                        handleDeepUnderstanding(form_schema_id, needs_approval);
                        setOpenDeepUnderstanding(false);
                    }}
                />
                <SearchDocumentFilter
                    label={label}
                    document={document}
                    searchParam={searchParam}
                    setSearchParam={setSearchParam}
                    openItems={() => {
                        if (document) {
                            router.push({
                                pathname: '/document/chat',
                                query: { document_id: document.id }
                            });
                        }
                        // if (document) window.open(document?.storage_url, '_blank', 'noreferrer');
                    }}
                    updateTag={() => {
                        setOpenAmendLabel(true);
                    }}
                    count={documents_items?.length}
                />
            </div>
        </>
    );
}
