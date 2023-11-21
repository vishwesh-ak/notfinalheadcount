import { pkg } from '@carbon/ibm-products';
import './App.css';
import './app.scss';
import { Content } from '@carbon/react';
import CarbonHeader from './components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './content/Dashboard/Dashboard';
import Home from './content/Home/Home';
import Login from './content/Login/Login';
import EmpPage from './content/EmpPage/EmpPage';
import '@carbon/ibm-products/css/index.min.css';
import NewPageDash from './content/Dashboard/NewPage/NewPageDash';

pkg.setAllComponents(true);
pkg.setAllFeatures(true);

export default function App() {
  return (
  <Routes>
  <Route exact path="/" element={<Login />} />
      <Route path="/home" element={<div><Home/><CarbonHeader /></div>} />
      <Route exact path="/emppage" element={<div><EmpPage /><CarbonHeader /></div>} />
      <Route exact path="/dashboard" element={<div><Dashboard/><CarbonHeader /></div>} />
      <Route path="/dashnew" element={<div><NewPageDash/><CarbonHeader /></div>} />
  </Routes>
    );
}

