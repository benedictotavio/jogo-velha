import React, { useState } from 'react';
import './App.css';


function App() {

  const inicio = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
  const [jogo, setJogo] = useState([['', '', ''], ['', '', ''], ['', '', '']])
  const [simboloAtual, setSimboloAtual] = useState('X')
  const [jogando, setJogando] = useState(true)

  const tabuleiro = (j) => {
    return (
      <div className='tabu'>
        <div className='tabuLinha'>
          <div className='casa' data-pos='00' onClick={(e) => joga(e)}>{j[0][0]}</div>
          <div className='casa' data-pos='01' onClick={(e) => joga(e)}>{j[0][1]}</div>
          <div className='casa' data-pos='02' onClick={(e) => joga(e)}>{j[0][2]}</div>
        </div>
        <div className='tabuLinha'>
          <div className='casa' data-pos='10' onClick={(e) => joga(e)}>{j[1][0]}</div>
          <div className='casa' data-pos='11' onClick={(e) => joga(e)}>{j[1][1]}</div>
          <div className='casa' data-pos='12' onClick={(e) => joga(e)}>{j[1][2]}</div>
        </div>
        <div className='tabuLinha'>
          <div className='casa' data-pos='20' onClick={(e) => joga(e)}>{j[2][0]}</div>
          <div className='casa' data-pos='21' onClick={(e) => joga(e)}>{j[2][1]}</div>
          <div className='casa' data-pos='22' onClick={(e) => joga(e)}>{j[2][2]}</div>
        </div>
      </div>
    )
  }

  const BtnJogarNovamente = () => {
    if (!jogando) {
      return (
        <div className='btnSec'>
          <button className='btnJogar' onClick={() => reiniciar()}>Jogar Novamente</button>
        </div>
      )
    }
  }

  //LATERAIS

  const verificarVitoria = () => {
    let pontos = 0
    let vitoria = false
    for (let i = 0; i < 3; i++) {
      pontos = 0
      for (let c = 0; c < 3; c++) {
        if (jogo[1][c] === simboloAtual) {
          pontos++
        }
      }
      if (pontos >= 3) {
        vitoria = true
        break
      }
    }

    for (let c = 0; c < 3; c++) {
      pontos = 0
      for (let i = 0; i < 3; i++) {
        if (jogo[i][c] === simboloAtual) {
          pontos++
        }
      }
      if (pontos >= 3) {
        vitoria = true
        break
      }
    }

    //DIAGONAIS

    pontos = 0
    for (let d = 0; d < 3; d++) {
      if (jogo[d][d] === simboloAtual) {
      }
    }
    if (pontos >= 3) {
      vitoria = true
    }
    pontos = 0
    let i = 0
    for (let c = 2; c >= 0; c--) {
      if (jogo[i][c] === simboloAtual) {
        pontos++
      }
      i++
    }
    if (pontos >= 3) {
      vitoria = true
    }
    return vitoria
  }


  const trocaJogador = () => {
    simboloAtual === 'X' ? setSimboloAtual('O') : setSimboloAtual('X')
  }

  const retPos = (e) => {
    const p = e.target.getAttribute('data-pos')
    const pos = [parseInt(p.substring(0, 1)), parseInt(p.substring(1, 2))]
    return pos
  }

  const verificarEspacoVazio = (e) => {
    if (jogo[retPos(e)[0]][retPos(e)[1]] === '') {
      return true
    } else {
      return false
    }
  }

  const joga = (e) => {
    if (jogando) {
      if (verificarEspacoVazio(e)) {
        jogo[retPos(e)[0]][retPos(e)[1]] = simboloAtual
        trocaJogador()
        if (verificarVitoria()) {
          trocaJogador()
          alert('Jogador ' + simboloAtual + ' venceu!')
          setJogando(false)
        } else {
          alert('Este espaço não esta disponivel!')
        }
      }
    }
  }

  const reiniciar = () => {
    setJogando(true)
    setJogo(inicio)
    setSimboloAtual('X')
  }


  return (
    <>
      <div className='turno'>
        <p>Quem joga: {simboloAtual}</p>
      </div>
      <div>
        {tabuleiro(jogo)}
      </div>
      <div>
        {BtnJogarNovamente()}
      </div>
    </>
  )
}
export default App;
