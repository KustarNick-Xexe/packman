const Tittle = ({ text, description }) => {
    return (
        <div className="mx-2 mb-4">
            <h2 className="font-semibold whitespace-nowrap text-xl my-1">{ text }</h2>
            <p className=" text-sm font-medium text-gray-400">{ description }</p>
        </div>
    );
}
  
export default Tittle;