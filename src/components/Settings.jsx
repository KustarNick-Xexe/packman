import Tittle from './Tittle';
import InputField from './InputField';
import Button from './Button';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { addW, addS, addP } from '../store/actions'

const validationSchema = Yup.object({
  speed: Yup.number().typeError('Должно быть число').required("Поле обязательно для заполнения"),
  consumption: Yup.number().typeError('Должно быть число').required("Поле обязательно для заполнения"),
  cost: Yup.number().typeError('Должно быть число').required("Поле обязательно для заполнения"),
  unloading: Yup.number().typeError('Должно быть число').required("Поле обязательно для заполнения"),
  fine: Yup.number().typeError('Должно быть число').required("Поле обязательно для заполнения"),
});

const Settings = ({ onLoad }) => {
  const dispatch = useDispatch();

  const handleClick = async (values, { setSubmitting }) => {
    onLoad(true);
    const { speed, consumption, cost, unloading, fine } = values;
    const responseApi = await axios.get(`http://localhost:3007/pack?speed=${speed}&consumption=${consumption}&cost=${cost}&unloading=${unloading}&fine=${fine}`);
    const resultApi = responseApi.data;
    const wroutes = resultApi.windows.routes.map(s => s.split('-').map(Number).filter(n => n !== 0));
    const wvehicles = resultApi.windows.vehicle.map(v => +v);
    const wprice = resultApi.windows.price;

    const sroutes = resultApi.split.routes.map(s => s.split('-').map(Number).filter(n => n !== 0));
    const svehicles = resultApi.split.vehicle.map(v => +v);
    const sprice = resultApi.split.price;

    const responseServer = await axios.get(`http://localhost:3007/api/plans`);
    const resultServer = responseServer.data;

    for (let i = 0; i < wvehicles.length; i++) {
      const plan = resultServer.filter(item => item.idVehicle === wvehicles[i]);
      console.log(plan.map(item => item.plan))
      let result = plan.map(item => item.plan).map(item => JSON.parse(item));
      dispatch(addW(plan[0].idVehicle, wroutes[i], result,
        { w: plan[0].vehicle.width, h: plan[0].vehicle.length, d: plan[0].vehicle.height, m: plan[0].vehicle.weight }));
    }

    const responseServer2 = await axios.get(`http://localhost:3007/api/plans2`);
    const resultServer2 = responseServer2.data;

    for (let i = 0; i < svehicles.length; i++) {
      const plan = resultServer2.filter(item => item.idVehicle === svehicles[i]);
      let result = plan.map(item => item.plan).map(item => JSON.parse(item));
      dispatch(addS(plan[0].idVehicle, sroutes[i], result,
        { w: plan[0].vehicle.width, h: plan[0].vehicle.length, d: plan[0].vehicle.height, m: plan[0].vehicle.weight }));
    }

    dispatch(addP(wprice, sprice));
    onLoad(false);
    alert(wroutes);
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
      }}
      validationSchema={validationSchema}
      onSubmit={handleClick}
    >
      {({ isSubmitting, errors, isValid }) => (
        <Form>
          <div className='bg-white w-72 shadow px-4 py-4 m-1 rounded-md'>
            <Tittle
              text={'Настройка алгоритма'}
              description={'Введите параметры, которые соответствуют данным'}
            />
            <InputField label={'Средняя скорость'} name={'speed'} placeholder={'Введите скорость'} errors={errors} />
            <InputField label={'Расход топлива на 100км'} name={'consumption'} placeholder={'Введите расход'} errors={errors} />
            <InputField label={'Стоимость литра бензина'} name={'cost'} placeholder={'Введите стоимость'} errors={errors} />
            <InputField label={'Время на разгрузку товара'} name={'unloading'} placeholder={'Введите время'} errors={errors} />
            <InputField label={'Штраф по временным окнам'} name={'fine'} placeholder={'Введите штраф'} errors={errors} />
            <Button text={isSubmitting ? 'Вычисления пошли...' : 'Отправить'} type={'submit'} disabled={isSubmitting || !isValid} />
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default Settings;