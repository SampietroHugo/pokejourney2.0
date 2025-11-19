import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

type Game = {
    id: string;
    title: string;
    img: string;
    slug: string;
};

const GAMES: Game[] = [
    { id: "ruby", title: "Ruby", img: "/img/game-box/ruby.avif", slug: "ruby" },
    { id: "sapphire", title: "Sapphire", img: "/img/game-box/sapphire.avif", slug: "sapphire" },
    { id: "firered", title: "Fire Red", img: "/img/game-box/fire-red.avif", slug: "firered" },
    { id: "leafgreen", title: "Leaf Green", img: "/img/game-box/leaf-green.avif", slug: "leafgreen" },
    { id: "emerald", title: "Emerald", img: "/img/game-box/emerald.avif", slug: "emerald" },
];

export default function Dashboard() {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const animationRef = useRef<number | null>(null);
    const isPausedRef = useRef<boolean>(false);
    const itemWidthRef = useRef<number>(0);
    const numClones = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const children = Array.from(track.children).filter(c => !c.classList.contains("original"));
        if (children.length > 0) {
        }

        Array.from(track.children).forEach((ch, idx) => {
            ch.classList.add("original");
            (ch as HTMLElement).style.minWidth = "";
        });

        const itemCards = Array.from(track.querySelectorAll(".carousel-item-card"));
        if (itemCards.length === 0) return;

        const first = itemCards[0] as HTMLElement;
        itemWidthRef.current = first.offsetWidth + 15;

        const clones = track.querySelectorAll(".clone");
        clones.forEach(c => c.remove());

        itemCards.slice(0, numClones).forEach(item => {
            const clone = item.cloneNode(true) as HTMLElement;
            clone.classList.add("clone");
            track.appendChild(clone);
        });

        itemCards.slice(-numClones).reverse().forEach(item => {
            const clone = item.cloneNode(true) as HTMLElement;
            clone.classList.add("clone");
            track.prepend(clone);
        });

        const total = track.children.length;
        const initialScroll = numClones * itemWidthRef.current;
        track.style.scrollBehavior = "auto";
        track.scrollLeft = initialScroll;

        return () => {
            const existingClones = track.querySelectorAll(".clone");
            existingClones.forEach(c => c.remove());
        };
    }, []);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const SCROLL_SPEED = 0.5;

        const autoScroll = () => {
            if (isPausedRef.current) return;
            track.style.scrollBehavior = "auto";
            track.scrollLeft += SCROLL_SPEED;

            const totalItems = track.children.length;
            const loopEndPoint = numClones * itemWidthRef.current;

            if (track.scrollLeft >= (totalItems - numClones) * itemWidthRef.current) {
                track.scrollLeft = loopEndPoint;
            }
            animationRef.current = requestAnimationFrame(autoScroll);
        };

        animationRef.current = requestAnimationFrame(autoScroll);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    const handlePrev = () => {
        const track = trackRef.current;
        if (!track) return;
        stopAutoplay();
        track.style.scrollBehavior = "smooth";
        track.scrollLeft -= itemWidthRef.current;
        setTimeout(() => {
            normalizePosition(track);
            startAutoplay();
        }, 500);
    };

    const handleNext = () => {
        const track = trackRef.current;
        if (!track) return;
        stopAutoplay();
        track.style.scrollBehavior = "smooth";
        track.scrollLeft += itemWidthRef.current;
        setTimeout(() => {
            normalizePosition(track);
            startAutoplay();
        }, 500);
    };

    const normalizePosition = (track: HTMLDivElement) => {
        const totalItems = track.children.length;
        const loopStartPoint = (totalItems - numClones) * itemWidthRef.current;
        const loopEndPoint = numClones * itemWidthRef.current;
        const currentPos = track.scrollLeft;

        if (currentPos >= loopStartPoint - itemWidthRef.current / 2) {
            track.scrollLeft = loopEndPoint;
        } else if (currentPos <= loopEndPoint - itemWidthRef.current / 2) {
            track.scrollLeft = (totalItems - numClones * 2) * itemWidthRef.current;
        }
    };

    const stopAutoplay = () => {
        isPausedRef.current = true;
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
    };

    const startAutoplay = () => {
        if (!isPausedRef.current) return;
        isPausedRef.current = false;
        animationRef.current = requestAnimationFrame(() => {
            const track = trackRef.current;
            if (!track) return;

            track.scrollLeft += 0;
        });
    };

    const onMouseEnter = () => stopAutoplay();
    const onMouseLeave = () => {
        isPausedRef.current = false;
        if (!animationRef.current) {
            animationRef.current = requestAnimationFrame(function loop() {
                const track = trackRef.current;
                if (!track || isPausedRef.current) return;
                track.style.scrollBehavior = "auto";
                track.scrollLeft += 0.5;
                const totalItems = track.children.length;
                const loopEndPoint = numClones * itemWidthRef.current;
                if (track.scrollLeft >= (totalItems - numClones) * itemWidthRef.current) {
                    track.scrollLeft = loopEndPoint;
                }
                animationRef.current = requestAnimationFrame(loop);
            });
        }
    };

    const handleSelectGame = (slug: string) => {
        navigate(`/game/${slug}`);
    };

    return (
        <main className="games container" ref={containerRef}>
            <h2>Main Games</h2>

            <div
                className="game-carousel"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <button type="button" className="carousel-btn prev" aria-label="Previous" onClick={handlePrev}>◄</button>

                <div className="carousel-fade fade-left" />

                <div className="carousel-track" ref={trackRef}>
                    {GAMES.map(g => (
                        <div
                            key={g.id}
                            className="carousel-item-card"
                            onClick={() => handleSelectGame(g.slug)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => { if (e.key === "Enter") handleSelectGame(g.slug); }}
                        >
                            <img src={g.img} alt={g.title} />
                            <span>{g.title}</span>
                        </div>
                    ))}
                </div>

                <div className="carousel-fade fade-right" />
                <button type="button" className="carousel-btn next" aria-label="Next" onClick={handleNext}>►</button>
            </div>
        </main>
    );
}
