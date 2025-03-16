import React, {useState} from "react";

interface SearchFormProps {
    initialQuery?: string;
    onSearch: (query: string) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({initialQuery = '', onSearch}) => {
    const [query, setQuery] = useState(initialQuery);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onSearch(query);
    };

    return (
        <form className="flex gap-4 w-full">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="What do you want to watch?"
                className="flex-1 px-5 py-4 text-base bg-black/50 border-none rounded
                   text-white placeholder-white/50 focus:outline-none focus:ring-2
                   focus:ring-red-600"
            />
            <button
                onClick={handleSubmit}
                className="px-12 py-4 bg-red-600 text-white font-bold rounded
                   hover:bg-red-700 transition-colors duration-200 uppercase"
            >
                SEARCH
            </button>
        </form>
    );
};
