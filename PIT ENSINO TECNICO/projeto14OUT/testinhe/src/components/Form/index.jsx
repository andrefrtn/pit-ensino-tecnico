import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';


export function Form({ title, textButton  }){
  const { id } = useParams();
  const [formData, setFormData] = useState({ titulo: '', descricao: '', conteudo: '',imagem: '' });
  const navigate = useNavigate();

/*  useEffect(() => {
    if (id) {
      api.get(`/posts/${id}`)
        .then(response => setFormData(response.data))
        .catch(err => console.log(err));
    }
  }, [id]);*/

  const handlePost = async (e) => {
    e.preventDefault();
      await api.post('/api/postagem/adicionar', formData);

      navigate('/feed'); // Redirecionar para a página de login após o cadastro

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };


  return (
    <form onSubmit={e => handlePost(e)} className="form-container">
      <h2 className="form-title">{title}</h2>
      <div className="form-group">
        <label htmlFor="titulo">Título:</label>
        <input
        placeholder='Um título criativo para sua postagem'
          type="text"
          id="titulo"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="descricao">Descrição:</label>
        <input
        placeholder='Descreva seu post em poucas palavras'
          type="text"
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="conteudo">Conteúdo:</label>
        <textarea
        placeholder='Informe detelhadamente o que você esta pensando...'
          type="text"
          id="conteudo"
          name="conteudo"
          value={formData.conteudo}
          onChange={handleChange}
          className="form-input"
        />

  
      </div>


      <div className="form-group">
        <label htmlFor="imagem">Insira uma imagem:</label>
        <textarea
          type="text"
          id="imagem"
          name="imagem"
          value={formData.imagem}
          onChange={handleChange}
          className="form-input"
        />

  
      </div>
      <button type="submit" className="form-button">Ok!{textButton}</button>
    </form>
  );
}
