import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import Api from '../../../apis/index';
import LabelView from './LabelView';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

const apiSetting = new Api();

function LabelContainer() {
    const [documents, setDocuments] = useState([]);
    const [label, setLabel] = useState('');
    const router = useRouter();
    useEffect(() => {
        if (router.query.name) {
            setLabel(router.query.name.toString());
            const getDocuments = async () => {
                let res = await getDocumentByLabelID();
                setDocuments(res.data.documents);
            };
            getDocuments();
        }
    }, [router]);
    const [
        {
            data: searchDocumentByContentData,
            loading: searchDocumentByContentLoading,
            error: searchDocumentByContentError,
            response: searchDocumentByContentResponse
        },
        getDocumentByLabelID
    ] = useAxios(apiSetting.Classification.getDocumentByLabelID(router.query.label), {
        manual: true
    });
    // const searchDocumentFormik = useFormik({
    //     initialValues: {
    //         content: ''
    //     },
    //     onSubmit: async (values) => {
    //         let res = await searchDocumentByContent({
    //             params: {
    //                 ...values
    //             }
    //         });
    //         console.log(res);
    //         if (res.data) {
    //             alert('Document Found!');
    //             setDocuments(res.data.documents);
    //         }
    //     }
    // });
    return (
        <>
            <LabelView {...{ documents, label }} />
        </>
    );
}

export default LabelContainer;
