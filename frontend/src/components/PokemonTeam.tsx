import React from 'react';
import type { Pokemon } from '../types/game';

const PokemonCard: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
    return (
        <div className="pokemonCard">
            <div className="sprite-container">
                <img className="sprite" src={pokemon.spriteSrc} alt={pokemon.name} />

                {pokemon.isShiny && <span className="shiny-icon-emoji" title="Shiny">✨</span>}

                {pokemon.altForm && (
                    <div className="form-icon form-trigger"
                        style={{ backgroundImage: `url('${pokemon.altForm.icon}')` }}
                        title={pokemon.altForm.tooltip}
                    />
                )}

                {pokemon.item && (
                    <img src={pokemon.item.src} alt={pokemon.item.alt || 'Item'} className="item" />
                )}
            </div>

            <div className="info">
                <h4>{pokemon.name}</h4>

                <p>
                    <strong className="label">Type:</strong>
                    {pokemon.types.map((t, i) => (
                        <img key={i} src={t.src} alt={t.alt} className="type-icon" />
                    ))}
                </p>

                <p><span className="label">Nature:</span> <span className="value">{pokemon.details.nature}</span></p>
                <p><span className="label">Ability:</span> <span className="value">{pokemon.details.ability}</span></p>

                <div className="moves-list">
                    <ul>
                        {pokemon.moves.map((move, i) => (
                            <li key={i}>
                                <span>{move.name}</span>
                                <img src={move.typeSrc} alt={move.typeAlt} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const PokemonTeam: React.FC<{ team: Pokemon[] }> = ({ team }) => {
    return (
        <div className="main-team">
            <div className="title"><h3>Main Team</h3></div>
            <ol>
                {team.map((poke, index) => (
                    <li key={index}>
                        <PokemonCard pokemon={poke} />
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default PokemonTeam;