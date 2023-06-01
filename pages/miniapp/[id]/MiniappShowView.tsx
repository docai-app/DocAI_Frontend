import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import moment from 'moment';
import { useState } from 'react';
import SingleActionModel from '../../../components/common/Widget/SingleActionModel';
import Uploading from '../../../components/feature/classification/Uploading';
import UploadContainer from '../../classification/upload/UploadContainer';
import FormApprovalContainer from '../../new/form/schema/[id]/FormApprovalContainer';

interface MiniappShowViewProps {
    data: any;
    loading: boolean;
}

export default function MiniappShowView(props: MiniappShowViewProps) {
    const { data, loading } = props;

    const [open, setOpen] = useState(false);
    const isShowUploadDocument = (app_function_list: any) => {
        if (!app_function_list) return false;
        return _.includes(app_function_list, 'upload_document');
    };
    const isShowFormFilling = (app_function_list: any) => {
        if (!app_function_list) return false;
        return _.includes(app_function_list, 'form_filling');
    };
    const isShowFormUnderstanding = (app_function_list: any) => {
        if (!app_function_list) return false;
        return _.includes(app_function_list, 'form_understanding');
    };
    return (
        <>
            <SingleActionModel
                open={loading}
                setOpen={() => {}}
                title={'進行中......'}
                content={'正在加载数据...'}
                icon={<PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />}
            />
            <Uploading {...{ open, setOpen }} />
            <div className="max-w-7xl mx-auto h-[calc(100vh-18.5rem)] py-4 ">
                <div className="max-w-7xl mx-auto  ">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            {data?.name}
                        </h2>
                        <h2 className="text-md font-extrabold text-gray-500 sm:text-xl">
                            {data?.description}
                        </h2>
                    </div>
                    <div className="mx-0 my-6">
                        {isShowUploadDocument(data?.app_function_list) && (
                            <UploadContainer
                                showUploadSet={false}
                                miniapp_tag_id={data?.document_label_list[0]}
                                miniapp_target_folder_id={data?.folder_id}
                                app_function={'upload_document'}
                                form_miniapp={true}
                            />
                        )}
                        {isShowFormFilling(data?.app_function_list) && (
                            <FormApprovalContainer
                                form_schema_id={data?.meta?.form_schema_id}
                                miniapp_filename={data?.name + '_' + moment().unix()}
                                miniapp_target_folder_id={data?.folder_id}
                                form_miniapp={true}
                            />
                        )}
                        {isShowFormUnderstanding(data?.app_function_list) && (
                            <UploadContainer
                                showUploadSet={false}
                                app_function={'form_understanding'}
                                miniapp_tag_id={data?.document_label_list[0]}
                                miniapp_target_folder_id={data?.folder_id}
                                miniapp_form_schema_id={data?.meta?.form_schema_id}
                                form_miniapp={true}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
