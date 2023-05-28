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
  ts: Yup.number().typeError('Должно быть число').required("Поле обязательно для заполнения"),
});

const Settings = () => {
  const dispatch = useDispatch();

  const handleClick = async (values, { setSubmitting }) => {
    const { speed, consumption, cost, unloading, fine, ts } = values;
    const responseApi = await axios.get(`http://localhost:3007/pack?speed=${speed}&consumption=${consumption}&cost=${cost}&unloading=${unloading}&fine=${fine}&ts=${ts}`);
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
      const plan = resultServer.find(item => item.idVehicle === wvehicles[i]);
      console.log(plan.plan)
      let obj = JSON.parse(plan.plan);
      let stringifiedArray = '[' + obj.result + ']';
      let result = JSON.parse(stringifiedArray);
      dispatch(addW(plan.idVehicle, wroutes[i], result,
        { w: plan.vehicle.width, h: plan.vehicle.length, d: plan.vehicle.height, m: plan.vehicle.weight }));
    }

    for (let i = 0; i < svehicles.length; i++) {
      const plan = resultServer.find(item => item.idVehicle === svehicles[i]);
      let obj = JSON.parse(plan.plan);
      let stringifiedArray = '[' + obj.result + ']';
      let result = JSON.parse(stringifiedArray);
      dispatch(addS(plan.idVehicle, sroutes[i], result,
        { w: plan.vehicle.width, h: plan.vehicle.length, d: plan.vehicle.height, m: plan.vehicle.weight }));
    }

    dispatch(addP(wprice, sprice));
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
        ts: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleClick}
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