import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import useAlert from "../../../hooks/useAlert";

interface Props {
    title: string;
    description: string;
    price: string
}

export default function ShopRow(props: Props) {
    const {
        title,
        description,
        price
    } = props
    const { setAlert } = useAlert()
    return (
        <>
            <div className="flex flex-col px-4 py-2 rounded-md shadow">
                <div className="flex-1">
                    <p className="my-2 font-bold">{title}</p>
                    <p className="text-sm h-36 overflow-hidden">{description}</p>
                </div>
                <div className="flex-0 flex flex-row items-center justify-between">
                    <label>{price}</label>
                    <ShoppingCartIcon
                        className="w-5 hover:text-blue-500 cursor-pointer"
                        onClick={() => {
                            setAlert({
                                title: '新功能開發中，敬請期待！',
                                type: 'info'
                            })
                        }}
                    />
                </div>
            </div>
        </>
    )
}