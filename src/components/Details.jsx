import Scene from "./Scene";
import TCRoute from "./TCRoute";
import Tittle from "./Tittle";
import RouteMap from "./RouteMap";
import { useEffect, useState } from "react";
import axios from "axios";


//[54.73876, 55.97206],
const Details = ({ info }) => {
    const [coords, setCoords] = useState([])
    const items = [];
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`http://localhost:3007/api/clients`);
            const result = response.data;
            return result;
        }

        fetchData().then(clients => {
            let points = [];
            for (const client of clients) {
                if (info.routes.includes(client.id)) {
                    points.push(client);
                }
            }
            let temp = points.map(client => [client.coordX, client.coordY]);
            setCoords([[54.73876, 55.97206], temp, [54.73876, 55.97206]]);

            coords.forEach(coord => {
                axios.get(
                    `https://geocode-maps.yandex.ru/1.x/?apikey=6f6088ff-6718-41e8-ad65-b0ccbccdb63b&geocode=${coord[1]},${coord[0]}&format=json&lang=ru_RU&results=1`
                )
                    .then((response) => {
                        const data = response.data;
                        const addressComponents = data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components;

                        let city, street;
                        addressComponents.forEach(component => {
                            if (component.kind === 'locality') {
                                city = component.name;
                            }
                            if (component.kind === 'street') {
                                street = component.name;
                            }
                        });
                        items.push([city + street]);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })

            console.log(items);
        })

    }, [])

    const boxes = [
        [0, 0, 0, 6, 11, 5], [0, 0, 5, 12, 7, 5],
        [0, 0, 10, 15, 5, 7], [0, 7, 5, 5, 6, 11],
        [0, 11, 0, 12, 7, 5], [0, 13, 5, 7, 15, 5],
        [0, 28, 0, 6, 5, 11], [0, 13, 10, 12, 5, 7],
        [0, 18, 10, 15, 5, 7], [0, 23, 11, 5, 11, 6],
        [0, 18, 0, 12, 7, 5, true], [0, 33, 0, 5, 15, 7],
        [0, 34, 7, 5, 6, 11], [0, 40, 7, 5, 12, 7],
        [0, 48, 0, 15, 5, 7], [0, 40, 14, 6, 11, 5],
        [5, 23, 11, 5, 12, 7], [5, 33, 0, 5, 15, 7],
        [0, 51, 14, 11, 6, 5], [0, 52, 7, 12, 5, 7],
        [5, 35, 7, 5, 15, 7], [6, 0, 0, 6, 11, 5],
        [0, 53, 0, 12, 5, 7], [5, 5, 10, 15, 7, 5],
        [6, 35, 14, 5, 11, 6], [10, 23, 5, 5, 12, 7],
        [11, 35, 0, 7, 5, 15], [5, 5, 15, 11, 6, 5],
        [10, 23, 12, 12, 5, 7, true], [7, 7, 5, 7, 15, 5],
        [10, 40, 7, 5, 11, 6], [6, 25, 0, 12, 7, 5],
        [12, 53, 0, 5, 7, 15], [6, 46, 14, 11, 5, 6],
        [14, 12, 0, 7, 5, 12], [10, 28, 12, 15, 7, 5],
        [10, 40, 0, 11, 5, 6], [11, 40, 13, 12, 5, 7],
        [15, 17, 5, 5, 15, 7], [12, 0, 0, 6, 11, 5],
        [15, 45, 0, 5, 7, 12], [15, 0, 5, 7, 5, 15],
        [15, 12, 12, 5, 11, 6], [15, 40, 6, 12, 5, 7],
        [11, 51, 15, 15, 7, 5], [17, 52, 0, 6, 5, 11],
        [12, 17, 0, 12, 7, 5, true], [18, 35, 0, 7, 5, 15]
    ];
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
            {/* <RouteMap points={points}/> */}
            <div className=' w-[96%] h-[400px] mt-8 mb-4 mx-auto rounded-md border-2 border-solid border-zinc-300'>
                <Scene boxes={boxes} containerDimensions={[60, 20, 60]} />
            </div>
        </div>
    );
}

export default Details;