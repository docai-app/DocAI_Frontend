import copy from 'copy-to-clipboard';
import { Image } from 'react-bootstrap';
import useAlert from '../../../hooks/useAlert';

interface OGProps {
    title: string;
    description: string;
    url: string;
}
export default function OGView(props: OGProps) {
    const { setAlert } = useAlert();
    return (
        <>
            <p className="text-sm">文檔放在這裡(點擊可複製連結)</p>
            <div
                className="w-full border border-gray-200 p-2 flex flex-row cursor-pointer"
                onClick={() => {
                    copy(props?.url);
                    setAlert({ title: '已複製連結', type: 'success' });
                }}
            >
                <div className=" flex flex-1 w-full description">
                    <p className="line_1">{props?.title}</p>
                    <p className=" line_2 text-gray-400 text-sm  ">{props?.description}</p>
                    <div className=" overflow-hidden text-ellipsis whitespace-nowrap">
                        <span className=" text-gray-800 text-sm  ">{props?.url}</span>
                    </div>
                </div>
                <div className="flex flex-0   ">
                    <Image
                        thumbnail={true}
                        width={80}
                        src="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-link-icon-image_1198606.jpg"
                    />
                </div>
            </div>
            <style jsx>
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
