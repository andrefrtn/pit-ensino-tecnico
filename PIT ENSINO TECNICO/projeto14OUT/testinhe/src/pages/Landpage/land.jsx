import React from 'react';
import { Link } from 'react-router-dom';
import './land.css'

function LandingPage() {
  return (
    <>
      <header className="header">
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/cadastro">Cadastro</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="background-image">
        <h1 className="overlay-text">ParentalEase</h1>
        <h2 className="overlay-subtext">A maternidade nunca foi tão <br/>facil com o apoio de quem<br/>ja viveu essa experiencia</h2>
      </div>
      <div className='linha'></div>
      <div id='la-mission'>
      <div className='missao'>
      <h2>NOSSA MISSÃO</h2>
      </div>
      <div className='missao1'>
        <h2>Nós sabemos que ser mãe ou pai de <br/>primeira viagem não é nada fácil, <br/> né? </h2>
        <img src="https://artpoin.com/wp-content/uploads/2023/09/artpoin-baby27.png" width="140px" />
      </div>
      <div className='missao2'>
      <img src="https://images.vexels.com/media/users/3/298618/isolated/preview/ab86fba764c837ac26386a824767fe93-big-yellow-smiling-star.png" width="140px" />
      <h4>E quando você tenta equilibrar tudo isso com a <br/>carreira, a sobrecarga bate forte. Aqui, nossa  <br/> missão é justamente dar aquele apoio que  <br/> falta, criar um cantinho onde você pode trocar <br/>ideias, desabafar e sentir que não está sozinho(a).
      </h4>
      </div>
      <div className='missao3'>
      <h4>O nosso espaço foi pensado para facilitar essa <br/>jornada, conectando quem entende os desafios de  <br/> ser mãe ou pai com quem está começando agora.  <br/> Queremos te ajudar a encontrar o equilíbrio entre <br/>cuidar dos seus filhos e seguir sua vida pessoal<br/>e profissional, com mais leveza e menos pressão.<br/>Afinal, estamos juntos nessa!</h4>
      <img src="https://png.pngtree.com/png-vector/20240201/ourmid/pngtree-moon-cartoon-in-flat-style-png-image_11584507.png" width="140px" />
      </div>
      </div>
    </>
  );
}

export default LandingPage;
