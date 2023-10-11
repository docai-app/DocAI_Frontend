import { useRouter } from 'next/router';
import { useState } from 'react';
import Api from '../../../apis';
import useAlert from '../../../hooks/useAlert';
import SchemasView from './SchemasView';

const apiSetting = new Api();

export default function ScheamDataContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [open, setOpen] = useState(false);


    return (
        <SchemasView
            {...{
                open,
                setOpen,
            }}
        />
    );
}
