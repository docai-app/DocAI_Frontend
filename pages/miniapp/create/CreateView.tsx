import { ChevronRightIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { FolderIcon } from "@heroicons/react/24/solid";
import useAxios from "axios-hooks";
import _ from "lodash";
import { useEffect, useState } from "react";
import Api from "../../../apis";
import { Folder } from "../../../components/common/Widget/FolderTree";
import FolderTreeForSelect from "../../../components/common/Widget/FolderTreeForSelect";
import SingleActionModel from "../../../components/common/Widget/SingleActionModel";
import useAlert from "../../../hooks/useAlert";

interface CreateViewProps {
    getTagFunctionsData: any;
    getAllLabelsData: any;
    schemasStatusReadyData: any;
    updateMiniappHandler: any;
    loading: boolean;
}
const apiSetting = new Api();

export default function MiniappView(props: CreateViewProps) {
    const {
        getTagFunctionsData,
        getAllLabelsData,
        schemasStatusReadyData,
        updateMiniappHandler,
        loading
    } = props;

    const { setAlert } = useAlert();

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [form_schema_id, set_form_schema_id] = useState('')
    const [function_id, set_function_id] = useState('')
    const [tag_id, set_tag_id] = useState('')
    const [target_folder_id, set_target_folder_id] = useState('')
    const [needs_deep_understanding, set_needs_deep_understanding] = useState(false);

    const [mode, setMode] = useState('');
    const [movingDest, setMovingDest] = useState<Folder | null>(null);
    const [documentPath, setDocumentPath] = useState<{ id: string | null; name: string }[]>([
        { id: null, name: 'Root' }
    ]);

    const [{ data: showFolderByIDData }, showFolderByID] = useAxios({}, { manual: true });

    useEffect(() => {
        if (showFolderByIDData?.success) {
            setDocumentPath([
                { id: null, name: 'Root' },
                ...showFolderByIDData.ancestors.slice().reverse(),
                showFolderByIDData.folder
            ]);
        }
    }, [showFolderByIDData]);

    useEffect(() => {
        if (movingDest?.id) {
            showFolderByID(apiSetting.Folders.showFolderByID(movingDest?.id));
            set_target_folder_id(movingDest?.id);
        }
    }, [movingDest, showFolderByID]);

    const selectTagFunction = (id: string) => {
        const targetFun = _.find(getTagFunctionsData?.functions, function (func) {
            return func.id == id
        })
        set_function_id(id)
        set_needs_deep_understanding(showFormSchema(targetFun?.name))
    }
    const showFormSchema = (name: string) => {
        return "form_understanding" === name || "form_filling" == name
    }

    const validate = () => {
        if (_.isEmpty(name)) {
            setAlert({ title: '請填寫名稱', type: 'info' });
            return false
        }
        if (_.isEmpty(description)) {
            setAlert({ title: '請填寫描述', type: 'info' });
            return false
        }
        if (_.isEmpty(target_folder_id)) {
            setAlert({ title: '請選擇儲存路徑', type: 'info' });
            return false
        }
        if (needs_deep_understanding && _.isEmpty(form_schema_id)) {
            setAlert({ title: '請選擇表格深度理解的模型', type: 'info' });
            return false
        }
        return true
    }

    const confirm = () => {
        if (validate())
            updateMiniappHandler({
                'name': name,
                'description': description,
                'form_schema_id': form_schema_id,
                'function_id': function_id,
                'tag_id': tag_id,
                'target_folder_id': target_folder_id,
                'needs_deep_understanding': needs_deep_understanding
            })
    }


    return (
        <>
            <SingleActionModel
                open={loading}
                setOpen={() => { }}
                title={'進行中......'}
                content={'正在保存數據...'}
                icon={<PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />}
            />
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-7xl pb-12">
                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">新增資源應用程序</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">快速構建可供使用的功能應用程序。</p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <label className="block text-sm font-medium leading-6 text-gray-900">名稱</label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="應用程序名稱"
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">描述</label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="應用程序描述"
                                    onChange={(e) => {
                                        setDescription(e.target.value)
                                    }}
                                ></textarea>
                            </div>
                        </div>
                        <div className="col-span-full mt-4 rounded-md border-2 border-gray-200 p-4 bg-white">
                            <label className="text-md font-bold text-gray-900">儲存路徑</label>
                            <div className="flex flex-row justify-between mt-2">
                                <div className="flex flex-row">
                                    <FolderIcon className="h-6 text-blue-200" />
                                    {documentPath &&
                                        documentPath.slice(0, documentPath.length - 1).map((folder) => (
                                            <div key={folder.id} className="flex flex-row items-center">
                                                {folder.name}{' '}
                                                <ChevronRightIcon className="text-gray-400 text-sm h-5" />
                                            </div>
                                        ))}
                                    <div className="flex flex-row items-center">
                                        {documentPath && documentPath[documentPath.length - 1].name}
                                    </div>
                                </div>
                                <a
                                    className="text-indigo-600 underline cursor-pointer"
                                    onClick={() => {
                                        setMode('move');
                                    }}>編輯</a>
                            </div>
                        </div>
                        <div className="sm:col-span-6">
                            <label className="block text-sm font-medium leading-6 text-gray-900">文件類別</label>
                            <div className="mt-2">
                                <select
                                    id="tag"
                                    name="tag"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    defaultValue=""
                                    onChange={(e) => {
                                        set_tag_id(e.target.value)
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
                            <label className="block text-sm font-medium leading-6 text-gray-900">應用程序功能</label>
                            <div className="mt-2">
                                <select
                                    id="functions"
                                    name="functions"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    defaultValue=""
                                    onChange={(e) => {
                                        selectTagFunction(e.target.value)
                                    }}
                                >
                                    <option value="" disabled>請選擇應用程序功能</option>
                                    {getTagFunctionsData?.functions?.map(
                                        (func: any, index: number) => {
                                            return (
                                                <option key={index} value={func.id}>
                                                    {func.title}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className={`${needs_deep_understanding ? 'sm:col-span-6 my-2' : 'sm:col-span-6 my-2 hidden'}`}>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                表格深度理解的模型
                            </label>
                            <div className="mt-2">
                                <select
                                    id="select_tag_function"
                                    name="select_tag_function"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    defaultValue=""
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
                            <button className=" cursor-pointer block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => {
                                confirm()
                            }}>確認</button>
                        </div>
                    </div>
                </div>
                <FolderTreeForSelect
                    {...{
                        mode,
                        setMode,
                        movingDest,
                        setMovingDest,
                        targetId: ''
                    }}
                />
            </div>
        </>
    )
}