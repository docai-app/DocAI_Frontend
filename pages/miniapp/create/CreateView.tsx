import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import Api from '../../../apis';
import DocumentPath from '../../../components/common/Widget/DocumentPath';
import SingleActionModel from '../../../components/common/Widget/SingleActionModel';
import useAlert from '../../../hooks/useAlert';

interface CreateViewProps {
    getTagFunctionsData: any;
    getAllLabelsData: any;
    schemasStatusReadyData: any;
    updateMiniappHandler: any;
    open: boolean;
    setOpen: any;
    miniAppData?: any;
    actionContent: string;
}
const apiSetting = new Api();

export default function MiniappView(props: CreateViewProps) {
    const {
        getTagFunctionsData,
        getAllLabelsData,
        schemasStatusReadyData,
        updateMiniappHandler,
        open,
        setOpen,
        miniAppData,
        actionContent
    } = props;

    const { setAlert } = useAlert();
    const [title, setTitle] = useState('新增資源應用程序');

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [form_schema_id, set_form_schema_id] = useState('');
    const [function_name, set_function_name] = useState('');
    const [tag_id, set_tag_id] = useState('');
    const [target_folder_id, set_target_folder_id] = useState('');
    const [needs_deep_understanding, set_needs_deep_understanding] = useState(false);

    useEffect(() => {
        if (miniAppData) {
            setTitle('更新資源應用程序');

            setName(miniAppData?.name);
            setDescription(miniAppData?.description);
            set_tag_id(miniAppData?.document_label_list[0]);
            set_target_folder_id(miniAppData?.folder_id);
            set_function_name(miniAppData?.app_function_list[0]);
            set_needs_deep_understanding(showFormSchema(miniAppData?.app_function_list[0]));
            set_form_schema_id(miniAppData?.meta?.form_schema_id);
        }
    }, [miniAppData]);

    const selectTagFunction = (name: string) => {
        // const targetFun = _.find(getTagFunctionsData?.functions, function (func) {
        //     return func.id == id
        // })
        set_function_name(name);
        set_needs_deep_understanding(showFormSchema(name));
    };
    const showFormSchema = (name: string) => {
        return 'form_understanding' === name || 'form_filling' == name;
    };

    const validate = () => {
        if (_.isEmpty(name)) {
            setAlert({ title: '請填寫名稱', type: 'info' });
            return false;
        }
        if (_.isEmpty(description)) {
            setAlert({ title: '請填寫描述', type: 'info' });
            return false;
        }
        if (_.isEmpty(target_folder_id)) {
            setAlert({ title: '請選擇儲存路徑', type: 'info' });
            return false;
        }
        if (needs_deep_understanding && _.isEmpty(form_schema_id)) {
            setAlert({ title: '請選擇表格深度理解的模型', type: 'info' });
            return false;
        }
        return true;
    };

    const confirm = () => {
        if (validate())
            updateMiniappHandler({
                name: name,
                description: description,
                form_schema_id: form_schema_id,
                function_name: function_name,
                tag_id: tag_id,
                target_folder_id: target_folder_id,
                needs_deep_understanding: needs_deep_understanding
            });
    };

    return (
        <>
            <SingleActionModel
                open={open}
                setOpen={setOpen}
                title={'進行中......'}
                content={actionContent}
                icon={<PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />}
            />
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-7xl pb-12">
                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">{title}</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        快速構建可供使用的功能應用程序。
                    </p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                名稱
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    defaultValue={name}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="應用程序名稱"
                                    onChange={(e) => {
                                        setName(e.target.value);
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
                                    defaultValue={description}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="應用程序描述"
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                ></textarea>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <DocumentPath
                                modeType={'move'}
                                target_folder_id={target_folder_id}
                                set_target_folder_id={set_target_folder_id}
                            />
                        </div>
                        <div className="sm:col-span-6">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                文件類別
                            </label>
                            <div className="mt-2">
                                <select
                                    id="tag"
                                    name="tag"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    value={tag_id}
                                    onChange={(e) => {
                                        set_tag_id(e.target.value);
                                    }}
                                >
                                    <option value="" disabled>
                                        請選擇類別
                                    </option>
                                    {getAllLabelsData?.tags.map((tag: any, index: number) => {
                                        return (
                                            <option key={index} value={tag.id}>
                                                {tag.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="sm:col-span-6">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                應用程序功能
                            </label>
                            <div className="mt-2">
                                <select
                                    id="functions"
                                    name="functions"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    value={function_name}
                                    onChange={(e) => {
                                        selectTagFunction(e.target.value);
                                    }}
                                >
                                    <option value="" disabled>
                                        請選擇應用程序功能
                                    </option>
                                    {getTagFunctionsData?.functions?.map(
                                        (func: any, index: number) => {
                                            return (
                                                <option key={index} value={func.name}>
                                                    {func.title}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                            </div>
                        </div>
                        <div
                            className={`${
                                needs_deep_understanding
                                    ? 'sm:col-span-6 my-2'
                                    : 'sm:col-span-6 my-2 hidden'
                            }`}
                        >
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                表格深度理解的模型
                            </label>
                            <div className="mt-2">
                                <select
                                    id="select_tag_function"
                                    name="select_tag_function"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    value={form_schema_id}
                                    onChange={(e) => {
                                        set_form_schema_id(e.target.value);
                                    }}
                                >
                                    <option value="" disabled>
                                        請選擇模型
                                    </option>
                                    {schemasStatusReadyData?.form_schema?.map(
                                        (schema: any, index: number) => {
                                            return (
                                                <option key={index} value={schema.id}>
                                                    {schema.name}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-6 flex justify-end">
                            <button
                                className=" cursor-pointer block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => {
                                    confirm();
                                }}
                            >
                                確認
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
