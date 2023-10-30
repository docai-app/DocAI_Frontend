// File Path: src/pages/_app.tsx

import 'animate.css';
import axios from 'axios';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet';
import AlertModel from '../components/common/Widget/AlertModel';
import { AlertProvider } from '../context/AlertContext';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';

const canUseDOM = typeof window !== 'undefined';
const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
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
        <SessionProvider session={session}>
            <AlertProvider>
                <script src="https://accounts.google.com/gsi/client" async defer></script>
                <Helmet>
                    {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                    <script src="https://code.highcharts.com/highcharts.js"></script>
                    <script src="https://accounts.google.com/gsi/client" async defer></script>
                </Helmet>
                <Component {...pageProps} />
                <AlertModel />
            </AlertProvider>
        </SessionProvider>
    );
}

export default MyApp;
