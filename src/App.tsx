import './App.css';
import { Routes, Route } from 'react-router-dom';
import styled from "styled-components"

// pages
import SpritePage from './pages/SpritePage';
import TopPage from './pages/TopPage';
import useTracking from './hooks/useTracking';
import ColorPage from './pages/ColorPage';

const AppDiv = styled.div`
  width: 98%;
  max-width: 1000px;
  margin: auto;
`

function App() {
  useTracking();
  
  return (
    <AppDiv>
      <main>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/sprite" element={<SpritePage />} />
          <Route path="/color" element={<ColorPage />} />
        </Routes>
      </main>
    </AppDiv>
  );
}

export default App;
