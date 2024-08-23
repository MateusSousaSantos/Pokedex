import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineCatchingPokemon } from "react-icons/md";
import "./App.css";
import PokemonModal from "./PokemonDetails";

type crie = {
  legacy: string,
  latest: string
}

type stat = {
  base_stat: number,
  effort: number,
  stat: {
    name: string,
    url: string
  }
}
export interface Pokemon {
  name: string;
  id: number;
  sprite: string;
  cries: crie;
  stats: stat[]
}

const PokemonCard: React.FC<Pokemon & { onClick: () => void }> = ({ name, id, sprite, onClick }) => {
  return (
    <div className="pokemon-card" onClick={onClick}>
      <MdOutlineCatchingPokemon />
      <img src={sprite} alt={name} />
      <div className="pokemon_name_div">
        <h2 className="pokemon_name">{`${name} #${id}`}</h2>
      </div>
    </div>
  );
};

const SearchBar: React.FC<{
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ onSearch }) => {
  return (
    <div className="search_bar">
      <input type="text" placeholder="Search Pokémon..." onChange={onSearch} />
      <div className="search_button_div">
        <MdOutlineCatchingPokemon
          size={40}
          className="search_button"
        />
      </div>
      <h4>Pesquisar</h4>
    </div>
  );
};

const Pokedex: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const handleOpenModal = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    const cry = new Audio(pokemon.cries.latest)
    cry.volume = 0.07;
    cry.play();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery) || pokemon.id.toString() == searchQuery
  );
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const promises = [];
        for (let i = 1; i <= 1000; i++) {
          promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
        }
        const responses = await Promise.all(promises);
        const fetchedPokemons = responses.map((response) => {
          const data = response.data;
          return {
            name: data.name,
            id: data.id,
            sprite: data.sprites.front_default,
            cries: data.cries,
            stats: data.stats
          };
        });
        setPokemons(fetchedPokemons);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <main>
      <SearchBar onSearch={handleSearch} />
      <div>
        {pokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              name={pokemon.name}
              id={pokemon.id}
              sprite={pokemon.sprite}
              cries={pokemon.cries}
              stats={pokemon.stats}
              onClick={() => handleOpenModal(pokemon)}             />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {selectedPokemon && (
        <PokemonModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          pokemon={selectedPokemon}
        />
      )}
    </main>
  );
};

export default Pokedex;
