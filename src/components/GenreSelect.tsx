import React from "react";

interface GenreSelectProps {
    genres: string[];
    selectedGenre: string;
    onSelect: (genre: string) => void;
}

export const GenreSelect: React.FC<GenreSelectProps> = ({genres = [], selectedGenre, onSelect}) => {
    const handleSelect = (genre: string) => {
        onSelect(genre);
    }

    return (
        <nav className="flex gap-8">
            {genres.map((genre) => (
                <button
                    key={genre}
                    onClick={() => handleSelect(genre)}
                    className={`
            text-white text-xl uppercase py-4 px-2 relative
            hover:after:bg-red-600 hover:after:absolute hover:after:h-1 hover:after:w-full hover:after:bottom-0 hover:after:left-0
            ${
                        selectedGenre === genre
                            ? 'after:bg-red-600 after:absolute after:h-1 after:w-full after:bottom-0 after:left-0 font-bold'
                            : 'font-normal opacity-70 hover:opacity-100'
                    }
          `}
                >
                    {genre}
                </button>
            ))}
        </nav>
    );
};