import './App.css';
import Sprite from './components/Sprite';
import styled from "styled-components"

const AppDiv = styled.div`
  width: 98%;
  max-width: 1000px;
  margin: auto;
`

const Title = styled.h1`
  margin: 20px;
  text-align: center;
`

function App() {
  return (
    <AppDiv>
      <Title>CSSスプライトアニメーション実験場</Title>
      <Sprite></Sprite>
    </AppDiv>
  );
}

export default App;
