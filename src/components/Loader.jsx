import { useState, useEffect } from 'react';
import { DotLoader } from 'react-spinner-overlay'

const Loader = () => {
    const texts = ["Пробуем попасть в окно...", "Делим неделимое...", "Боремся за плотность упаковки..."];
    const [currentText, setCurrentText] = useState(texts[0]);
    let index = 0;

    useEffect(() => {
        const interval = setInterval(() => {
            index = index + 1 === texts.length ? 0 : index + 1;
            setCurrentText(texts[index]);
        }, 1400);

        return () => clearInterval(interval);  // очищаем интервал, когда компонент размонтируется
    }, []);

    return (
        <div className="m-auto">
            <div className="flex flex-col justify-center items-center">
                <p className='text-violet-600 font-medium text-xl mb-4'>{ currentText }</p>
                <DotLoader color="#7c3aed" />
            </div>
        </div>
    );
}

export default Loader;
