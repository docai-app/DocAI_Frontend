import * as React from 'react';
import HeadNav from '../common/Layout/HeadNav';
import Footer from '../common/Layout/Footer';
import LeftMenu from '../common/Layout/LeftMenu';

interface SimpleLayoutProps {
    children: React.ReactChild;
}

function SimpleLayout(props: SimpleLayoutProps) {
    const { children } = props;
    return (
        <div className="h-screen relative">
            <HeadNav />
            <LeftMenu content={children} />
            {/* {children} */}
            {/* <Footer /> */}
        </div>
    );
}

export default SimpleLayout;
