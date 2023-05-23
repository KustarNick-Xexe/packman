import Tittle from './Tittle';
import Field from './Field';
import Button from './Button';
import axios from 'axios';

const Settings = () => {

    const handleClick = async () => {
      const response = await axios.get('http//localhost:3000/pack');
      const result = await response.data;
      console.log(result);
    };

    return (
      <div className='bg-white w-72 shadow px-4 py-4 m-4 rounded-md'>
        <Tittle 
          text={'Настройка алгоритма'}
          description={'Введите параметры, которые соответствуют данным депо'}
        />
        <Field 
          label={'Средняя скорость'} 
          name={'кол-во'} 
          placeholder={'Введите скорость'}
        />
        <Field 
          label={'Расход топлива на 100км'} 
          name={'кол-во'} 
          placeholder={'Введите расход'}
        />
        <Field 
          label={'Стоимость литра бензина'} 
          name={'кол-во'} 
          placeholder={'Введите стоимость'}
        />
        <Field 
          label={'Время на разгрузку товара'} 
          name={'кол-во'} 
          placeholder={'Введите время'}
        />
        <Field 
          label={'Штраф по временным окнам'} 
          name={'кол-во'} 
          placeholder={'Введите штраф'}
        />
         <Field 
          label={'Количество машин в автопарке'} 
          name={'кол-во'} 
          placeholder={'Введите количество'}
        />
        <Button text={'Отправить'} type={'submit'} onClick={ handleClick }/>
      </div>
    )
}
  
export default Settings;