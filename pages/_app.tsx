import '../styles/globals.css';
import type { AppProps } from 'next/app';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect } from 'react';
import { AlertProvider } from '../context/AlertContext';
import AlertModel from '../components/common/Widget/AlertModel';
import useAlert from '../hooks/useAlert';

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
                    router.push('/login');
                }
                return Promise.reject(error);
            }
        );
    }, [router]);
    return (
        <AlertProvider>
            <Component {...pageProps} />
            <AlertModel />
        </AlertProvider>
    );
}

export default MyApp;
