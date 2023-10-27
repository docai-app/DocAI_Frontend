import BButton from "./button/BButton";

interface BreadCrumbProps {
    title: string;
    back?: any;
    next?: any;
    saveTitle?: string;
    save?: any;
}

export default function HeaderBreadCrumb(props: BreadCrumbProps) {
    const {
        title,
        back,
        next,
        saveTitle,
        save
    } = props
    return (
        <>
            <div className="max-w-7xl  py-4">
                <div className="flex items-center relative ">
                    {back &&
                        <label
                            className=" flex-1 absolute left-0  px-4 py-2 rounded-md cursor-pointer text-indigo-500"
                            onClick={back}
                        >
                            {'<'} 返回
                        </label>
                    }
                    <label className="text-3xl sm:text-4xl font-bold  flex-1 flex justify-center ">{title}</label>
                    {next &&
                        <label
                            className=" underline flex-1 absolute right-0  px-4 py-2 rounded-md cursor-pointer text-indigo-500"
                            onClick={next}
                        >
                            下一步
                        </label>
                    }
                    {save &&
                        <BButton
                            name={saveTitle || '確認'}
                            onClick={save}
                        />
                    }
                </div>
            </div>
        </>
    )
}