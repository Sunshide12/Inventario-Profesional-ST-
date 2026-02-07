// 1. Importamos el componente desde la carpeta donde lo creaste
import LoginPage from "./pages/loginPage";

function App() {
  return (
    // 2. Usamos el componente como si fuera una etiqueta HTML personalizada
    <div className="App">
      <LoginPage />
    </div>
  );
}

// 3. Exportamos para que Vite sepa qué mostrar en el navegador
export default App;
