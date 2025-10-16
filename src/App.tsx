import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Quran from "./pages/Quran";
import SurahDetail from "./pages/SurahDetail";

const App = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quran" element={<Quran />} />
        <Route path="/quran/:surahNumber" element={<SurahDetail />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default App;
