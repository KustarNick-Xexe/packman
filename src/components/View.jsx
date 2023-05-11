import { useState } from "react";
import { YMaps, Map } from '@pbe/react-yandex-maps';

const View = () => {
  const [toggleState, setToggleState] = useState(1);


  return (
    <YMaps >
    <div className='bg-white w-full shadow px-4 py-4 m-4 rounded-md'>
      <div className="flex relative">
      <button
        className={ toggleState === 1 ? "font-medium text-gray-950 px-4 py-2 relative m-0 flex justify-center items-center" : "font-medium text-gray-950 px-4 py-2 m-0" }
        onClick={ () => setToggleState(1) }
      >
        Временные окна
        <div className={ toggleState === 1 ? "w-4/5 border-b-[2px] border-solid border-indigo-500 absolute bottom-0 left-0 right-0 mx-auto z-10" : ""}></div>
      </button>
      <button
        className={ toggleState === 2 ? "font-medium text-gray-950 px-4 py-2 relative m-0 flex justify-center items-center" : "font-medium text-gray-950 px-4 py-2 m-0" }
        onClick={ () => setToggleState(2) }
      >
        Временные окна с раздельной доставкой
        <div className={ toggleState === 2 ? "w-4/5 border-b-[2px] border-solid border-indigo-500 absolute bottom-0 left-0 right-0 mx-auto z-10" : ""}></div>
      </button>
      <hr className="w-full border-b-[2px] border-zinc-100 absolute bottom-0 left-0"/>
    </div>
      <div className="pt-4">
       { toggleState === 1 ? 
       <div className="flex justify-end items-center">
          <div>
          <Map 
              className="border-2 border-zinc-200" 
              defaultState={{ center: [54.29, 56.26], zoom: 11 }} 
              style={{ filter: 'saturate(80%) invert(100%) grayscale(100%) ', overflow: 'hidden', borderRadius: '10px', width: '500px', height: '800px' }}
              options={{
                suppressMapOpenBlock: 'false',
                suppressYandexLogo: 'false'
              }}/>
          </div>
        </div>
        :
        <div className="flex justify-end items-center">
          <div>
            <Map 
              className="border-2 border-zinc-200" 
              defaultState={{ center: [54.29, 56.26], zoom: 11 }} 
              style={{ filter: 'saturate(80%) invert(100%) grayscale(100%) ', overflow: 'hidden', borderRadius: '10px', width: '500px', height: '800px' }}
              options={{
                suppressMapOpenBlock: 'false',
                suppressYandexLogo: 'false',
                yandexMapDisablePoiInteractivity: 'false',
              }}/>
          </div>
        </div>
        }
      </div>
    </div>
    </YMaps>
  );
}
  
export default View;
  