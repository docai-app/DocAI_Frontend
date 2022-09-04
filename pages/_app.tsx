import '../styles/globals.css';
import type { AppProps } from 'next/app';
import axios from 'axios';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        axios.defaults.headers.common['authorization'] =
            window.localStorage?.getItem('authorization') || '';
    }, []);
    return <Component {...pageProps} />;
}

export default MyApp;
