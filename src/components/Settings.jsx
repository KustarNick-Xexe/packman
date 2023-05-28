import Tittle from './Tittle';
import InputField from './InputField';
import Button from './Button';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { addVehicle } from '../store/actions'

const validationSchema = Yup.object({
  speed: Yup.number().typeError('Должно быть число').required("Поле обязательно для заполнения"),
  consumption: Yup.number().typeError('Должно быть число').required("Поле обязательно для заполнения"),
  cost: Yup.number().typeError('Должно быть число').required("Поле обязательно для заполнения"),
  unloading: Yup.number().typeError('Должно быть число').required("Поле обязательно для заполнения"),
  fine: Yup.number().typeError('Должно быть число').required("Поле обязательно для заполнения"),
  ts: Yup.number().typeError('Должно быть число').required("Поле обязательно для заполнения"),
});

const Settings = () => {
  const dispatch = useDispatch();

  const handleClick = async (values, { setSubmitting }) => {
    const { speed, consumption, cost, unloading, fine, ts } = values;
    //пути и список машин и общая цена
    const responseApi = await axios.get(`http://localhost:3007/pack?speed=${speed}&consumption=${consumption}&cost=${cost}&unloading=${unloading}&fine=${fine}&ts=${ts}`);
    const resultApi = responseApi.data;
    const responseServer = await axios.get(`http://localhost:3007/api/plans`);
    //const resultServer = await JSON.parse(responseServer.data);
    const plans = responseServer.data; //может прилететь массив
    const { idVehicle, plan, vehicle } = plans[0];
    //const { wroutes, wvehicles, wprice } =  resultApi.windows;
    //const { sroutes, svehicles, sprice } =  resultApi.split;
    //id, routes, plan


    //console.log(result);
    alert(JSON.stringify(resultApi));
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        speed: '',
        consumption: '',
        cost: '',
        unloading: '',
        fine: '',
        ts: '',
      }}
      validationSchema={validationSchema}
      onSubmit={ handleClick }
    >
      {({ isSubmitting, errors, isValid }) => (
        <Form>
          <div className='bg-white w-72 shadow px-4 py-4 m-1 rounded-md'>
            <Tittle
              text={'Настройка алгоритма'}
              description={'Введите параметры, которые соответствуют данным депо'}
            />
            <InputField label={'Средняя скорость'} name={'speed'} placeholder={'Введите скорость'} errors={errors} />
            <InputField label={'Расход топлива на 100км'} name={'consumption'} placeholder={'Введите расход'} errors={errors} />
            <InputField label={'Стоимость литра бензина'} name={'cost'} placeholder={'Введите стоимость'} errors={errors} />
            <InputField label={'Время на разгрузку товара'} name={'unloading'} placeholder={'Введите время'} errors={errors} />
            <InputField label={'Штраф по временным окнам'} name={'fine'} placeholder={'Введите штраф'} errors={errors} />
            <InputField label={'Количество машин в автопарке'} name={'ts'} placeholder={'Введите количество'} errors={errors} />
            <Button text={isSubmitting ? 'Вычиления пошли...' : 'Отправить'} type={'submit'} disabled={isSubmitting || !isValid} />
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default Settings;