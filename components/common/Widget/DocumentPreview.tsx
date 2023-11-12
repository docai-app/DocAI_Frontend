function DocumentPreview({ document }: { document: any }) {
    return (
        <div key={document.id} className="group relative">
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                {document.storage_url?.split(/[#?]/)[0].split('.').pop().trim() === 'pdf' ? (
                    <object
                        className="w-full h-full object-center object-cover lg:w-full lg:h-full flex justify-center items-center"
                        type="application/pdf"
                        data={document.storage_url + '#toolbar=0'}
                        width="250"
                        height="200"
                    >
                        <img
                            src={
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png'
                            }
                            alt="PDF file icon"
                            className="w-1/2 h-1/2 object-contain object-center"
                        />
                    </object>
                ) : (
                    <img
                        src={document.storage_url}
                        alt={document.name}
                        className="w-full h-full object-contain object-center lg:w-full lg:h-full"
                    />
                )}
            </div>
            <div className="mt-4 flex justify-between overflow-hidden">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <a href={document.storage_url} target="_blank" rel="noreferrer">
                            {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                            <p>文件名稱：{document.name}</p>
                            <p>
                                上傳日期：
                                {new Date(document.created_at).toISOString().split('T')[0]}
                            </p>
                        </a>
                    </h3>
                </div>
            </div>
        </div>
    );
}
export default DocumentPreview;
