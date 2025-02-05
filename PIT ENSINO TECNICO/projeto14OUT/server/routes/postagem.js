const express = require('express');
const Posts = require('../models/posts');
const router = express.Router();


// Rota para listar post
router.get('/listar', async (req, res) => {
  const posts = await Posts.findAll();
  res.json(posts);
});

// rota para ver comentario
router.get('/comentarios', async (req,res)=>{

}
)
router.post('/addcomentario', async (req, res) => {
  const { comentario } = req.body;
  const newPosts = await Posts.create({ comentario });
  res.json(newPosts);
});


// Rota para adicionar post
router.post('/adicionar', async (req, res) => {
  const { titulo, descricao, conteudo, comentario, imagem } = req.body;
  const newPosts = await Posts.create({ titulo, descricao, conteudo, comentario, imagem });
  res.json(newPosts);
});

// Rota para editar post
router.put('/editar/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, conteudo, imagem } = req.body;
  await Posts.update({ titulo, descricao, conteudo, imagem }, { where: { id } });
  res.json({ message: 'Post atualizado com sucesso' });
});

// Rota para deletar post
router.delete('/excluir/:id', async (req, res) => {
  const { id } = req.params;
  await Posts.destroy({ where: { id } });
  res.json({ message: 'Post deletado com sucesso' });
});

module.exports =  router;