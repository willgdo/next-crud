interface BotaoProps {
    children: any
    className?: string
    onClick?: () => void
}

export default function Botao(props: BotaoProps) {
    return (
        <button onClick={props.onClick} className={`
            ${props.className}
            text-white px-4 py-2 rounded-md mb-4
        `}>
            {props.children}
        </button>
    )
}
