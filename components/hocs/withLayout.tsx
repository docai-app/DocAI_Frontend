// components/hocs/withLayout.tsx
import React from 'react';

export default function withLayout(Component: any, Layout: any) {
    return () => (
        <Layout>
            <Component />
        </Layout>
    );
}
