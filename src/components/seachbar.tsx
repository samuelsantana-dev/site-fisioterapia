const SearchInput = ({ label, placeholder, onChange, value }: any) => {
  return (
    <div>
      <label className="m-2 flex justify-between items-stretch flex-col md:flex-row">
        {label && <span className="flex items-center block font-bold mb-2">{label}</span>}
        <div className="relative flex items-center w-1/2">
          <input
            type="text"
            className="flex-grow px-2 py-1 rounded border shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 text-sm"
            value={value}
            onChange={onChange}
            placeholder={placeholder || 'Pesquisar'}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 text-gray-400 ml-2 pointer-events-none"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </label>
    </div>
  );
};

export default SearchInput;
