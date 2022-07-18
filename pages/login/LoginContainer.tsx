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
            localStorage.setItem('authorization', token);
            router.push('/');
        }
    };
    return (
        <LoginView handleSignIn={handleSignIn} {...{ signInData, signInLoading, signInError }} />
    );
}
