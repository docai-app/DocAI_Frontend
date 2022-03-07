import * as React from 'react';
import HeadNav from '../common/Layout/HeadNav';
import Footer from '../common/Layout/Footer';

interface SimpleLayoutProps {
    children: React.ReactChild;
}

function SimpleLayout(props: SimpleLayoutProps) {
    const { children } = props;
    return (
        <>
            <HeadNav />
            {children}
            <Footer />
        </>
    );
}

export default SimpleLayout;
