import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { TableCellsIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import Router from 'next/router';
import { useState } from 'react';
import EditSchemaDataModal from '../../../../../components/common/Widget/EditSchemaDataModal';
import LabelSelect from '../../../../../components/common/Widget/LabelSelect';
import SingleActionModel from '../../../../../components/common/Widget/SingleActionModel';
import ExtractSchemaRow from '../../../../../components/feature/document/extraction/ExtractSchemaRow';

interface SchemaViewProps {
    open: boolean;
    setOpen: any;
    extractSchema: {
        name: string;
        description: string;
        // label_ids: any[];
        schema: any[];
        data_schema: any;
    };
    setExtractSchema: any;
    handleSave: any;
    actionContent: string;
    visableAdd?: boolean;
    tags: [];
    tag_ids: [];
    set_tag_ids: any;
    getAllLabelsDataLoading: boolean;
}

function SchemaView(props: SchemaViewProps) {
    const {
        open,
        setOpen,
        extractSchema,
        setExtractSchema,
        handleSave,
        actionContent,
        visableAdd = true,
        tags,
        tag_ids,
        set_tag_ids,
        getAllLabelsDataLoading
    } = props;
    const [visable, setVisable] = useState(false);
    const [currectExtraScheam, setCurrectExtraSchema] = useState();
    const [currectPosition, setCurrectPosition] = useState(-1);
    const [tagIsOpen, setTagIsOpen] = useState(false);

    const editExtraSchema = (position: number) => {
        setVisable(true);
        setCurrectPosition(position);
        setCurrectExtraSchema(extractSchema?.schema[position]);
    };

    const removeExtraSchema = (position: number) => {
        extractSchema?.schema.splice(position, 1);
        setExtractSchema({
            ...extractSchema,
            schema: extractSchema?.schema
        });
    };

    const handleConfirmTagIds = (tag_ids: any) => {
        set_tag_ids(tag_ids);
    };

    const getTag = (tag_id: string) => {
        return _.find(tags, function (tag: any) {
            return tag.id == tag_id;
        });
    };

    return (
        <>
            <SingleActionModel
                open={open}
                setOpen={setOpen}
                title={'正在進行...'}
                content={actionContent}
                icon={<PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />}
            />
            <div className="mx-auto max-w-7xl p-4">
                <div className="mx-auto max-w-7xl pb-12">
                    <div className="flex items-center  justify-between mb-4 border-gray-300  ">
                        <label
                            className=" px-4 py-2 rounded-md cursor-pointer text-indigo-500"
                            onClick={() => {
                                Router.back();
                            }}
                        >
                            {'<'} 返回
                        </label>
                        <label className="text-2xl font-bold">創建數據總表</label>
                        <button
                            className=" cursor-pointer block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => {
                                handleSave();
                            }}
                        >
                            確認
                        </button>
                    </div>
                    <div className="my-2 flex flex-row items-center flex-wrap hidden">
                        <label className="text-md font-bold px-0 py-2">來源:</label>
                        {tag_ids?.map((tag_id: string, index: number) => {
                            const label = getTag(tag_id);
                            return (
                                <button
                                    key={index}
                                    className="mx-2 my-1 flex flex-row items-center cursor-pointer rounded-md bg-green-700 hover:bg-green-800  px-3 py-2 text-center text-sm font-semibold text-white shadow-sm  "
                                    onClick={() => {
                                        Router.push({
                                            pathname: `/smart_extraction_schema/label/${label?.id}`,
                                            query: { label: label.name }
                                        });
                                    }}
                                >
                                    <TableCellsIcon className="mr-1 w-5 h-5 text-white" />
                                    <label className=" cursor-pointer text-xs sm:text-sm">
                                        {label?.name}({label?.smart_extraction_schemas_count})
                                    </label>
                                </button>
                            );
                        })}
                        <a
                            className="mx-2 underline cursor-pointer block rounded-md  text-center   font-semibold text-indigo-500  hover:text-indigo-700  "
                            onClick={() => {
                                setTagIsOpen(true);
                            }}
                        >
                            + 新增
                        </a>
                    </div>
                    <div className="my-2 hidden">
                        <label className="text-md font-bold">目的地:</label>
                    </div>
                    {/* <p className="mt-1 text-sm leading-6 text-gray-600">{extractSchema?.description}</p> */}
                    <div className="my-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                名稱
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="名稱"
                                    defaultValue={extractSchema?.name}
                                    onChange={(e) => {
                                        setExtractSchema({
                                            ...extractSchema,
                                            name: e.target.value
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                描述
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="描述"
                                    defaultValue={extractSchema?.description}
                                    onChange={(e) => {
                                        setExtractSchema({
                                            ...extractSchema,
                                            description: e.target.value
                                        });
                                    }}
                                ></textarea>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <div className="inline-block min-w-full py-0 align-middle  ">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className=" border-b">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3.5 w-2/12 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                            >
                                                Column Name
                                            </th>
                                            <th
                                                scope="col"
                                                className=" w-2/12 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Data Type
                                            </th>

                                            <th
                                                scope="col"
                                                className="w-6/12 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Prompt
                                            </th>

                                            <th scope="col" className="relative py-3.5  w-2/12">
                                                {visableAdd && (
                                                    <div className="flex justify-end">
                                                        <a
                                                            className=" cursor-pointer block rounded-md  text-center text-sm font-semibold text-indigo-500  hover:text-indigo-700  "
                                                            onClick={() => {
                                                                setCurrectPosition(-1);
                                                                setVisable(true);
                                                            }}
                                                        >
                                                            + Column
                                                        </a>
                                                    </div>
                                                )}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {extractSchema?.schema?.map(
                                            (schema: any, index: number) => {
                                                return (
                                                    <ExtractSchemaRow
                                                        key={index}
                                                        position={index}
                                                        schema={schema}
                                                        edit={editExtraSchema}
                                                        remove={removeExtraSchema}
                                                        visableAdd={visableAdd}
                                                    />
                                                );
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <EditSchemaDataModal
                visable={visable}
                extractSchema={currectExtraScheam}
                cancelClick={() => {
                    setVisable(false);
                }}
                confirmClick={(data: any) => {
                    if (currectPosition > -1) {
                        extractSchema?.schema.splice(currectPosition, 1, data);
                        setVisable(false);
                    } else {
                        extractSchema?.schema?.push(data);
                    }
                    setExtractSchema({
                        ...extractSchema,
                        schema: extractSchema?.schema
                    });
                }}
            />
            <LabelSelect
                {...{
                    loading: getAllLabelsDataLoading,
                    tags: tags,
                    isOpen: tagIsOpen,
                    setIsOpen: setTagIsOpen,
                    tag_ids,
                    set_tag_ids,
                    handleSave: handleConfirmTagIds
                }}
            />
        </>
    );
}
export default SchemaView;
