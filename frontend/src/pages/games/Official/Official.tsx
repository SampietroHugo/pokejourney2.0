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
            { title: "Red", img: "/img/game-box/red.avif", link: "#" },
            { title: "Blue", img: "/img/game-box/blue.avif", link: "#" },
            { title: "Yellow", img: "/img/game-box/yellow.avif", link: "#" },
        ]
    },
    {
        name: "Game Boy Color",
        games: [
            { title: "Gold", img: "/img/game-box/gold.avif", link: "#" },
            { title: "Silver", img: "/img/game-box/silver.avif", link: "#" },
            { title: "Crystal", img: "/img/game-box/crystal.avif", link: "#" },
        ]
    },
    {
        name: "Game Boy Advance",
        games: [
            { title: "Ruby", img: "/img/game-box/ruby.avif", link: "/games/official/ruby" },
            { title: "Sapphire", img: "/img/game-box/sapphire.avif", link: "/games/official/sapphire" },
            { title: "Fire Red", img: "/img/game-box/fire-red.avif", link: "/games/official/fire-red" },
            { title: "Leaf Green", img: "/img/game-box/leaf-green.avif", link: "/games/official/leaf-green" },
            { title: "Emerald", img: "/img/game-box/emerald.avif", link: "/games/official/emerald" },
        ]
    },
    {
        name: "Nintendo DS",
        games: [
            { title: "Diamond", img: "/img/game-box/diamond.avif", link: "#" },
            { title: "Pearl", img: "/img/game-box/pearl.avif", link: "#" },
            { title: "Platinum", img: "/img/game-box/platinum.avif", link: "#" },
            { title: "Heart Gold", img: "/img/game-box/heart-gold.avif", link: "#" },
            { title: "Soul Silver", img: "/img/game-box/soul-silver.avif", link: "#" },
            { title: "Black", img: "/img/game-box/black.avif", link: "#" },
            { title: "White", img: "/img/game-box/white.avif", link: "#" },
            { title: "Black 2", img: "/img/game-box/black-2.avif", link: "#" },
            { title: "White 2", img: "/img/game-box/white-2.avif", link: "#" },
        ]
    },
    {
        name: "Nintendo 3DS",
        games: [
            { title: "X", img: "/img/game-box/x.avif", link: "#" },
            { title: "Y", img: "/img/game-box/y.avif", link: "#" },
            { title: "Omega Ruby", img: "/img/game-box/omega-ruby.avif", link: "#" },
            { title: "Alpha Sapphire", img: "/img/game-box/alpha-sapphire.avif", link: "#" },
            { title: "Sun", img: "/img/game-box/sun.avif", link: "#" },
            { title: "Moon", img: "/img/game-box/moon.avif", link: "#" },
            { title: "Ultra Sun", img: "/img/game-box/ultra-sun.avif", link: "#" },
            { title: "Ultra Moon", img: "/img/game-box/ultra-moon.avif", link: "#" },
        ]
    },
    {
        name: "Nintendo Switch",
        games: [
            { title: "Let's Go Pikachu", img: "/img/game-box/lets-go-pikachu.avif", link: "#" },
            { title: "Let's Go Eevee", img: "/img/game-box/lets-go-eevee.avif", link: "#" },
            { title: "Sword", img: "/img/game-box/sword.avif", link: "#" },
            { title: "Shield", img: "/img/game-box/shield.avif", link: "#" },
            { title: "Brilliant Diamond", img: "/img/game-box/brilliant-diamond.avif", link: "#" },
            { title: "Shining Pearl", img: "/img/game-box/shining-pearl.avif", link: "#" },
            { title: "Legends Arceus", img: "/img/game-box/legends-arceus.avif", link: "#" },
            { title: "Violet", img: "/img/game-box/violet.avif", link: "#" },
            { title: "Scarlet", img: "/img/game-box/scarlet.avif", link: "#" },
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