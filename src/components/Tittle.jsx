const Tittle = ({ text, description }) => {
    return (
        <div className="mx-2 mb-4">
            <h2 className="text-xl font-medium my-1">{ text }</h2>
            <p className=" text-sm font-normal text-gray-500">{ description }</p>
        </div>
    );
}
  
export default Tittle;