import { useState } from "react";
import { YMaps } from '@pbe/react-yandex-maps';
import RouteMap from "./RouteMap";
import List from "./List";
import Details from "./Details";


const View = () => {
  const [toggleState, setToggleState] = useState(1);

  const points = [
    [54.7431, 55.9678],
    [52.5822, 56.4525],
    [54.2940, 56.2609]
  ];

  return (
    <YMaps query={{ apikey: '6f6088ff-6718-41e8-ad65-b0ccbccdb63b' }}>
    <div className='bg-white w-full shadow px-4 py-4 m-4 rounded-md'>
      <div className="flex relative">
      <button
        className={ toggleState === 1 ? "font-medium text-gray-950 px-4 py-2 relative m-0 flex justify-center items-center" : "font-medium text-gray-950 px-4 py-2 m-0" }
        onClick={ () => setToggleState(1) }
      >
        Временные окна
        <div className={ toggleState === 1 ? "w-4/5 border-b-[2px] border-solid border-violet-600 absolute bottom-0 left-0 right-0 mx-auto z-10" : ""}></div>
      </button>
      <button
        className={ toggleState === 2 ? "font-medium text-gray-950 px-4 py-2 relative m-0 flex justify-center items-center" : "font-medium text-gray-950 px-4 py-2 m-0" }
        onClick={ () => setToggleState(2) }
      >
        Временные окна с раздельной доставкой
        <div className={ toggleState === 2 ? "w-4/5 border-b-[2px] border-solid border-violet-600 absolute bottom-0 left-0 right-0 mx-auto z-10" : ""}></div>
      </button>
      <hr className="w-full border-b-[2px] border-zinc-100 absolute bottom-0 left-0"/>
    </div>
      <div className="pt-4">
        { toggleState === 1 ? 
        <div className="flex justify-between items-start">
          <div className="flex items-start justify-between">
            <List />
            <Details />
          </div>
          <RouteMap points={ points }/>
        </div>
        :
        <div className="flex justify-between items-start">
          <div className="flex items-start justify-between">
            <List />
            <Details />
          </div>
          <RouteMap points={ points }/>
        </div>
        }
      </div>
    </div>
    </YMaps>
  );
}
  
export default View;
  