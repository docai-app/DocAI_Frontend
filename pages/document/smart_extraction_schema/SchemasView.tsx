import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SingleActionModel from '../../../components/common/Widget/SingleActionModel';
import useAlert from '../../../hooks/useAlert';

interface SchemasViewProps {
    open: boolean;
    setOpen: any;
}

function SchemasView(props: SchemasViewProps) {
    const {
        open,
        setOpen
    } = props;
    const router = useRouter();
    const { setAlert } = useAlert();
    const [visableDelete, setVisibleDelete] = useState(false);
    const [visableGenerateChart, setVisibleGenerateChart] = useState(false);
    const [form_data_ids, set_form_data_ids] = useState<any>([]);
    const [datumId, setDatumId] = useState('');


    return (
        <>
            <SingleActionModel
                open={open}
                setOpen={setOpen}
                {...{
                    title: 'modalDescription?.title',
                    content: 'modalDescription?.content',
                    icon: (
                        <MagnifyingGlassIcon
                            className="h-6 w-6 text-green-600"
                            aria-hidden="true"
                        />
                    )
                }}
            />
            <div className="max-w-7xl mx-auto h-[calc(100vh-18.5rem)] px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                數據搜尋
                            </h2>
                        </div>
                    </div>
                    <header className="shadow bg-white flex justify-between items-center">

                    </header>
                    <div className="flex flex-row mt-4 mb-4 flex-wrap items-center">

                    </div>
                </div>
            </div>
        </>
    );
}
export default SchemasView;
