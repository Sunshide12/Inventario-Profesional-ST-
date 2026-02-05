import './App.css'

const App = () => {
  const nombreEmpresa = "Mi Startup de Inventario";

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bienvenido a {nombreEmpresa}</h1>
      <p>Configuración completada con éxito 🚀</p>
      <button onClick={() => alert('¡Funciona!')}>Probar Sistema</button>
    </div>
  );
};

export default App;
