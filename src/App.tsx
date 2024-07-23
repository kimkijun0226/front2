import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Daily from './page/Daily';
import Mobile from './page/Mobile';
import SMS from './page/SMS';
import MMS from './page/MMS';
import MainLayout from './layout/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Navigate to='/daily' />} />
          <Route path='/daily' element={<Daily />} />
          <Route path='/mobile' element={<Mobile />} />
          <Route path='/sms' element={<SMS />} />
          <Route path='/mms' element={<MMS />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
