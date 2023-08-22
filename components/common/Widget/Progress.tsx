export default function Progress(props: any) {
    return (
        <>
            <div className="w-full relative items-center">
                <progress value={props?.value} max={100} className="progress rounded-md w-full">
                    {props?.value || 0}%
                </progress>
                <label className=" absolute top-1/2 left-1/2 text-white text-sm  -translate-x-1/2 -translate-y-1/2">
                    {props?.value || 0}%
                </label>
            </div>

            <style>
                {`
                    progress::-webkit-progress-value {
                        background: #504aed;
                        border-radius: 32px;
                    }
                    progress::-webkit-progress-bar {
                        background: #d1d1d1;
                        border-radius: 32px;
                    }
                `}
            </style>
        </>
    );
}
