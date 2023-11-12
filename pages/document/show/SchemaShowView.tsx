import Router, { useRouter } from 'next/router';
import HeaderBreadCrumb from '../../../components/common/Widget/HeaderBreadCrumb';
import useAlert from '../../../hooks/useAlert';

interface SchemaDataViewProps {
    formUrl: string;
    data: any;
    selectedResult: any;
}

function SchemaShowView(props: SchemaDataViewProps) {
    const { formUrl, data, selectedResult } = props;
    const router = useRouter();
    const { setAlert } = useAlert();

    return (
        <>
            <div className="max-w-7xl mx-auto min-h-full px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <HeaderBreadCrumb
                        title={'查看'}
                        back={() => {
                            Router.back();
                        }}
                    />
                    <div className="px-4 py-6 sm:px-0">
                        <div className="flex justify-center items-center p-0 border-0 border-dashed border-gray-200 bg-white rounded-lg w-full h-80vh">
                            <div className="w-full h-full flex-1 flex justify-left items-center object-contain object-center ">
                                <div className="w-full h-full border-4 border-dashed border-gray-200 bg-white rounded-lg object-cover">
                                    {formUrl?.split('.').pop() === 'pdf' ? (
                                        <object
                                            className="object-center object-cover w-full h-full flex justify-center items-center"
                                            type="application/pdf"
                                            data={formUrl + '#toolbar=0'}
                                            width="250"
                                        >
                                            <img
                                                src={
                                                    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png'
                                                }
                                                alt="PDF file icon"
                                                className="w-full "
                                            />
                                        </object>
                                    ) : (
                                        <img
                                            className="w-full h-full object-contain object-center lg:w-full lg:h-full"
                                            src={formUrl}
                                            alt={formUrl}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="right-side flex-1 justify-center flex overflow-auto h-full px-4">
                                <div className="flex flex-col px-2 w-full">
                                    {selectedResult?.map((result: any, index: number) => {
                                        return (
                                            <div
                                                key={index}
                                                className="my-2 border rounded-md p-2 w-full"
                                            >
                                                <p className=" font-bold text-xl mr-2">
                                                    {result.key}:
                                                </p>
                                                <label className=" text-gray-900  break-words whitespace-break-spaces">
                                                    {data && data[result.key]}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default SchemaShowView;
