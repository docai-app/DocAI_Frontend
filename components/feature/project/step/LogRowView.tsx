interface RowProps {
    title: string;
    logs?: any;
}

export default function LogRowView(props: RowProps) {
    const { title } = props;

    return (
        <>
            <div>
                <p className="text-xl font-bold my-2">{title}</p>
                <p className="text-sm px-2">{title}</p>
                <p className="text-sm px-2">{title}</p>
                <p className="text-sm px-2">{title}</p>
                <p className="text-sm px-2">{title}</p>
            </div>
        </>
    );
}
