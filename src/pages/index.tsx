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

  const [show, setShow] = useState<'tabela' | 'formulario'>('tabela');
  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())

  const clientes = [
    new Cliente("Amanda", 27, "1"),
    new Cliente("Willian", 26, "2"),
  ];

  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente);
    setShow('formulario');
  }

  function clienteExcluido(cliente: Cliente) {
    console.log(`Excluir...${cliente.nome}`);
  }

  function salvarCliente(cliente: Cliente) {
    setShow('tabela');
  }

  function novoCliente() {
    setCliente(Cliente.vazio())
    setShow('formulario');
  }

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
                onClick={novoCliente}
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
            cliente={cliente} 
            clienteMudou={salvarCliente} 
            cancelado={() => setShow('tabela')}
          />
        )}
      </Layout>
    </div>
  );
}
