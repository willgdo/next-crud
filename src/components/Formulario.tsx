import { useState } from "react";
import Cliente from "../core/Cliente";
import Botao from "./Botao";
import Entrada from "./Entrada";

interface FormularioProps {
    cliente: Cliente
    clienteMudou?: (cliente: Cliente) => void
    cancelado?: () => void
}

const Formulario = (props: FormularioProps) => {
    const id = props.cliente?.id
    const [nome, setNome] = useState(props.cliente?.nome ?? '')
    const [idade, setIdade] = useState(props.cliente?.idade ?? 0)

    return (
        <div>
            {
                id ? (
                    <Entrada className="mb-4" somenteLeitura valor={id} texto='Código'/>
                ) : false 
            }
            <Entrada 
                className="mb-4" 
                onChange={setNome} 
                valor={nome} 
                texto='Nome'
            />
            <Entrada 
                onChange={setIdade} 
                valor={idade} 
                tipo="number" 
                texto='Idade'
            />

            <div className="flex justify-end mt-7">
                <Botao 
                    className={'bg-gradient-to-r from-blue-400 to-blue-700 mr-2'}
                    onClick={() => props.clienteMudou?.(new Cliente(nome, +idade, id))}
                > 
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao 
                    className={'bg-gradient-to-r from-gray-400 to-gray-700'}
                    onClick={props.cancelado}
                >
                    Cancelar
                </Botao>
            </div>
        </div>  
    )
}

export default Formulario;