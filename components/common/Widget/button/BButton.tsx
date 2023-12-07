interface ButtonProps {
    name: string;
    onClick: any;
    icon?: any;
    bgColor?: any;
    disable?: boolean;
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

export default function BButton(props: ButtonProps) {
    const { name, icon, onClick, bgColor, disable = false } = props;
    return (
        <>
            <button
                type="button"
                className={classNames(
                    bgColor
                        ? bgColor
                        : ` ${disable ? ' bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`,
                    `flex mx-1 flex-row items-center rounded-md  text-white py-2 px-4 shadow text-sm `
                )}
                onClick={onClick}
                disabled={disable}
            >
                {icon}
                {name || '確認'}
            </button>
        </>
    );
}
