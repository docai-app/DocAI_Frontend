
export default function Progress(props: any) {
    return (
        <>
            <div className="w-full relative items-center">
                <progress value={props?.value} max={100} className="progress rounded-md w-full" >{props?.value || 0}%</progress>
                <label className=" absolute left-[30%] sm:left-[45%] md:left-[45%] text-white text-sm">{props?.value || 0}%</label>
            </div>

            <style jsx>
                {`
                    progress::-webkit-progress-value {
                        background: #504AED;
                        border-radius: 32px;
                    }
                    progress::-webkit-progress-bar {
                        background: #d1d1d1;
                        border-radius: 32px;
                    }
                `}
            </style>
        </>

    )
}