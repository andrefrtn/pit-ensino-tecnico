import { useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Form } from "../../components/Form";
import { api } from "../../lib/axios";

export function UpdatePost() {
  const { id } = useParams();
  const navigate = useNavigate();

  function handleUpdatePost(data) {
    api.put(`/api/postagem/editar/${id}`, data)
      .then(() => navigate("/Feed"))
      .catch(err => console.log(err));
  }

  return (
    <div>
      <Form
        title={'Editar publicação'}
        textButton={'Editar'}
        onAction={handleUpdatePost}
      />
    </div>
  );
}
