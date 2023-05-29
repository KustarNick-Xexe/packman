import './index.css';
import Settings from './components/Settings';
import View from './components/View';
import { useState } from 'react';
import Loader from './components/Loader';

function App() {
  const [isLoading, setLoading] = useState(null);

  return (
    <div className='bg-slate-50 p-4 flex items-start'>
      <Settings onLoad={setLoading}/>
      { isLoading === null ? null : (isLoading ? <Loader/> : <View/>) }
    </div>
  )
}

export default App
