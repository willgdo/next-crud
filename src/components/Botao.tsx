interface BotaoProps {
    cor?: 'green' | 'blue' | 'silver'
    children: any
}

export default function Botao(props: BotaoProps) {
    const cor = props.cor ?? 'green'
    return (
        <button className={`
            bg-gradient-to-r from-${cor}-400 to-${cor}-700
            text-white px-4 py-2 rounded-md mb-4
        `}>
            {props.children}
        </button>
    )
}
