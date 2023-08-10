import { useCallback, useEffect, useState } from 'react';
import Api from '../../../apis';
import CreateView from './CreateView';
import { Folder } from '../../../components/common/Widget/FolderTree';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';

const apiSetting = new Api();

function CreateContainer() {
    const router = useRouter();
    const [multipleDest, setMultipleDest] = useState<Folder[]>([]);
    const [{ data, loading, error }, createChatbot] = useAxios({}, { manual: true });

    const handleCreate = useCallback(
        async (name: string, description: string, folders: Folder[]) => {
            const res = await createChatbot(
                apiSetting.Chatbot.createChatbot(name, description, {
                    folder_id: folders.map((f) => f.id)
                })
            );
            if (res.data?.success) router.push('/chatbot');
        },
        [createChatbot, router]
    );

    useEffect(() => {
        console.log(multipleDest);
    });
    return <CreateView {...{ multipleDest, setMultipleDest, handleCreate }} />;
}

export default CreateContainer;
