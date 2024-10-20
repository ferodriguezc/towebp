
import NavBar from './components/navBar';
import ToWebp from './components/towebp'
import './App.css';


function App() {

  return (



    <div className=' d-flex flex-column'>

      <NavBar></NavBar>
      <div className=' text-center'>
        <ToWebp></ToWebp>
      </div>

    </div>
  );
}

export default App;
