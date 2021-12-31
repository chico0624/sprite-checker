import './App.css';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
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
  padding-bottom: 100px;
`

const LinkDiv = styled.div`
  a {
    display: block;
    padding: 20px;
    width: 80%;
    max-width: 300px;
    margin: auto;
    font-size:1.2em;
    letter-spacing: 0.1em;
    border: 1px solid #3a86ff;
    border-radius: 5px;
    text-align: center;
    transition: .2s;
    &:hover {
      background-color: #3a86ff;
      color:#fff;
    }
  }
`

function App() {
  useTracking();
  const { pathname } = useLocation()
  return (
    <AppDiv>
      <main>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/sprite" element={<SpritePage />} />
          <Route path="/color" element={<ColorPage />} />
        </Routes>

        {pathname !== "/" &&
          <LinkDiv>
            <Link to="/">トップへ</Link>
          </LinkDiv>
        }
      </main>
    </AppDiv>
  );
}

export default App;
