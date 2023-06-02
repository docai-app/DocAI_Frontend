interface UploadSetProps {
    needAutoUpload?: boolean;
    setNeedAutoUpload: any;
    needs_deep_understanding?: boolean;
    set_needs_deep_understanding: any;
    set_needs_approval: any;
    setTagId: any;
    set_form_schema_id: any;
    getAllLabelsData: any;
    schemasStatusReadyData: any;
}

export default function UploadSet(props: UploadSetProps) {
    const {
        needAutoUpload,
        setNeedAutoUpload,
        needs_deep_understanding,
        set_needs_deep_understanding,
        set_needs_approval,
        setTagId,
        set_form_schema_id,
        getAllLabelsData,
        schemasStatusReadyData
    } = props;
    return (
        <>
            <div className="mt-4 rounded-md border-2 border-gray-200 p-4 bg-white">
                <label className="text-md font-bold text-gray-900">批量上傳</label>
                <div className="flex flex-row justify-between mt-2">
                    <div className="flex flex-row items-center">
                        <input
                            type={'checkbox'}
                            name="needAutoUpload"
                            onChange={(e) => {
                                setNeedAutoUpload(e.target.checked);
                            }}
                        />
                        <label className="ml-2 text-md font-bold text-gray-900">
                            是否需要自動批量上傳?
                            <label className="text-sm text-gray-500">(需要統一標籤)</label>
                        </label>
                    </div>
                </div>
                <div className={`${needAutoUpload ? 'my-2' : 'my-2 hidden'}`}>
                    <label className="font-bold text-gray-900">批量文件的類別</label>
                    <select
                        id="select_tag"
                        name="location"
                        className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue=""
                        onChange={(e) => {
                            setTagId(e.target.value);
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
                <div className={`${needAutoUpload ? 'my-2' : 'my-2 hidden'}`}>
                    <div className="flex flex-row justify-between mt-2">
                        <div className="flex flex-row items-center">
                            <input
                                type={'checkbox'}
                                name="needAutoUpload"
                                onChange={(e) => {
                                    set_needs_deep_understanding(e.target.checked);
                                }}
                            />
                            <label className="ml-2 text-md font-bold text-gray-900">
                                是否需要表格深度理解?
                                <label className="text-sm text-gray-500">(需要統一標籤)</label>
                            </label>
                        </div>
                    </div>
                    <div className={`${needs_deep_understanding ? 'my-2' : 'my-2 hidden'}`}>
                        <label className="font-bold text-gray-900">表格深度理解的模型</label>
                        <select
                            id="select_tag_function"
                            name="location"
                            className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    <div
                        className={`${
                            needs_deep_understanding
                                ? 'flex flex-row justify-between mt-2'
                                : 'flex-row justify-between hidden'
                        }`}
                    >
                        <div className="flex flex-row items-center">
                            <input
                                type={'checkbox'}
                                name="needAutoUpload"
                                onChange={(e) => {
                                    set_needs_approval(e.target.checked);
                                }}
                            />
                            <label className="ml-2 text-md font-bold text-gray-900">
                                是否需要進行審批?
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
