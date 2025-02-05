import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { EditIcon, DeleteIcon, MoonIcon } from '@chakra-ui/icons';

import {
  Box,
  Flex,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Textarea,
  useDisclosure,
  Alert,
  AlertIcon,
  useBreakpointValue
} from "@chakra-ui/react";
import { api } from '../../lib/axios';
import './styles.css'; // Certifique-se de que o arquivo CSS está importado

export function Feed() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const navigate = useNavigate();
  const { isOpen: isPostModalOpen, onOpen: onPostModalOpen, onClose: onPostModalClose } = useDisclosure();
  const { isOpen: isBookModalOpen, onOpen: onBookModalOpen, onClose: onBookModalClose } = useDisclosure();
 

  useEffect(() => {
    api.get('/api/postagem/listar')
      .then((response) => setPosts(response.data))
      .catch((err) => console.log(err));

    fetch('/livros.json')
      .then(response => response.json())
      .then(data => setBooks(data.livros))
      .catch(err => console.log(err));
  }, []);

  const fetchComments = (postId) => {
    api.get(`/api/postagem/${postId}/comments`)
      .then((response) => setComments(response.data))
      .catch((err) => console.log(err));
  };

  function handleDeletePost(id) {
    setPosts(posts.filter(post => post.id !== id));
    api.delete(`/api/postagem/excluir/${id}`);
    
  }

  const handleEditClick = (id) => {
    navigate(`/updatePost/${id}`);
  };

  const handleOpenPostModal = (post) => {
    setSelectedPost(post);
    fetchComments(post.id);
    onPostModalOpen();
  };

  const handleClosePostModal = () => {
    onPostModalClose();
    setSelectedPost(null);
    setComments([]);
    setNewComment("");
    setConfirmationMessage("");
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSendComment = () => {
    if (newComment.trim() && selectedPost) {
      api.post(`/api/postagem/${selectedPost.id}/addcomentario`, { text: newComment })
        .then((response) => {
          setComments([...comments, response.data]);
          setNewComment("");
          setConfirmationMessage("Comentário enviado com sucesso!");
          setTimeout(() => {
            setConfirmationMessage("");
            navigate('/Feed');
          }, 1000);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleOpenBookModal = (book) => {
    setSelectedBook(book);
    onBookModalOpen();
  };

  const handleCloseBookModal = () => {
    onBookModalClose();
    setSelectedBook(null);
  };
  //modo escuro daqui para baixo
  const [darkMode, setDarkMode] = useState(() => {
    // Recupera o valor de darkMode do localStorage ou define como false (modo claro) por padrão
    const savedMode = JSON.parse(localStorage.getItem('darkMode'));
    return savedMode !== null ? savedMode : false;
  });
  useEffect(() => {
    // Aplica o modo escuro ou claro no body
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    // Salva a preferência do usuário no localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };
  //modal de nome de usuario

   // Estado para controlar a visibilidade da modal
   const [isModalOpen, setIsModalOpen] = useState(false);
   // Estado para controlar o valor do input
   const [nomeUsuario, setInputValue] = useState('');
 
   useEffect(() => {
     // Verifica se o valor já foi salvo no localStorage
     const savedValue = localStorage.getItem('nomeUsuario');
     if (!savedValue) {
       // Se não houver valor salvo, abre a modal
       setIsModalOpen(true);
     }
   }, []);
 
   const handleInputChange = (event) => {
     setInputValue(event.target.value);
   };
 
   const saveValueAndCloseModal = () => {
     // Salva o valor no localStorage
     localStorage.setItem('nomeUsuario', nomeUsuario);
     // Fecha a modal
     setIsModalOpen(false);
   };
  return (
    <>
     
      <div className='azul'>
        <div id='sloticon'></div>
        <MoonIcon  onClick={toggleDarkMode}>
        { darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </MoonIcon>
        
      </div>

      <h1 className='bv'>Bem-vindo ao ParentalEase!</h1>

      <section className='sec'>
        <div className='dives'>
        <div id='mini'></div>
          {books[0] && (
            <div className='book-card' onClick={() => handleOpenBookModal(books[0])}>
              <div className='book-cover'>
                <img src={books[0].capa} alt={books[0].nome} />
              </div>
              <div className='book-info'>
                <h2>{books[0].nome}</h2>
                <h3>{books[0].autor}</h3>
                <p>{books[0].editora}</p>
              </div>
            </div>
          )}
        </div>
        <div className='dives'>
        <div id='mini2'></div>
          {books[1] && (
            <div className='book-card' onClick={() => handleOpenBookModal(books[1])}>
              <div className='book-cover'>
                <img src={books[1].capa} alt={books[1].nome} />
              </div>
              <div className='book-info'>
                <h2>{books[1].nome}</h2>
                <h3>{books[1].autor}</h3>
                <p>{books[1].editora}</p>
              </div>
            </div>
          )}
        </div>
        <div className='dives'>
        <div id='mini3'></div>
          {books[2] && (
            <div className='book-card' onClick={() => handleOpenBookModal(books[2])}>
              <div className='book-cover'>
                <img src={books[2].capa} alt={books[2].nome} />
              </div>
              <div className='book-info'>
                <h2>{books[2].nome}</h2>
                <h3>{books[2].autor}</h3>
                <p>{books[2].editora}</p>
              </div>
            </div>
          )}
        </div>
        <div className='dives'>
        <div id='mini4'></div>
          {books[3] && (
            <div className='book-card' onClick={() => handleOpenBookModal(books[3])}>
              <div className='book-cover'>
                <img src={books[3].capa} alt={books[3].nome} />
              </div>
              <div className='book-info'>
                <h2>{books[3].nome}</h2>
                <h3>{books[3].autor}</h3>
                <p>{books[3].editora}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className='posts'>
        <Button id='novopost' onClick={() => navigate('/createPost')}>
          Criar post
        </Button>
        {posts.map((post) => (
          <Box key={post.id} className='post-card'>
             <Box className="pos-nome">{nomeUsuario}</Box>
            <Flex className="post-header">
              <Box className="post-title">{post.titulo}</Box>
              <Box className="post-buttons">
                <EditIcon
                  fontSize={20}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(post.id);
                  }}
                />
                <DeleteIcon
                  fontSize={20}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePost(post.id);
                  }}
                />
              </Box>
            </Flex>
            <Box className="post-description">{post.descricao}</Box>
            <Button onClick={() => handleOpenPostModal(post)}>Ver Detalhes</Button>
          </Box>
        ))}
      </div>

      {/* Modal para mostrar os detalhes do post */}
      <Modal isOpen={isPostModalOpen} onClose={handleClosePostModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalhes do Post</ModalHeader>
          <ModalBody>
            {selectedPost && (
              <>
                <h1><strong>Título:</strong> {selectedPost.titulo}</h1>
                <p><strong>Descrição:</strong> {selectedPost.descricao}</p>
                <p><strong>Conteúdo:</strong> {selectedPost.conteudo}</p>
                <Box className="comment-box">
                  <h3>Comentários:</h3>
                  {comments.length === 0 && <p>Nenhum comentário ainda.</p>}
                  {comments.map((comment) => (
                    <Box key={comment.id} borderWidth={1} borderRadius="md" p={2} mb={2}>
                      <p>{comment.text}</p>
                    </Box>
                  ))}
                  <Textarea
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Digite seu comentário"
                    rows={4}
                  />
                  <Button mt={2} colorScheme="blue" onClick={handleSendComment}>
                    Enviar Comentário
                  </Button>
                </Box>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClosePostModal}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal para mostrar os detalhes do livro */}
      <Modal isOpen={isBookModalOpen} onClose={handleCloseBookModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalhes do Livro</ModalHeader>
          <ModalBody>
            {selectedBook && (
              <>
                <Box className="book-details">
                  <img src={selectedBook.capa} alt={selectedBook.nome} className="book-cover" />
                  <h2>{selectedBook.nome}</h2>
                  <h3>{selectedBook.autor}</h3>
                  <p>{selectedBook.editora}</p>
                  <p>{selectedBook.sinopse}</p>
                </Box>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseBookModal}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {confirmationMessage && (
        <Alert status="success" variant="solid" className="alert">
          <AlertIcon />
          {confirmationMessage}
        </Alert>
      )}
    </>
  );
}
