import React from "react";
import { Link } from "react-router-dom";
import "./Official.css";

type Game = {
    title: string;
    img: string;
    link: string;
};

type ConsoleGroup = {
    name: string;
    games: Game[];
};

const consolesData: ConsoleGroup[] = [
    {
        name: "Game Boy",
        games: [
            { title: "Red", img: "/img/game-box/red.avif", link: "/game/red" },
            { title: "Blue", img: "/img/game-box/blue.avif", link: "/game/blue" },
            { title: "Yellow", img: "/img/game-box/yellow.avif", link: "/game/yellow" },
        ]
    },
    {
        name: "Game Boy Color",
        games: [
            { title: "Gold", img: "/img/game-box/gold.avif", link: "/game/gold" },
            { title: "Silver", img: "/img/game-box/silver.avif", link: "/game/silver" },
            { title: "Crystal", img: "/img/game-box/crystal.avif", link: "/game/crystal" },
        ]
    },
    {
        name: "Game Boy Advance",
        games: [
            { title: "Ruby", img: "/img/game-box/ruby.avif", link: "/game/ruby" },
            { title: "Sapphire", img: "/img/game-box/sapphire.avif", link: "/game/sapphire" },
            { title: "Fire Red", img: "/img/game-box/fire-red.avif", link: "/game/fire-red" },
            { title: "Leaf Green", img: "/img/game-box/leaf-green.avif", link: "/game/leaf-green" },
            { title: "Emerald", img: "/img/game-box/emerald.avif", link: "/game/emerald" },
        ]
    },
    {
        name: "Nintendo DS",
        games: [
            { title: "Diamond", img: "/img/game-box/diamond.avif", link: "/game/diamond" },
            { title: "Pearl", img: "/img/game-box/pearl.avif", link: "/game/pearl" },
            { title: "Platinum", img: "/img/game-box/platinum.avif", link: "/game/platinum" },
            { title: "Heart Gold", img: "/img/game-box/heart-gold.avif", link: "/game/heart-gold" },
            { title: "Soul Silver", img: "/img/game-box/soul-silver.avif", link: "/game/soul-silver" },
            { title: "Black", img: "/img/game-box/black.avif", link: "/game/black" },
            { title: "White", img: "/img/game-box/white.avif", link: "/game/white" },
            { title: "Black 2", img: "/img/game-box/black-2.avif", link: "/game/black-2" },
            { title: "White 2", img: "/img/game-box/white-2.avif", link: "/game/white-2" },
        ]
    },
    {
        name: "Nintendo 3DS",
        games: [
            { title: "X", img: "/img/game-box/x.avif", link: "/game/x" },
            { title: "Y", img: "/img/game-box/y.avif", link: "/game/y" },
            { title: "Omega Ruby", img: "/img/game-box/omega-ruby.avif", link: "/game/omega-ruby" },
            { title: "Alpha Sapphire", img: "/img/game-box/alpha-sapphire.avif", link: "/game/alpha-sapphire" },
            { title: "Sun", img: "/img/game-box/sun.avif", link: "/game/sun" },
            { title: "Moon", img: "/img/game-box/moon.avif", link: "/game/moon" },
            { title: "Ultra Sun", img: "/img/game-box/ultra-sun.avif", link: "/game/ultra-sun" },
            { title: "Ultra Moon", img: "/img/game-box/ultra-moon.avif", link: "/game/ultra-moon" },
        ]
    },
    {
        name: "Nintendo Switch",
        games: [
            { title: "Let's Go Pikachu", img: "/img/game-box/lets-go-pikachu.avif", link: "/game/lets-go-pikachu" },
            { title: "Let's Go Eevee", img: "/img/game-box/lets-go-eevee.avif", link: "/game/lets-go-eevee" },
            { title: "Sword", img: "/img/game-box/sword.avif", link: "/game/sword" },
            { title: "Shield", img: "/img/game-box/shield.avif", link: "/game/shield" },
            { title: "Brilliant Diamond", img: "/img/game-box/brilliant-diamond.avif", link: "/game/brilliant-diamond" },
            { title: "Shining Pearl", img: "/img/game-box/shining-pearl.avif", link: "/game/shining-pearl" },
            { title: "Legends Arceus", img: "/img/game-box/legends-arceus.avif", link: "/game/legends-arceus" },
            { title: "Violet", img: "/img/game-box/violet.avif", link: "/game/violet" },
            { title: "Scarlet", img: "/img/game-box/scarlet.avif", link: "/game/scarlet" },
        ]
    }
];

export default function Official() {
    return (
        <main className="games-list-page">
            <div className="header-container">
                <h1>Official Games</h1>
            </div>

            {consolesData.map((consoleGroup) => (
                <section key={consoleGroup.name} className="console-group">
                    <h2 className="console-title">{consoleGroup.name}</h2>

                    <div className="horizontal-scroll-wrapper">
                        <div className="games-container">
                            {consoleGroup.games.map((game, index) => (
                                <div key={index} className="game-card-wrapper">
                                    <Link to={game.link} className="game-card">
                                        <img
                                            src={game.img}
                                            alt={`Cover of ${game.title}`}
                                        />
                                        <div className="game-card-title">{game.title}</div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}
        </main>
    );
}