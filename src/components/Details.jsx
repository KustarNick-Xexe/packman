import Scene from "./Scene";
import TCRoute from "./TCRoute";
import Tittle from "./Tittle";
import RouteMap from "./RouteMap";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";


//[54.73876, 55.97206],
const Details = ({ info }) => {
    const [coords, setCoords] = useState([]);
    const [items, setItems] = useState([]); 
    //const points = useSelector(state => state.plan);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`http://localhost:3007/api/clients`);
            const result = response.data;
            return result;
        }
    
        fetchData().then(async clients => {
            let points = [];
            for (const client of info.routes) {
                    points.push(clients.find(item => item.id === client));
            }
            let temp = points.map(client => [client.coordX, client.coordY]);
            setCoords([...temp]);
            
            let itemsTemp = Array(temp.length);
            const promises = temp.map((coord, index) => {
                return axios.get(
                    `https://geocode-maps.yandex.ru/1.x/?apikey=6f6088ff-6718-41e8-ad65-b0ccbccdb63b&geocode=${coord[1]},${coord[0]}&format=json&lang=ru_RU&results=1`
                )
                .then((response) => {
                    const data = response.data;
                    const addressComponents = data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components;
            
                    let city;
                    addressComponents.forEach(component => {
                        if (component.kind === 'locality') {
                            city = component.name;
                        }
                    });
                    itemsTemp[index] = [city]; 
                })
                .catch((error) => {
                    console.log(error);
                });
            });
        
            await Promise.all(promises);
            setItems(itemsTemp); 
        })
    }, [info.routes])

    useEffect(() => {}, [items])
    console.log(items)

    const boxes = info.plan;
    return (
        <div className=' min-w-[800px] min-h-[615px] overflow-y-scroll p-2 rounded-md border-2 border-solid border-zinc-300 h-96'>
            <Tittle
                text={'Описание ТС'}
                description={
                    `
                        ширина: ${info.vehicle.w}
                        длина: ${info.vehicle.h}
                        высота: ${info.vehicle.d}
                        групозоподъемность: ${info.vehicle.m}
                    `
                } />
            <TCRoute items={items} />
            <RouteMap points={coords}/>
            <div className=' w-[96%] h-[400px] mt-8 mb-4 mx-auto rounded-md border-2 border-solid border-zinc-300'>
                <Scene boxes={boxes} containerDimensions={[info.vehicle.h, info.vehicle.d, info.vehicle.w]} />
            </div>
        </div>
    );
}

export default React.memo(Details);