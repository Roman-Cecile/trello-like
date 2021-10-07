import "../../styles/App/App.css";
import Board from "../Board";

function App() {
  return (
    <>
      <div className="App">
        <h1>Mon Trello like</h1>
        <p>
          Créez, déplacez, éditez et supprimez rapidement une carte qui
          représente une tâche à accomplir
        </p>
      </div>
      <Board />
    </>
  );
}

export default App;
