const Button = ({ text, type='button', onClick }) => {
    return (
        <button 
                className="font-medium text-white px-6 py-1.5 m-2 rounded-md"
                style={{background: 'linear-gradient(0deg, rgba(94,9,213,1) 0%, rgba(135,30,199,1) 100%)'}}
                type={ type }
                onClick={ onClick }>
                        
        { text }
        </button>);
}

export default Button;