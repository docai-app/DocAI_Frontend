


interface ButtonProps {
    name: string
    onClick: any;
    icon?: any;
}

export default function BButton(props: ButtonProps) {
    const {
        name,
        icon,
        onClick
    } = props
    return (
        <>
            <button
                type="button"
                className={`flex mx-1 flex-row items-center rounded-md bg-blue-500 text-white py-2 px-4 shadow text-sm hover:bg-blue-600`}
                onClick={onClick}
            >
                {icon}
                {name || '確認'}
            </button>
        </>
    )
}