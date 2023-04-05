import { useEffect, useState } from 'react';

interface SearchRowProps {
    document?: any;
    setChecedkData?: any;
    checked: boolean;
    setDocument?: any;
}
export default function SearchRow(props: SearchRowProps) {
    const { document, setChecedkData, checked, setDocument } = props;

    const [visable, setVisable] = useState(false);

    useEffect(() => {
        if (!checked) setVisable(false);
    }, [checked]);

    const onMouseEnter = () => {
        if (checked) return;
        setVisable(true);
    };
    const onMouseLeave = () => {
        if (checked) return;
        setVisable(false);
    };
    const check = (e: any) => {
        setChecedkData(e.target.checked, e.target.value);
        setDocument(document);
    };

    return (
        <>
            <div
                key={document.id}
                className={`group relative flex flex-col justify-start items-center p-4 rounded-md hover:bg-gray-100 ${
                    checked && 'bg-gray-100'
                }`}
                onMouseEnter={() => {
                    onMouseEnter();
                }}
                onMouseLeave={() => {
                    onMouseLeave();
                }}
            >
                {(visable || checked) && (
                    <input
                        type={'radio'}
                        value={document.id}
                        name="document"
                        className=" absolute top-2 right-2"
                        onChange={(e) => {
                            check(e);
                        }}
                    />
                )}
                <div className="w-3/4 h-60 rounded-md overflow-hidden group-hover:opacity-75">
                    {document.storage_url.split(/[#?]/)[0].split('.').pop().trim() === 'pdf' ? (
                        <object
                            className="w-full h-full object-center object-contain"
                            type="application/pdf"
                            data={document.storage_url + '#toolbar=0'}
                        >
                            <img
                                src={
                                    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png'
                                }
                                alt="PDF file icon"
                                className="w-full h-full object-contain object-center"
                            />
                        </object>
                    ) : (
                        <img
                            src={document.storage_url}
                            alt={document.name}
                            className="w-full h-full object-contain object-center"
                        />
                    )}
                </div>
                <div className="mt-2 flex justify-center items-center">
                    <a href={document.storage_url} className="text-center">
                        <p className="relative text-gray-900 text-center text-sm">
                            {document.name}
                        </p>
                        <p className="relative text-gray-400  text-center text-xs">
                            {document.created_at.split('T')[0]}
                        </p>
                    </a>
                </div>
            </div>
        </>
    );
}
