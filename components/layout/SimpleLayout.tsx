import * as React from 'react';
import { useState } from 'react';
import HeadNav from '../common/Layout/HeadNav';
import LeftMenu from '../common/Layout/LeftMenu';

interface SimpleLayoutProps {
    children: React.ReactChild;
}

function SimpleLayout(props: SimpleLayoutProps) {
    const { children } = props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="h-screen relative">
            <HeadNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <LeftMenu
                content={children}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            {/* {children} */}
            {/* <Footer /> */}
        </div>
    );
}

export default SimpleLayout;
