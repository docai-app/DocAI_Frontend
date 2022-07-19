import useAxios from 'axios-hooks';
import { FormEventHandler } from 'react';
import Api from '../../apis';
import LoginView from './LoginView';
import { useRouter } from 'next/router';

const apiSetting = new Api();

export default function LoginContainer() {
    const router = useRouter();
    const [{ data: signInData, loading: signInLoading, error: signInError }, signIn] = useAxios(
        '',
        { manual: true }
    );
    const handleSignIn: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const res = await signIn(apiSetting.Authorization.signIn(email, password));
        // if (res.data.success) {
        if (res.headers.authorization) {
            const token = res.headers.authorization;
            const expiryDate = 'Fri, 31 Dec 9999 23:59:59 GMT'; // to be updated so that this can be dynamic
            document.cookie = `authorization=${escape(token)}; expires=${expiryDate}`;
            router.reload();
        } else {
            document.cookie = `authorization=null; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        }
    };
    return (
        <LoginView handleSignIn={handleSignIn} {...{ signInData, signInLoading, signInError }} />
    );
}
