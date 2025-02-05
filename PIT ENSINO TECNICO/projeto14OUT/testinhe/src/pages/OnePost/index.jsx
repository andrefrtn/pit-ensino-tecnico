import { useEffect, useState } from "react";
import "./styles.css";
import { api } from "../../lib/axios";
import { useParams} from 'react-router-dom'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";


export function OnePost() {

const [post, setPost] = useState({})

const {id} = useParams()

const [isOpen, setIsOpen] = useState(false);
const [selectedPost, setSelectedPost] = useState(null);


const handleOpenModal = (post) => {
  setSelectedPost(post);
  setIsOpen(true);
};

const handleCloseModal = () => {
  setIsOpen(false);
  setSelectedPost(null);
};

<Modal isOpen={isOpen} onClose={handleCloseModal}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Detalhes do Post</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      {selectedPost && (
        <>
          <h1><strong></strong> {selectedPost.titulo}</h1>
          <p><strong></strong> {selectedPost.descricao}</p>
          <p><strong></strong> {selectedPost.conteudo}</p>

        </>
      )}
    </ModalBody>

    <ModalFooter>
      <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
        Fechar
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>



useEffect(() =>  {
api.get(`/posts/${id}`)
.then(response => setPost(response.data))
.catch(err => console.log(err))
}, [])

  return (
    <article className="onePostContainer">
      <h2>{post.titulo}</h2>
      <p>
      {post.conteudo}
      </p>

    </article>
  );
}
