import { useRouter } from 'next/router';
import { useState } from 'react';
import Api from '../../apis/index';
import useAlert from '../../hooks/useAlert';
import AnalysisView from './AnalysisView';

const apiSetting = new Api();

function AnalysisContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [open, setOpen] = useState(false);

    return (
        <>
            <AnalysisView
                {...{
                    open,
                    setOpen
                }}
            />
        </>
    );
}

export default AnalysisContainer;
