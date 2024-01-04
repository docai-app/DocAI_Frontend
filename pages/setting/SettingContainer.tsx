import useAxios from 'axios-hooks';
import SettingView from './SettingView';
import Api from '../../apis';
import { FormEvent, FormEventHandler, useCallback, useEffect, useRef } from 'react';
import useAlert from '../../hooks/useAlert';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';

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
        {
            data: googleSignInCallbackData,
            loading: googleSignInCallbackLoading,
            error: googleSignInCallbackError
        },
        googleSignInCallback
    ] = useAxios(apiSetting.User.googleSignInCallback(), { manual: true });

    const [
        { data: currentUserData, loading: currentUserLoading, error: currentUserError },
        showCurrentUser
    ] = useAxios<ShowCurrentUser>(apiSetting.User.showCurrentUser(), { manual: true });

    const signInCallback = (result: any) => {
        if (result.credential) {
            const params = { token: result.credential };
            googleSignInCallback({ params }).then((res) => {
                console.log(res);
            });
        }
    };

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_GMAIL_READ_INCOMING_CLIENT_ID,
            callback: signInCallback,
            cancel_on_tap_outside: false
        });

        google.accounts.id.renderButton(document.getElementById('signInDiv'), {
            theme: 'outline',
            size: 'large'
        });
    }, []);

    useEffect(() => {
        showCurrentUser();
    }, []);

    return (
        <>
            <SettingView
                {...{
                    currentUserData,
                    currentUserLoading
                }}
            />
            <Helmet>
                {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                <script src="https://accounts.google.com/gsi/client" async defer></script>
            </Helmet>
            <div className="flex flex-col rounded-2xl bg-gray-100 px-12 py-6 border mb-4">
                <div className="flex flex-col">
                    <h2 className="text-slate-900 font-bold text-xl mb-6">連結第三方</h2>
                    <div className="col-span-2 rounded-lg bg-white p-6 shadow flex flex-col gap-6">
                        <label className="flex flex-col gap-2">
                            <div>Gmail 連結</div>
                            <div id="signInDiv" />
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}
