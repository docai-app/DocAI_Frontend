import { useRouter } from 'next/router';
import { useState } from 'react';
import Api from '../../apis';
import ShopView from './ShopView';

const apiSetting = new Api();

export default function ShopContainer() {
    const router = useRouter();
    const [open, setOpen] = useState(false)
    return (
        <ShopView
            {...{
                open,
                setOpen
            }}
        />
    );
}