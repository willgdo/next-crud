import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import Tabela from "../components/Tabela";
import styles from "../styles/Home.module.css";
import Cliente from "../core/Cliente";
import Botao from "../components/Botao";
import Formulario from "../components/Formulario";
import { useEffect, useState } from "react";
import ClienteRepositorio from "../core/ClienteRepositorio";
import ColecaoCliente from "../firebase/db/ColecaoClientes";

export default function Home() {

  const repo: ClienteRepositorio = new ColecaoCliente()

  const [show, setShow] = useState<'tabela' | 'formulario'>('tabela');
  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  const [clientes, setClientes] = useState<Cliente[]>([])

  useEffect(obterTodos, [])
  
  function obterTodos() {
    repo.obterTodos().then(clientes => {
      setClientes(clientes);
      setShow('tabela')
    })
    
  }

  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente);
    setShow('formulario');
  }

  async function clienteExcluido(cliente: Cliente) {
    await repo.excluir(cliente)
    obterTodos()
  }

  async function salvarCliente(cliente: Cliente) {
    await repo.salvar(cliente)
    obterTodos()
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
