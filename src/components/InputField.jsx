import { Field, useField } from 'formik';

const InputField = ({ label = 'Поле', name = 'поле', placeholder = 'Некий текст', errors }) => {
    const [field, meta] = useField(name);
    return (
        <div className="mb-4 mx-2">
            <label 
                className="font-medium block mb-1 text-sm"
                htmlFor={ name }>{ label }</label>
            <Field
                className={" font-medium px-4 py-2 text-sm text-gray-950 border-2 border-solid border-zinc-300 rounded-md placeholder:text-sm placeholder:text-zinc-300 focus:outline-none focus:border-2 focus:border-solid focus:border-violet-600" }
                type="text" 
                name={ name } 
                placeholder={ placeholder }
            />
            {meta.touched && errors && errors[name] && <p className="ml-2 font-medium text-sm text-red-600">{errors[name]}</p>}
        </div>
    )
}

export default InputField;