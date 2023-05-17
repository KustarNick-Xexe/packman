import Scene from "./Scene";
import TCRoute from "./TCRoute";
import Tittle from "./Tittle";

const Details = () => {
    const items = ['A - Депо - г. Уфа, ул. Гильманова 69', 
        'B - ЧВК "Вагнер" - с. Янаул, ул. Красивая 7', 
        'C - ЧВК "Вагнер" - с. Янаул, ул. Красивая 7',  
        'ЧВК "Вагнер" - с. Янаул, ул. Красивая 7',  
        'ЧВК "Вагнер" - с. Янаул, ул. Красивая 7', 
        'ЧВК "Вагнер" - с. Янаул, ул. Красивая 7', 
        'ЧВК "Вагнер" - с. Янаул, ул. Красивая 7',  
        'ЧВК "Вагнер" - с. Янаул, ул. Красивая 7',  
        'ЧВК "Вагнер" - с. Янаул, ул. Красивая 7', 
        'Депо - г. Уфа, ул. Гильманова 69'];

    const boxes = [
        [ 0, 0, 0, 1, 1, 2, true ],
        [ 0, 1, 0, 2, 1, 1, true ],
        [ 0, 1, 1, 2, 1, 1, true ],
        [ 1, 0, 0, 1, 1, 2 ]
      ];
    return (
        <div className=' min-w-[420px] overflow-y-scroll p-3 rounded-md border-2 border-solid border-zinc-300 h-96'>
            <Tittle 
                text={'Что-то про ТС'}
                description={'описание разлчиный деталей'}/>
            <TCRoute items={items}/>
            <div className=' w-[400px] h-[280px] mt-8 mb-4 mx-auto rounded-md border-2 border-solid border-zinc-300'>
                <Scene boxes={boxes} containerDimensions={[2, 2, 2]}/>
            </div>
            цалцозалоцаа\ааа <br/>
            ц <br/>
            <br/> <br/>
            цуаауацуа <br/>
            уа <br/>
            цалцозалоцаацацуац <br/>
            уа <br/>
            уца <br/>
            ацуацуа <br/>
            цуа <br/>
            уцаа <br/>

            уцаап <br/>
            уцаапцпуп <br/>
            п <br/>
            цацуапп <br/>
            цуп <br/> <br/>

            уцаапуцпуцпуцпц <br/>
            уцаацуаца <br/>
            ацуацуаа <br/> <br/>
            ацуацуаааца <br/>
            цалцозалоцаа <br/>
            <br/>
             ц <br/>
             уцаацуацаа <br/>
             ааа цацуаппцуа  <br/>
             ацуацуааацу <br/>
             ааацуа  <br/>
             ааацуа <br/>
             цуа ааацауца <br/>
             уца  <br/>
             а <br/>
             цуауц <br/>
              уца <br/>
               
               ааацауца ца
        </div>
    );
}
  
export default Details;