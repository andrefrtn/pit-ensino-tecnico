import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Cadastro = () => {
  const [username, setUsername] = useState("");
  const [fotoPerfil, setFoto] = useState("");
  const [cpf, setCPF] = useState("");
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '') 
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 
  };

  const handleCPFChange = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, ''); 
    const formattedCPF = formatCPF(numericValue);
  
    if (numericValue.length <= 11) {
      setCPF(formattedCPF);
    }
    
    setError('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/cadastro', {
        username,
        cpf, 
        email,
        senha,
      });

      navigate('/login'); // Redirecionar para a página de login após o cadastro
    } catch (error) {
      setError(error.response?.data?.error || 'Erro ao cadastrar');
    }
  };

  return (
    <C.Container>
      <C.Label>CRIE SUA CONTA</C.Label>
      <C.Content>
      <Input
          type="file"
          value={fotoPerfil}
          onChange={(e) => [setFoto(e.target.value), setError("")]}
        />
        <Input
          type="text"
          placeholder="Digite seu nome de usuario"
          value={username}
          onChange={(e) => [setUsername(e.target.value), setError("")]}
        />
        <Input
          type="text" // Alterado para text para permitir caracteres não numéricos
          placeholder="Digite seu CPF"
          value={cpf}
          onChange={handleCPFChange}
          maxLength= '11' // Limita a entrada a 14 caracteres (incluindo pontos e hífen)
        />
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="email"
          placeholder="Confirme seu E-mail"
          value={emailConf}
          onChange={(e) => [setEmailConf(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Inscrever-se" onClick={handleSignup} />
        <C.LabelSignin>
          Já tem uma conta?
          <C.Strong>
            <Link to="/Login">&nbsp;Entre</Link>
          </C.Strong>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  );
};

export default Cadastro;
