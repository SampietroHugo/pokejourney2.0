import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GAMES_CONFIG } from '../data/gamesConfig';
import type { UserSaveData } from '../types/game';
import './GamePage.css';

import TrainerCard from '../components/TrainerCard';
import PokemonTeam from '../components/PokemonTeam';

const GamePage: React.FC = () => {
    const { gameId } = useParams<{ gameId: string }>();

    const [userData, setUserData] = useState<UserSaveData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const activeGameId = gameId && GAMES_CONFIG[gameId] ? gameId : 'leaf-green';
    const staticConfig = GAMES_CONFIG[activeGameId];

    const getToken = () => {
        return localStorage.getItem('pj_token');
    };

    useEffect(() => {
        const loadOrCreateGame = async () => {
            const token = getToken();

            if (!token) {
                setError("You are not logged in.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                let response = await fetch(`http://localhost:4000/api/games/${activeGameId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.status === 404) {
                    console.log("Save not found. Creating new game automatically...");

                    response = await fetch(`http://localhost:4000/api/games/${activeGameId}`, {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                }

                if (!response.ok) {
                    throw new Error('Failed to load or create game.');
                }

                const data = await response.json();
                setUserData(data);

            } catch (err: any) {
                console.error(err);
                setError(err.message || 'Failed to load.');
            } finally {
                setLoading(false);
            }
        };

        loadOrCreateGame();
    }, [activeGameId]);

    const handleTrainerUpdate = async (field: string, value: any) => {
        const token = getToken();
        if (!token) return;

        try {
            setUserData(prev => prev ? ({
                ...prev,
                trainer: { ...prev.trainer, [field]: value }
            }) : null);

            await fetch(`http://localhost:4000/api/games/${activeGameId}/trainer`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ [field]: value })
            });
        } catch (error) {
            console.error("Error saving trainer data", error);
        }
    };

    if (loading) return <div className="text-white text-center mt-5">Loading from MySQL...</div>;
    if (error) return <div className="text-danger text-center mt-5">{error}</div>;
    if (!userData) return null;

    return (
        <div id="app-content" className="game-page-wrapper">
            <img
                className="game-title"
                src={staticConfig.logoSrc}
                alt={staticConfig.title}
            />

            {userData.trainer && (
                <TrainerCard
                    trainer={userData.trainer}
                    badges={staticConfig.badges}
                    onUpdate={handleTrainerUpdate}
                />
            )}

            <PokemonTeam team={userData.team} />
        </div>
    );
};

export default GamePage;