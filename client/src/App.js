import './App.css';
import React from 'react'
import { useGlobalContext } from './context';
import Quote from './components/Quote';
import Form from './components/Form';
import Loading from './components/Loading';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { quote, form } = useGlobalContext();
  if (!quote) return <Loading />
  if (quote && !form) return <Quote />
  if (quote && form) return <Form />
}

export default App;