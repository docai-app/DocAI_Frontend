import useAxios from 'axios-hooks';
import SettingView from './SettingView';
import Api from '../../apis';
import { FormEvent, FormEventHandler, useCallback, useEffect, useRef } from 'react';
import useAlert from '../../hooks/useAlert';
import { useRouter } from 'next/router';

const apiSetting = new Api();

export interface ShowCurrentUser {
    success: boolean;
    user?: {
        id: string | null;
        date_of_birth: string | null;
        nickname: string | null;
        phone: string | null;
        position: string | null;
        sex: string | null;
    };
}

export default function SettingContainer() {
    const formRef = useRef<HTMLFormElement>(null);
    const { setAlert } = useAlert();
    const router = useRouter();

    const [
        { data: currentUserData, loading: currentUserLoading, error: currentUserError },
        showCurrentUser
    ] = useAxios<ShowCurrentUser>(apiSetting.User.showCurrentUser(), { manual: true });

    const [{}, updateUserByID] = useAxios(
        apiSetting.User.updateUserByID(currentUserData?.user?.id || ''),
        { manual: true }
    );

    const formSubmit: FormEventHandler = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            if (!formRef.current) return;
            const formData = new FormData(formRef.current);
            const data: any = {};
            formData.forEach((value, key) => (data[key] = value));
            updateUserByID({
                data,
                ...apiSetting.User.updateUserByID(currentUserData?.user?.id || '')
            }).then((res) => {
                if (res.data?.success) {
                    setAlert({ title: '保存成功', type: 'success' });
                } else setAlert({ title: '保存失敗', type: 'error' });
            });
        },
        [formRef, currentUserData]
    );

    useEffect(() => {
        showCurrentUser();
    }, []);

    return (
        <SettingView
            {...{
                currentUserData,
                currentUserLoading,
                formSubmit,
                formRef
            }}
        />
    );
}
