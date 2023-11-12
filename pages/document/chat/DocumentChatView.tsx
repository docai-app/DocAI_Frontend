import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import HeaderBreadCrumb from '../../../components/common/Widget/HeaderBreadCrumb';
import SingleActionModel from '../../../components/common/Widget/SingleActionModel';
import AmendLabel from '../../../components/feature/classification/AmendLabel';
import DocumentFunction from '../../../components/feature/document/chat/DocumentFunction';
import EditLabel from '../../../components/feature/setting/label/EditLabel';
import useAlert from '../../../hooks/useAlert';
import { encrypt } from '../../../utils/util_crypto';

interface SchemaDataViewProps {
    document: any;
    formUrl: string;
    data: any;
    selectedResult: any;
    getAllLabelsData: any;
    confirmDocumentFormik: any;
    label: any;
    updateTag: boolean;
    setUpdateTag: any;
    pdf_page_details?: [];
}

function DocumentChatView(props: SchemaDataViewProps) {
    const {
        document,
        formUrl,
        data,
        selectedResult,
        getAllLabelsData,
        confirmDocumentFormik,
        label,
        updateTag,
        setUpdateTag,
        pdf_page_details
    } = props;
    const router = useRouter();
    const { setAlert } = useAlert();
    const [openEditLabel, setOpenEditLabel] = useState(false);
    const [openAmendLabel, setOpenAmendLabel] = useState(false);
    const [document_chat_url, set_document_chat_url] = useState('');
    useEffect(() => {
        // console.log(
        //     process.env.NEXT_PUBLIC_CHATBOT_URL +
        //     `/document_chat?document_id=${document?.id}&document_name=${document?.name}&token=${encrypt(window.localStorage?.getItem('authorization') || '')}&chain_feature_ids=${label?.meta?.chain_features?.join(",") || ''}`
        // );

        set_document_chat_url(
            process.env.NEXT_PUBLIC_CHATBOT_URL +
                `/document_chat?document_id=${document?.id}&document_name=${
                    document?.name
                }&token=${encrypt(
                    window.localStorage?.getItem('authorization') || ''
                )}&chain_feature_ids=${label?.meta?.chain_features?.join(',') || ''}`
        );
    }, [document, label]);

    return (
        <>
            <SingleActionModel
                open={updateTag}
                setOpen={setUpdateTag}
                title={'進行中......'}
                content={'正在更新...'}
                icon={<PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />}
            />
            <div className="sm:max-w-7xl w-full mx-auto px-2 flex flex-col h-full  ">
                <HeaderBreadCrumb
                    title={''}
                    back={() => {
                        Router.back();
                    }}
                />
                <div className="px-4 pb-8 flex-1 flex flex-row h-full flex-wrap">
                    <div className=" justify-center w-full sm:w-[40%] min-w-[200px]  flex overflow-auto h-full px-4 ">
                        <iframe src={document_chat_url} className="h-full w-full" />
                    </div>
                    <div className="flex flex-col w-full sm:w-[60%] h-full">
                        <div className="w-full flex-1 h-full overflow-y-auto border-2 border-dashed border-gray-200 bg-white rounded-lg object-cover">
                            {formUrl?.split('.').pop() === 'pdf' ? (
                                <object
                                    className="object-center object-cover w-full h-full flex justify-center items-center"
                                    type="application/pdf"
                                    data={formUrl + '#toolbar=0'}
                                    width="250"
                                >
                                    <img
                                        src={
                                            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png'
                                        }
                                        alt="PDF file icon"
                                        className="w-full h-full "
                                    />
                                </object>
                            ) : (
                                <img
                                    className="w-full  h-90vh object-contain"
                                    src={formUrl}
                                    alt={formUrl}
                                />
                            )}
                        </div>
                        <DocumentFunction
                            label={label}
                            document={document}
                            pdf_page_details={pdf_page_details}
                            updateTag={() => {
                                setOpenAmendLabel(true);
                            }}
                        />
                    </div>
                </div>
            </div>
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
        </>
    );
}
export default DocumentChatView;
