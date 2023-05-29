import '../index.css';

const TCRoute = ({ items }) => {
    const cities = ['депо в Уфе', ...items, 'депо в Уфе'];
    return (
        <div className="flex">
            <ul>
                {cities.map( (item, index) =>
                    <li 
                        key={ index }
                        className="line list-none flex items-center my-2">
                        <div className="step w-3 h-3 mx-2 rounded-full bg-violet-600"></div>
                        { item }
                    </li>
                )}   
            </ul>
        </div>
    );
};
  
export default TCRoute;