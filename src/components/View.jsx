import { useState } from "react";
import { useSelector } from "react-redux";
import { YMaps } from '@pbe/react-yandex-maps';
import List from "./List";
import Details from "./Details";


const View = () => {
  const [toggleState, setToggleState] = useState(1);
  const [vehicle, setVehicle] = useState(null);

  const prices = useSelector(state => state.prices);
  const witems = useSelector(state => state.witems);
  const sitems = useSelector(state => state.sitems);

  const handleClick = (idV) => {
    if(toggleState === 1) {
      setVehicle(witems.find(v => v.idV === idV))
    } else {
      setVehicle(sitems.find(v => v.idV === idV))
    }
  };

  return (
    <YMaps query={{ apikey: '6f6088ff-6718-41e8-ad65-b0ccbccdb63b' }}>
      <div className='bg-white w-full shadow px-4 py-4 m-1 rounded-md'>
        <div className="flex relative">
          <button
            className={toggleState === 1 ? "font-medium text-gray-950 px-4 py-2 relative m-0 flex justify-center items-center" : "font-medium text-gray-950 px-4 py-2 m-0"}
            onClick={() => setToggleState(1)}
          >
            Временные окна
            <div className={toggleState === 1 ? "w-4/5 border-b-[2px] border-solid border-violet-600 absolute bottom-0 left-0 right-0 mx-auto z-10" : ""}></div>
          </button>
          <button
            className={toggleState === 2 ? "font-medium text-gray-950 px-4 py-2 relative m-0 flex justify-center items-center" : "font-medium text-gray-950 px-4 py-2 m-0"}
            onClick={() => setToggleState(2)}
          >
            Временные окна с раздельной доставкой
            <div className={toggleState === 2 ? "w-4/5 border-b-[2px] border-solid border-violet-600 absolute bottom-0 left-0 right-0 mx-auto z-10" : ""}></div>
          </button>
          <hr className="w-full border-b-[2px] border-zinc-100 absolute bottom-0 left-0" />
        </div>
        <div className="pt-4">
          {toggleState === 1 ?
            <div className="flex items-start flex-nowrap">
              <div className="flex-col justify-between">
                {witems?.length > 0 && <List items={ witems } onClick={ handleClick }/> }
                {prices && <span className="font-medium text-lg text-black">ИТОГО:<br/>{Math.trunc(prices.wp)} рублей</span>}
              </div>
              <div className="flex-col justify-between">
               { vehicle && <Details info={ vehicle }/> }
              </div>
            </div>
            :
            <div className="flex items-start flex-nowrap">
              <div className="flex-col justify-between">
                {sitems?.length > 0 && <List items={ sitems } onClick={ handleClick }/> }
                {prices && <span className="font-medium text-lg text-black">ИТОГО:<br/>{Math.trunc(prices.sp)} рублей</span>}
              </div>
              <div className="flex-col justify-between">
              { vehicle && <Details info={ vehicle }/> }
              </div>
            </div>
          }
        </div>
      </div>
    </YMaps>
  );
}

export default View;
