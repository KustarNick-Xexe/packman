import Tittle from './Tittle';
import Field from './Field';
import Button from './Button';

const Settings = () => {

    return (
      <div className='bg-white w-72 shadow px-4 py-4 m-4 rounded-md'>
        <Tittle 
          text={'Настройка алгоритма'}
          description={'Введите параметры, которые соответствуют данным депо'}
        />
        <Field 
          label={'Количество ТС'} 
          name={'кол-во'} 
          placeholder={'Введите количество'}
        />
        <Field 
          label={'Количество ТС'} 
          name={'кол-во'} 
          placeholder={'Введите количество'}
        />
        <Field 
          label={'Количество ТС'} 
          name={'кол-во'} 
          placeholder={'Введите количество'}
        />
        <Button text={'Отправить'} type={'submit'}/>
      </div>
    )
}
  
export default Settings;