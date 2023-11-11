import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import HeaderBreadCrumb from '../../../components/common/Widget/HeaderBreadCrumb';
import AmendLabel from '../../../components/feature/classification/AmendLabel';
import DocumentFunction from '../../../components/feature/document/chat/DocumentFunction';
import EditLabel from '../../../components/feature/setting/label/EditLabel';
import useAlert from '../../../hooks/useAlert';

interface SchemaDataViewProps {
    document: any;
    formUrl: string;
    data: any;
    selectedResult: any;
    getAllLabelsData: any;
    confirmDocumentFormik: any;
    label: any;
}

function DocumentChatView(props: SchemaDataViewProps) {
    const {
        document,
        formUrl,
        data,
        selectedResult,
        getAllLabelsData,
        confirmDocumentFormik,
        label
    } = props;
    const router = useRouter();
    const { setAlert } = useAlert();
    const [openEditLabel, setOpenEditLabel] = useState(false);
    const [openAmendLabel, setOpenAmendLabel] = useState(false);

    return (
        <>
            <div className="sm:max-w-7xl w-full mx-auto px-2 flex flex-col h-full  ">
                <HeaderBreadCrumb
                    title={''}
                    back={() => {
                        Router.back();
                    }}
                />
                <div className="px-4 pb-8 flex-1 flex flex-row h-full">
                    <div className=" justify-center w-1/3  flex overflow-auto h-full px-4 ">
                        <iframe src={process.env.NEXT_PUBLIC_CHATBOT_URL + `/document_chat?document_id=${document?.id}&document_name=${document?.name}`} className="h-full w-full" />
                    </div>
                    <div className='flex flex-col w-2/3 h-full'>
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
                setTagName={(name: string) => { }}
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
