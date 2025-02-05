import { Form } from "../../components/Form";
//import { api } from "../../lib/axios";
import "./styles.css";
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const navigate = useNavigate();


  return (
    <div>
      <Form title={'Criar publicação'} textbutton={'Criar'}  />
    </div>
  );
}

export default CreatePost; // Corrigido para exportação padrão
