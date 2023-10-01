import useAxios from 'axios-hooks';
import { useFormik } from 'formik';
import Router, { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import Api from '../../apis';
import { Folder } from '../../components/common/Widget/FolderTree';
import useAlert from '../../hooks/useAlert';
import DriveView from './DriveView';
import axios from 'axios';

const apiSetting = new Api();

export default function DriveContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const queryId = useRef(router.query.id);
    const queryName = useRef(router.query.name);
    const [id, setId] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [mode, setMode] = useState<'view' | 'move' | 'share' | 'newFolder'>('view');
    const [target, setTarget] = useState<any[]>([]);
    const [shareWith, setShareWith] = useState<any[]>([]);
    const [newFolderName, setNewFolderName] = useState<string | null>(null);
    const [dest, setDest] = useState<Folder | null>(null);
    const [visableDelete, setVisableDelete] = useState(false);
    const [visableRename, setVisableRename] = useState(false);
    const [current, setCurrent] = useState<any>();
    const [allItemsData, setAllItemsData] = useState<any>([]);
    const [allFoldersItemsData, setAllFoldersItemsData] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [documents_items, setDocumentsItems] = useState<any>([]);
    const [folders_items, setFoldersItems] = useState<any>([]);
    const [newLabelName, setNewLabelName] = useState('');
    const [updateTag, setUpdateTag] = useState(false);

    const [
        { data: showAllItemsData, loading: showAllItemsLoading, error: showAllItemsError },
        showAllItems
    ] = useAxios({}, { manual: true });
    const [{ data: updateDocumentByIdData }, updateDocumentById] = useAxios({}, { manual: true });
    const [{ data: shareFolderPermissionData }, shareFolderPermission] = useAxios(
        {},
        { manual: true }
    );
    const [{ data: createFolderData }, createFolder] = useAxios({}, { manual: true });

    const [{ data: countDocumentsByDateData }, countDocumentsByDate] = useAxios(
        apiSetting.Statistics.countDocumentsByDate(
            new Date().toLocaleString('fr-CA', { timeZone: 'Asia/Taipei' }).split(' ')[0]
        ),
        { manual: true }
    );

    const [{ data: deleteDocumentByIdData }, deleteDocumentById] = useAxios({}, { manual: true });
    const [{ data: deleteFolderByIdData }, deleteFolderById] = useAxios({}, { manual: true });

    const [{ data: updateFolderNameData }, updateFolderName] = useAxios({}, { manual: true });

    const [{ data: moveItemsToSpecificFolderData }, moveItemsToSpecificFolder] = useAxios(
        apiSetting.Drive.moveItemsToSpecificFolder(),
        { manual: true }
    );

    const [{ data: getAllLabelsData, error: getAllLabelsError }, getAllLabels] = useAxios(
        apiSetting.Tag.getAllTags(),
        { manual: false }
    );

    const [{ data: updateDocumentTagData }, updateDocumentTag] = useAxios(
        apiSetting.Classification.updateDocumentTag([], ''),
        { manual: true }
    );

    const [{ data: addNewLabelData, error: addNewLabelError }, addNewLabel] = useAxios(
        apiSetting.Tag.addNewTag(),
        { manual: true }
    );

    const addNewLabelHandler = useCallback(async () => {
        addNewLabel({ data: { name: newLabelName } });
    }, [addNewLabel, newLabelName]);

    const [{ data: schemasStatusReadyData }, schemasStatusReady] = useAxios(
        apiSetting.Form.schemasStatusReady(),
        {
            manual: false
        }
    );

    const [{ data: deepUnderstandingDocumentData }, deepUnderstandingDocument] = useAxios(
        apiSetting.Document.deepUnderstandingDocument(),
        {
            manual: true
        }
    );

    useEffect(() => {
        if (addNewLabelData && addNewLabelData.success) {
            // setAlert({ title: '新增成功', type: 'success' });
            setNewLabelName('');
            confirmDocumentFormik.setFieldValue('tag_id', addNewLabelData.tag.id);
            confirmDocumentFormik.handleSubmit();
        } else if (addNewLabelData && !addNewLabelData.success) {
            setAlert({
                title: '新增失敗！',
                content: `原因：${addNewLabelData.errors.name[0]}`,
                type: 'error'
            });
        }
    }, [addNewLabelData]);

    useEffect(() => {
        countDocumentsByDate();
    }, [countDocumentsByDate]);

    const handleShare = useCallback(
        async (id: string, user_email: string) => {
            const res = await shareFolderPermission(
                apiSetting.Drive.shareFolderPermission(id, user_email)
            );
            if (res.data?.success) {
                setAlert({ title: '共用成功', type: 'success' });
                router.reload();
            } else {
                setAlert({ title: '發生錯誤', type: 'error' });
            }
        },
        [router, shareFolderPermission]
    );

    const handleNewFolder = useCallback(
        async (name: string) => {
            const res = await createFolder(
                apiSetting.Folders.createFolder(name, queryId.current?.toString() || '')
            );
            if (res.data?.success) {
                setAlert({ title: '資料夾新增成功', type: 'success' });
                router.reload();
            } else {
                setAlert({ title: '發生錯誤', type: 'error' });
            }
        },
        [router, createFolder, queryId]
    );

    const updateDocument = async (id: string, name: string) => {
        if (id) {
            const res = await updateDocumentById(
                apiSetting.Document.updateDocumentNameById(id, name)
            );
            if (res.data?.success) {
                setAlert({ title: '更新成功', type: 'success' });
                router.reload();
            } else {
                setAlert({ title: '發生錯誤', type: 'error' });
            }
        }
    };

    const handleMoveItems = async (target_folder_id: string | null) => {
        if (target_folder_id != null) {
            const formData = new FormData();
            for (const i of documents_items) {
                formData.append('document_items[]', i);
            }
            for (const i of folders_items) {
                formData.append('folder_items[]', i);
            }
            if (target_folder_id) {
                formData.append('target_folder_id', target_folder_id);
            }
            if (router.query.id) {
                formData.append('current_folder_id', router.query.id + '');
            }
            moveItemsToSpecificFolder({
                data: formData
            });
        }
    };

    const handleDeleteItems = async () => {
        const formData = new FormData();
        for (const i of documents_items) {
            formData.append('document_items[]', i);
        }
        for (const i of folders_items) {
            formData.append('folder_items[]', i);
        }
        // moveItemsToSpecificFolder({
        //     data: formData
        // });
    };

    const handleDownloadItemsAndFolders = useCallback(async () => {
        const data = {
            folder_ids: folders_items,
            document_ids: documents_items
        };
        const res = await axios.request(apiSetting.Drive.downloadItemsByIDs(data));
        try {
            const dataURL = URL.createObjectURL(res.data);
            const a = document.createElement('a');
            a.href = dataURL;
            a.download = 'documents.zip';
            a.click();
        } catch {}
    }, [folders_items, documents_items]);

    const confirmDocumentFormik = useFormik({
        initialValues: {
            document_id: null,
            tag_id: ''
        },
        onSubmit: async (values) => {
            setUpdateTag(true);
            const res = await updateDocumentTag({
                data: {
                    document_ids: documents_items,
                    tag_id: values.tag_id
                }
            });
            setUpdateTag(false);
            if (res.data.success === true) {
                setAlert({ title: '更新成功', type: 'success' });
                router.reload();
            } else {
                setAlert({ title: '更新失敗', type: 'error' });
            }
        }
    });

    const updateFolder = async (id: string, name: string) => {
        if (id) {
            const res = await updateFolderName(apiSetting.Folders.updateFoldertNameById(id, name));
            if (res.data?.success) {
                setAlert({ title: '更新成功', type: 'success' });
                router.reload();
            } else {
                setAlert({ title: '發生錯誤', type: 'error' });
            }
        }
    };

    const handleDeepUnderstanding = async (form_schema_id: string, needs_approval: boolean) => {
        if (form_schema_id) {
            setUpdateTag(true);
            const res = await deepUnderstandingDocument({
                data: {
                    document_items: documents_items,
                    form_schema_id: form_schema_id,
                    needs_approval: needs_approval
                }
            });
            setUpdateTag(false);
            if (res.data?.success) {
                setAlert({ title: '操作成功', type: 'success' });
                router.reload();
            } else {
                setAlert({ title: '發生錯誤', type: 'error' });
            }
        }
    };

    const updateFolderOrDocumentHandler = useCallback(async () => {
        if (current?.type === 'folders') updateFolder(current?.id, current?.name);
        else updateDocument(current?.id, current?.name);
    }, [current]);

    const deleteDocument = async (id: string) => {
        if (id) {
            const res = await deleteDocumentById(apiSetting.Document.deleteDocumentById(id));
            if (res.data?.success) {
                setAlert({ title: '刪除成功', type: 'success' });
                router.reload();
            } else {
                setAlert({ title: '發生錯誤', type: 'error' });
            }
        }
    };

    const deleteFolder = async (id: string) => {
        if (id) {
            const res = await deleteFolderById(apiSetting.Folders.deleteFolderById(id));
            if (res.data?.success) {
                setAlert({ title: '刪除成功', type: 'success' });
                router.reload();
            } else {
                setAlert({ title: '發生錯誤', type: 'error' });
            }
        }
    };

    const deleteFolderOrDocumentHandler = useCallback(async () => {
        if (current?.type === 'folders') deleteFolder(current?.id);
        else deleteDocument(current?.id);
    }, [current]);

    const showAllItemsHandler = useCallback(async () => {
        setPage((page) => page + 1);
    }, []);

    const search = async (tag_id: string, content: string, startDate: string, endDate: string) => {
        if (tag_id == '') {
            setAlert({ title: '請選擇類別', type: 'info' });
            return;
        }
        if (startDate > endDate) {
            setAlert({ title: '起始日期不能大於結束日期', type: 'info' });
            return;
        }
        Router.push({
            pathname: '/search',
            query: {
                content: content,
                tag_id: tag_id,
                from: startDate,
                to: endDate
            }
        });
    };

    useEffect(() => {
        if (router.query.id) {
            setPage(1);
        }
    }, [router.query.id]);

    useEffect(() => {
        if (router.asPath !== router.route) {
            queryId.current = router.query.id;
            queryName.current = router.query.name;
            if (queryId.current) {
                // setPage(1);
                showAllItems(apiSetting.Drive.showAllFolderItems(queryId.current.toString(), page));
            } else {
                showAllItems(apiSetting.Drive.showAllRootItems(page));
            }
        } else if (router.asPath == '/') {
            showAllItems(apiSetting.Drive.showAllRootItems(page));
        }
    }, [router, showAllItems, page]);

    useEffect(() => {
        if (!showAllItemsLoading && showAllItemsData) {
            setId(queryId.current?.toString() || null);
            setName(queryName.current?.toString() || null);
            if (page == 1) {
                setAllFoldersItemsData(showAllItemsData.folders);
                setAllItemsData(showAllItemsData.documents);
            } else {
                setAllItemsData(allItemsData.concat(showAllItemsData.documents));
            }
        }
    }, [showAllItemsLoading, showAllItemsData]);

    useEffect(() => {
        if (moveItemsToSpecificFolderData) {
            if (moveItemsToSpecificFolderData?.success) {
                setAlert({ title: '移動成功', type: 'success' });
                router.reload();
            } else {
                setAlert({ title: '沒有權限', type: 'error' });
            }
        }
    }, [moveItemsToSpecificFolderData]);

    return (
        <DriveView
            {...{
                id,
                name,
                showAllItemsData,
                showAllItemsLoading,
                mode,
                setMode,
                target,
                setTarget,
                dest,
                setDest,
                shareWith,
                setShareWith,
                handleShare,
                newFolderName,
                handleNewFolder,
                countDocumentsByDateData,
                current,
                setCurrent,
                visableRename,
                setVisableRename,
                updateFolderOrDocumentHandler,
                visableDelete,
                setVisableDelete,
                deleteFolderOrDocumentHandler,
                allItemsData,
                allFoldersItemsData,
                showAllItemsHandler,
                documents_items,
                setDocumentsItems,
                folders_items,
                setFoldersItems,
                handleMoveItems,
                handleDeleteItems,
                handleDownloadItemsAndFolders,
                getAllLabelsData,
                search,
                confirmDocumentFormik,
                newLabelName,
                setNewLabelName,
                addNewLabelHandler,
                updateTag,
                setUpdateTag,
                schemasStatusReadyData,
                handleDeepUnderstanding
            }}
        />
    );
}
