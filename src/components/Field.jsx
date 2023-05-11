const Field = ({ label='Поле', name='поле', placeholder='Некий текст' }) => {
    return (
        <div className="mb-4 mx-2">
            <label 
                className="block mb-1 "
                htmlFor={ name }>{ label }</label>
            <input
                className="px-2 py-1 text-gray-950 border-2 border-solid border-zinc-300 rounded placeholder:text-zinc-300 focus:outline-none focus:border-2 focus:border-solid focus:border-green-400" 
                type="text" 
                name={ name } 
                placeholder={ placeholder }
            />
        </div>
    )
}

export default Field;