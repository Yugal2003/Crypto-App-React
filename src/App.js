import './App.css';

import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route , Routes} from 'react-router-dom';

// pages to connect
import MainPage from './components/MainPage';
import Coins from './components/Coins';
import CoinsDetails from './components/CoinsDetails';
import SignUp from './components/SignUp'
import SignIn from './components/SignIn';

function App() {
  return (
      <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<MainPage/>} />
              <Route path='/coins' element={<Coins/>} />
              <Route path='/coins/:id' element={<CoinsDetails/>} />
              <Route path='/signup' element={<SignUp/>} />
              <Route path='/signin' element={<SignIn/>} />
            </Routes>
            <Toaster/>
          </BrowserRouter>
      </div>
  );
}

export default App;
