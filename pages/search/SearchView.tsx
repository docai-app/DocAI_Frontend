import { MagnifyingGlassIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import Router from 'next/router';
import { useState } from 'react';
import PaginationView from '../../components/common/Widget/PaginationView';
import SingleActionModel from '../../components/common/Widget/SingleActionModel';
import AmendLabel from '../../components/feature/classification/AmendLabel';
import SearchEditItems from '../../components/feature/search/SearchEditItems';
import SearchRow from '../../components/feature/search/SearchRow';
import EditLabel from '../../components/feature/setting/label/EditLabel';

interface SearchViewProps {
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
}

export default function SearchView(props: SearchViewProps) {
    const {
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
        addNewLabelHandler
    } = props;
    const [document, setDocument] = useState<any>();
    const [openEditLabel, setOpenEditLabel] = useState(false);
    const [openAmendLabel, setOpenAmendLabel] = useState(false);
    const setChecedkData = (checked: boolean, value: string) => {
        setDocumentsItems([value]);
        // const newData = checked
        //     ? [...documents_items, value]
        //     : documents_items.filter((_value: string) => _value !== value);
        // setDocumentsItems(newData);
    };

    return (
        <>
            <SingleActionModel
                open={updateTag}
                setOpen={setUpdateTag}
                title={'進行中......'}
                content={'正在更新標籤...'}
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
                        Router.push({ pathname: '/generate', query: { document_id: document.id } });
                }}
                updateTag={() => {
                    setOpenAmendLabel(true);
                }}
                clearItems={() => {
                    setDocumentsItems([]);
                }}
                count={documents_items?.length}
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
            {/* <div className="bg-indigo-700">
                <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">DocAI</span>
                        <span className="block">搜尋你的文檔</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-indigo-200">
                        輸入文件的關鍵字或文件的相關內容，我們就會幫你找到你想要的文件。
                    </p>
                    <section className="mt-4 w-full sm:flex sm:items-center justify-center items-center">
                        <div className="w-full sm:max-w-xs">
                            <label htmlFor="content" className="sr-only">
                                內容
                            </label>
                            <input
                                type="text"
                                name="content"
                                id="content"
                                className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="輸入文件的關鍵字或文件的相關內容"
                                onChange={searchDocumentFormik.handleChange('content')}
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => {
                                searchDocumentFormik.handleSubmit();
                            }}
                        >
                            搜尋 🔍
                        </button>
                    </section>
                </div>
            </div> */}
            <div>
                <p className=" text-black text-xl font-bold">
                    與 "
                    {searchDocumentFormik?.values?.content || searchDocumentFormik?.values?.date}"
                    相關的文檔共有 {meta?.total_count} 份
                </p>
            </div>
            <div className="px-16">
                <div className="mt-8 mb-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
        </>
    );
}
