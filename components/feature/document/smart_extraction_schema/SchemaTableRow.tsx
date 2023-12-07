import { CircleStackIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import MyModal from '../../../common/Widget/MyModal';
import Dropdowns from './Dropdowns';

interface TableRowProps {
    schema: any;
    checked?: boolean;
    setCurrectShema?: any;
    visable?: boolean;
    getAllLabelsData?: any;
    users?: any;
    handleDeleteSchema: any;
}
export default function SchemaTableRow(props: TableRowProps) {
    const {
        schema,
        checked,
        setCurrectShema,
        visable = true,
        getAllLabelsData,
        users,
        handleDeleteSchema
    } = props;
    const router = useRouter();
    const [visableDelete, setVisableDelete] = useState(false);
    // const [visable, setVisable] = useState(false);
    const updated_at = new Date(schema.updated_at);
    const now = new Date();
    let date = '';
    if (updated_at.getFullYear() === now.getFullYear()) {
        if (updated_at.getMonth() === now.getMonth() && updated_at.getDate() === now.getDate())
            date = `${
                updated_at.getHours() < 10
                    ? '0' + updated_at.getHours().toString()
                    : updated_at.getHours()
            }:${
                updated_at.getMinutes() < 10
                    ? '0' + updated_at.getMinutes().toString()
                    : updated_at.getMinutes()
            }`;
        else
            date = `${
                updated_at.getMonth() < 9
                    ? '0' + (updated_at.getMonth() + 1).toString()
                    : updated_at.getMonth() + 1
            }/${
                updated_at.getDate() < 10
                    ? '0' + updated_at.getDate().toString()
                    : updated_at.getDate()
            }`;
    } else {
        date = `${updated_at.getFullYear()}/${
            updated_at.getMonth() < 9
                ? '0' + (updated_at.getMonth() + 1).toString()
                : updated_at.getMonth() + 1
        }/${
            updated_at.getDate() < 10 ? '0' + updated_at.getDate().toString() : updated_at.getDate()
        }`;
    }
    const url = `/document/smart_extraction_schema/${schema.id}`;
    // const onMouseEnter = () => {
    //     if (checked) return;
    //     setVisable(true);
    // };
    // const onMouseLeave = () => {
    //     if (checked) return;
    //     setVisable(false);
    // };
    // const check = (e: any) => {
    //     // setChecedkData(type, e.target.checked, e.target.value);
    // };

    // useEffect(() => {
    //     if (!checked) {
    //         setVisable(false);
    //     }
    // }, [checked]);
    const getLabelName = (label_id: string) => {
        if (schema?.has_label == false) {
            return '數據總表';
        }
        return schema?.label?.name;
        // const tag = _.find(getAllLabelsData?.tags, function (tag) {
        //     return tag.id == label_id;
        // });
        // return tag?.name || router.query.label;
    };

    const getUserName = (user_id: string) => {
        const user = _.find(users, function (user) {
            return user.id == user_id;
        });
        return user?.nickname;
    };
    return (
        <>
            <div
                key={schema.id}
                className={`flex hover:bg-gray-100`}
                onMouseEnter={() => {
                    // onMouseEnter();
                }}
                onMouseLeave={() => {
                    // onMouseLeave();
                }}
            >
                <div className=" mx-2 w-10 items-center flex justify-center">
                    {visable && (
                        <input
                            type={'radio'}
                            name="schema"
                            value={schema.id}
                            className=""
                            onClick={(e) => {
                                // check(e);
                                setCurrectShema(schema);
                            }}
                        />
                    )}
                </div>
                <div className="px-2 py-3 flex flex-row items-center">
                    <CircleStackIcon className="ml-auto h-6 text-gray-400" />
                </div>
                <div className="px-2 py-3 text-left w-5/12">
                    <a href={url} rel="noreferrer" className="hover:underline">
                        {schema.name}
                    </a>
                </div>
                <div className="px-2 py-4 flex justify-end gap-2 w-2/12 flex-wrap">
                    {getLabelName(schema.label_id) ? (
                        <span className="inline-flex items-center px-2.5 h-6 rounded-full text-xs font-medium bg-green-100 text-black">
                            {getLabelName(schema.label_id)}
                        </span>
                    ) : (
                        <span className="inline-flex items-center px-2.5 h-6 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            未分類
                        </span>
                    )}
                </div>
                <div className="px-2 py-4 flex justify-end gap-2 w-2/12">
                    <Dropdowns
                        edit={() => {
                            if (schema?.has_label)
                                Router.push(
                                    `/document/extraction/${schema?.label_id}/schema?schema_id=${schema?.id}`
                                );
                            else
                                Router.push(
                                    `/document/extraction/documents/schema?schema_id=${schema?.id}`
                                );
                        }}
                        remove={() => {
                            setVisableDelete(true);
                        }}
                    />
                </div>
                <div className="pr-6 py-4 text-right w-2/12">{date}</div>
                <div className="pr-6 py-4 text-right w-2/12">{schema?.user?.nickname}</div>
            </div>
            <MyModal
                visable={visableDelete}
                description={`是否刪除"${schema.name}"?`}
                cancelClick={() => {
                    setVisableDelete(false);
                }}
                confirmClick={() => {
                    setVisableDelete(false);
                    handleDeleteSchema(schema?.id);
                }}
            />
        </>
    );
}
