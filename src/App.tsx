import { CsatProvider } from "./context/CsatContext";
import { BuilderPage } from "./pages/BuilderPage";

function App() {
  return (
    <CsatProvider>
      <BuilderPage />
    </CsatProvider>
  );
}

export default App;
