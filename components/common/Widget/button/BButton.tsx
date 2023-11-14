interface ButtonProps {
    name: string;
    onClick: any;
    icon?: any;
    bgColor?: any;
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

export default function BButton(props: ButtonProps) {
    const { name, icon, onClick, bgColor } = props;
    return (
        <>
            <button
                type="button"
                className={classNames(
                    bgColor ? bgColor : 'bg-blue-500 hover:bg-blue-600',
                    `flex mx-1 flex-row items-center rounded-md  text-white py-2 px-4 shadow text-sm `
                )}
                onClick={onClick}
            >
                {icon}
                {name || '確認'}
            </button>
        </>
    );
}
