import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import injectContext from "./state/context";
import { Home } from "./views/Home";
import { Podcast } from "./views/Podcast";
import Header from "./components/Header.component";
import { Episodes } from "./views/Episodes";

function App() {
  const basename = process.env.BASENAME || "";
  return (
    <main className="App">
      <Header />
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/*" element={<h2>Sorry, not found</h2>} />
          <Route path="/" element={<Home />} />
          <Route path="/podcast/:pod_id/episode/:ep_id" element={<Episodes />} />
          <Route path={`/podcast/:pod_id`} element={<Podcast />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default injectContext(App);
