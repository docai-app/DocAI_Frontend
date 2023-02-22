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
        sex: 0 | 1 | null;
    };
}

export default function SettingContainer() {
    const router = useRouter();

    const [
        { data: currentUserData, loading: currentUserLoading, error: currentUserError },
        showCurrentUser
    ] = useAxios<ShowCurrentUser>(apiSetting.User.showCurrentUser(), { manual: true });

    useEffect(() => {
        showCurrentUser();
    }, []);

    return (
        <SettingView
            {...{
                currentUserData,
                currentUserLoading
            }}
        />
    );
}
