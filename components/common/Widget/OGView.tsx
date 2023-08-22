import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { FolderIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { Image } from 'react-bootstrap';
import useAlert from '../../../hooks/useAlert';

interface OGProps {
    title: string;
    description: string;
    url: string;
    documentPath: { id: string | null; name: string }[];
}
export default function OGView(props: OGProps) {
    const { setAlert } = useAlert();
    return (
        <>
            <p className='border-l-4 pl-2 border-l-gray-500 text-sm"'>文檔放在這裡</p>
            {/* eslint-disable-next-line @next/next/link-passhref */}
            <Link href={props.url}>
                <div className="w-full border border-gray-200 p-2 mt-2 flex flex-row cursor-pointer">
                    <div className=" flex flex-1 w-full description">
                        <p className="line_1">{props?.title}</p>
                        <p className=" line_2 text-gray-400 text-sm min-h-[30px] ">
                            {props?.description || '暫無描述...'}
                        </p>
                        <div className=" overflow-hidden text-ellipsis whitespace-nowrap hidden">
                            {props?.url}
                        </div>
                        <div className=" overflow-hidden text-ellipsis whitespace-nowrap flex flex-row ">
                            <FolderIcon className="h-5 text-blue-200" />
                            <div className="flex flex-row">
                                {props?.documentPath &&
                                    props?.documentPath
                                        .slice(0, props?.documentPath.length - 1)
                                        .map((folder: any) => (
                                            <div
                                                key={folder.id}
                                                className="flex flex-row items-center text-sm "
                                            >
                                                {folder.name}{' '}
                                                <ChevronRightIcon className="text-gray-400 text-sm h-4" />
                                            </div>
                                        ))}
                                <div className="flex flex-row items-center text-sm ">
                                    {props?.documentPath &&
                                        props?.documentPath[props?.documentPath.length - 1].name}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-0">
                        <Image
                            alt="OG Image"
                            thumbnail={true}
                            width={80}
                            src="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-link-icon-image_1198606.jpg"
                        />
                    </div>
                </div>
            </Link>
            <style>
                {`
                    .description {
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                    }
                    .line_1 {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1; //多行在这里修改数字即可
                        overflow: hidden;
                        -webkit-box-orient: vertical;
                    }
                    .line_2 {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2; //多行在这里修改数字即可
                        overflow: hidden;
                        -webkit-box-orient: vertical;
                    }
                `}
            </style>
        </>
    );
}
