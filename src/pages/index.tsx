import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import Tabela from "../components/Tabela";
import styles from "../styles/Home.module.css";
import Cliente from "../core/Cliente";
import Botao from "../components/Botao";
import Formulario from "../components/Formulario";
import { useState } from "react";

export default function Home() {

  const clientes = [
    new Cliente("Amanda", 27, "1"),
    new Cliente("Willian", 26, "2"),
  ];

  function clienteSelecionado(cliente: Cliente) {
    console.log(cliente.nome);
  }

  function clienteExcluido(cliente: Cliente) {
    console.log(`Excluir...${cliente.nome}`);
  }

  function salvarCliente(cliente: Cliente) {
    console.log(cliente)
  }

  const [show, setShow] = useState<'tabela' | 'formulario'>('tabela');

  return (
    <div
      className={`
    flex h-screen justify-center items-center
    bg-gradient-to-r from-purple-500 to-blue-600
    text-white
    `}
    >
      <Layout titulo="Cadastro Simples">
        {show === 'tabela' ? (
          <>
            <div className="flex justify-end">
              <Botao 
                className={'bg-gradient-to-r from-green-400 to-green-700'} 
                onClick={() => setShow('formulario')}
                >
                  Novo Cliente
                </Botao>
            </div>

            <Tabela
              clientes={clientes}
              clienteSelecionado={clienteSelecionado}
              clienteExcluido={clienteExcluido}
            ></Tabela>
          </>
        ) : (
          <Formulario 
            cliente={clientes[0]} 
            clienteMudou={salvarCliente} 
            cancelado={() => setShow('tabela')}
          />
        )}
      </Layout>
    </div>
  );
}
