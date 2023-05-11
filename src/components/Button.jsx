const Button = ({ text, type='button' }) => {
    return <button 
                className="font-normal text-slate-50 px-6 py-1.5 m-2 bg-green-500 rounded"
                type={ type }>
        { text }
        </button>;
}

export default Button;