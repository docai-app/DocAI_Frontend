import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import Api from '../../../apis/index';
import TagView from './TagView';
import { useRouter } from 'next/router';

const apiSetting = new Api();

function TagContainer() {
    const [documents, setDocuments] = useState([]);
    const [tagName, setTagName] = useState('');
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [
        { data: getDocumentsByTagIDData, loading: getDocumentsByTagIDLoading },
        getDocumentsByTagID
    ] = useAxios(apiSetting.Document.getDocumentsByTagID(''), {
        manual: true
    });
    useEffect(() => {
        if (router.query.name) {
            setTagName(router.query.name.toString());
            getDocumentsByTagID({
                url: `/api/v1/documents/tags/${router.query.tag}`
            });
        }
    }, [router]);
    useEffect(() => {
        if (getDocumentsByTagIDData && getDocumentsByTagIDData.success === true) {
            setDocuments(getDocumentsByTagIDData.documents);
            setOpen(false);
        }
    }, [getDocumentsByTagIDData]);
    useEffect(() => {
        setOpen(getDocumentsByTagIDLoading);
    }, [getDocumentsByTagIDLoading]);
    return (
        <>
            <TagView {...{ documents, tagName, open, setOpen }} />
        </>
    );
}

export default TagContainer;
