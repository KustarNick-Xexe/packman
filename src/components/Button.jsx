const Button = ({ text, type='button' }) => {
    return (
        <button 
                className="font-medium text-white px-6 py-1.5 m-2 bg-indigo-500 rounded-md"
                type={ type }>
        { text }
        </button>);
}

export default Button;