import { useEffect, useRef } from "react";
import "./Dashboard.css";

export default function Dashboard() {
    const carouselTrackRef = useRef<HTMLDivElement | null>(null);
    const carouselRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const track = carouselTrackRef.current;
        const carousel = carouselRef.current;

        if (!track || !carousel) return;

        const prev = carousel.querySelector(".prev") as HTMLButtonElement;
        const next = carousel.querySelector(".next") as HTMLButtonElement;
        const SCROLL_SPEED = 1;
        const MANUAL_DELAY = 450;

        let isPaused = false;
        let raf: number | null = null;

        const cards = Array.from(track.children) as HTMLElement[];
        const clones = 5;
        const itemWidth = cards[0].offsetWidth + 15;

        let total = 0;

        const setup = () => {
            cards.slice(0, clones).forEach(item =>
                track.appendChild(item.cloneNode(true) as HTMLElement)
            );
            cards.slice(-clones).reverse().forEach(item =>
                track.prepend(item.cloneNode(true) as HTMLElement)
            );

            total = track.children.length;

            track.style.scrollBehavior = "auto";
            track.scrollLeft = clones * itemWidth;
        };

        const loop = () => {
            if (!isPaused) {
                track.style.scrollBehavior = "auto";
                track.scrollLeft += SCROLL_SPEED;

                const max = (total - clones - 1) * itemWidth;
                const min = clones * itemWidth;

                if (track.scrollLeft >= max) {
                    track.scrollLeft = min + 1;
                }
            }
            raf = requestAnimationFrame(loop);
        };

        const start = () => {
            isPaused = false;
        };

        const stop = () => {
            isPaused = true;
        };

        const manual = (dir: number) => {
            stop();
            track.style.scrollBehavior = "smooth";
            track.scrollLeft += dir * itemWidth;

            setTimeout(() => {
                track.style.scrollBehavior = "auto";

                const max = (total - clones) * itemWidth;
                const min = clones * itemWidth;
                const pos = track.scrollLeft;

                if (pos >= max) track.scrollLeft = min;
                if (pos <= min) track.scrollLeft = max - itemWidth;

                start();
            }, MANUAL_DELAY);
        };

        setup();

        prev.onclick = () => manual(-1);
        next.onclick = () => manual(+1);

        carousel.addEventListener("mouseenter", stop);
        carousel.addEventListener("mouseleave", start);

        raf = requestAnimationFrame(loop);

        return () => {
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div className="games">
            <h2>Most Played</h2>

            <div className="game-carousel" ref={carouselRef}>
                <button className="carousel-btn prev">❮</button>

                <div className="carousel-track" ref={carouselTrackRef}>
                    <a className="carousel-item-card">
                        <img src="/img/game-box/emerald.avif" />
                        <span>Emerald</span>
                    </a>

                    <a className="carousel-item-card">
                        <img src="/img/game-box/fire-red.avif" />
                        <span>Fire Red</span>
                    </a>

                    <a className="carousel-item-card">
                        <img src="/img/game-box/platinum.avif" />
                        <span>Platinum</span>
                    </a>

                    <a className="carousel-item-card">
                        <img src="/img/game-box/heart-gold.avif" />
                        <span>Heart Gold</span>
                    </a>

                    <a className="carousel-item-card">
                        <img src="/img/game-box/x.avif" />
                        <span>X</span>
                    </a>
                </div>

                <button className="carousel-btn next">❯</button>

                <div className="carousel-fade fade-left" />
                <div className="carousel-fade fade-right" />
            </div>
        </div>
    );
}
