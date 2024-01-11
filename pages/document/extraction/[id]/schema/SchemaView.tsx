import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { DocumentIcon } from '@heroicons/react/24/solid';
import _ from 'lodash';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import EditSchemaDataModal from '../../../../../components/common/Widget/EditSchemaDataModal';
import SingleActionModel from '../../../../../components/common/Widget/SingleActionModel';
import ExtractSchemaRow from '../../../../../components/feature/document/extraction/ExtractSchemaRow';

interface SchemaViewProps {
    label: any;
    open: boolean;
    setOpen: any;
    extractSchema: {
        name: string;
        description: string;
        label_id: string;
        schema: any[];
        data_schema: any;
    };
    setExtractSchema: any;
    handleSave: any;
    actionContent: string;
    visableAdd?: boolean;
}

function SchemaView(props: SchemaViewProps) {
    const {
        label,
        open,
        setOpen,
        extractSchema,
        setExtractSchema,
        handleSave,
        actionContent,
        visableAdd = true
    } = props;
    const [visable, setVisable] = useState(false);
    const [currectExtraScheam, setCurrectExtraSchema] = useState();
    const [currectPosition, setCurrectPosition] = useState(-1);
    const [accurateMode, setAccurateMode] = useState(false);

    useEffect(() => {
        if (extractSchema && extractSchema?.schema && extractSchema?.schema[0]) {
            setAccurateMode(_.isArray(extractSchema?.schema[0].query));
        }
    }, [extractSchema]);

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
                        <label className="text-2xl font-bold">編輯Schema</label>
                        <button
                            className=" cursor-pointer block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => {
                                handleSave();
                            }}
                        >
                            確認
                        </button>
                    </div>
                    <div className="my-2 flex flex-row items-center">
                        <label className="text-md font-bold">來源:</label>
                        {label && (
                            <button
                                className="mx-2 flex flex-row items-center cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => {
                                    Router.push({
                                        pathname: '/search',
                                        query: {
                                            content: '',
                                            tag_id: label?.id,
                                            from: '',
                                            to: '',
                                            label: label?.name
                                        }
                                    });
                                }}
                            >
                                <DocumentIcon className="ml-auto h-4 text-white" />
                                <label className=" cursor-pointer text-xs sm:text-sm">
                                    {label?.name}({label?.taggings_count || 0})
                                </label>
                            </button>
                        )}
                    </div>
                    <div className="my-2">
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
                        <div className="col-span-full flex flex-row items-center">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                精準模式:
                            </label>
                            <input
                                type={'checkbox'}
                                className={`mx-2 ${
                                    extractSchema?.schema?.length > 0 ? 'text-gray-500' : ''
                                }`}
                                checked={accurateMode}
                                disabled={extractSchema?.schema?.length > 0}
                                onChange={() => {
                                    setAccurateMode(!accurateMode);
                                }}
                            />
                        </div>
                        <div className="col-span-full">
                            <div className="inline-block min-w-full py-0 align-middle  ">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className=" border-b">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                            >
                                                Column Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Data Type
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Prompt
                                            </th>

                                            <th
                                                scope="col"
                                                className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                                            >
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
                accurateMode={accurateMode}
                cancelClick={() => {
                    console.log('---');

                    setVisable(false);
                }}
                confirmClick={(data: any) => {
                    console.log('data', data);

                    if (currectPosition > -1) {
                        console.log(data);

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
        </>
    );
}
export default SchemaView;
