import './App.css';
import Sprite from './components/Sprite';
import styled from "styled-components"

const AppDiv = styled.div`
  width: 98%;
  max-width: 1000px;
  margin: auto;
`
function App() {
  return (
    <AppDiv>
      <Sprite></Sprite>
    </AppDiv>
  );
}

export default App;
