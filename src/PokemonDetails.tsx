import React from "react";
import "./PokemonDetails.css";
import { FaRegWindowClose } from "react-icons/fa";
import { Pokemon } from "./App";

interface PokemonModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemon: Pokemon;
}

const PokemonModal: React.FC<PokemonModalProps> = ({
  isOpen,
  onClose,
  pokemon,
}) => {
  if (!isOpen) return null;

  const stats = [
    { name: "HP", value: pokemon.stats[0].base_stat },
    { name: "Attack", value: pokemon.stats[1].base_stat },
    { name: "Defense", value: pokemon.stats[2].base_stat },
    { name: "Special Attack", value: pokemon.stats[3].base_stat },
    { name: "Special Defense", value: pokemon.stats[4].base_stat },
    { name: "Speed", value: pokemon.stats[5].base_stat },
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="title_div">
          <h2>
            {pokemon.name} #{pokemon.id}
          </h2>
          <button className="close-button" onClick={onClose}>
            <FaRegWindowClose />
          </button>
        </div>
        <div className="image_div">
          <img src={pokemon.sprite} alt={pokemon.name} />
        </div>
        <div className="details_div">
          {stats.map((stat) => (
            <div key={stat.name} className="stat">
              <span className="stat-name">{stat.name}</span>
              <div className="stat-bar">
                <div
                  className="stat-bar-fill"
                  style={{ width: `${(stat.value / 256) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
