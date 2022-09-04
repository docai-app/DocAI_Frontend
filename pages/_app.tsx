import '../styles/globals.css';
import type { AppProps } from 'next/app';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect } from 'react';

const canUseDOM = typeof window !== 'undefined';
const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    useIsomorphicLayoutEffect(() => {
        axios.defaults.headers.common['authorization'] =
            window.localStorage?.getItem('authorization') || '';
        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    localStorage.removeItem('authorization');
                    localStorage.removeItem('email');
                    document.cookie = `authorization=null; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
                    router.reload();
                } else {
                    return Promise.reject(error);
                }
            }
        );
    }, [router]);
    return <Component {...pageProps} />;
}

export default MyApp;
