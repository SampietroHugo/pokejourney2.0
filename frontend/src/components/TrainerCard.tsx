import React, { useState, useEffect } from 'react';
import type { Trainer, Badge } from '../types/game';
import ImageEditModal from './ImageEditModal';
interface TrainerCardProps {
    trainer: Trainer;
    badges: Badge[];
    onUpdate?: (field: string, value: any) => void;
}

const EditableField = ({ label, value, fieldKey, onSave }: any) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    useEffect(() => { setTempValue(value); }, [value]);

    const handleBlur = () => {
        setIsEditing(false);
        if (tempValue !== value) onSave(fieldKey, tempValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleBlur();
    };

    return (
        <p>
            <span className="label">{label}:</span>
            {isEditing ? (
                <input
                    autoFocus
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    style={{ background: 'transparent', color: 'white', border: 'none', borderBottom: '1px solid #f5d85b', fontFamily: 'inherit', fontSize: 'inherit', marginLeft: '8px', width: '150px', outline: 'none' }}
                />
            ) : (
                <span className="value" onClick={() => setIsEditing(true)} style={{ cursor: 'pointer', textDecoration: 'underline dotted #555' }}>{value || "None"}</span>
            )}
        </p>
    );
};

const TrainerCard: React.FC<TrainerCardProps> = ({ trainer, badges, onUpdate }) => {

    const earnedBadges = Array.isArray(trainer.badges) ? trainer.badges : [];
    const [isEditingId, setIsEditingId] = useState(false);
    const [tempId, setTempId] = useState(trainer.inGameId);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHoveringImage, setIsHoveringImage] = useState(false);

    useEffect(() => { setTempId(trainer.inGameId); }, [trainer.inGameId]);

    const handleSave = (field: string, value: any) => {
        if (onUpdate) onUpdate(field, value);
    };

    const toggleBadge = (badgeId: string) => {
        let newBadges;
        if (earnedBadges.includes(badgeId)) {
            newBadges = earnedBadges.filter(id => id !== badgeId);
        } else {
            newBadges = [...earnedBadges, badgeId];
        }
        handleSave('badges', newBadges);
    };

    return (
        <div className="trainerCard">
            <div className="trainerHeader">
                <h2>Trainer Card</h2>
                {isEditingId ? (
                    <input
                        autoFocus value={tempId} onChange={(e) => setTempId(e.target.value)}
                        onBlur={() => { setIsEditingId(false); handleSave('inGameId', tempId) }}
                        onKeyDown={(e) => e.key === 'Enter' && handleSave('inGameId', tempId)}
                        style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #2b2b2b', color: '#2b2b2b', fontSize: '10px', width: '50px', outline: 'none', fontFamily: '"Press Start 2P", monospace' }}
                    />
                ) : (
                    <span onClick={() => setIsEditingId(true)} style={{ cursor: 'pointer', textDecoration: 'underline dotted #2b2b2b' }} title="Click to edit ID">
                        IDNo. {trainer.inGameId}
                    </span>
                )}
            </div>

            <div className="trainerDisplay">
                <div className="trainer-text-info">
                    <EditableField label="Name" value={trainer.name} fieldKey="name" onSave={handleSave} />
                    <EditableField label="Start" value={trainer.startDate} fieldKey="startDate" onSave={handleSave} />
                    <EditableField label="Pokédex" value={trainer.pokedexStatus} fieldKey="pokedexStatus" onSave={handleSave} />
                    <EditableField label="National" value={trainer.nationaldexStatus} fieldKey="nationaldexStatus" onSave={handleSave} />
                    <EditableField label="Finished" value={trainer.finished} fieldKey="finished" onSave={handleSave} />
                </div>

                <div
                    style={{ position: 'relative', cursor: 'pointer' }}
                    onClick={() => setIsModalOpen(true)}
                    onMouseEnter={() => setIsHoveringImage(true)}
                    onMouseLeave={() => setIsHoveringImage(false)}
                    title="Click to change image"
                >
                    <img
                        src={trainer.imageSrc}
                        alt={trainer.imageAlt}
                        style={{
                            transition: 'opacity 0.2s',
                            opacity: isHoveringImage ? '0.8' : '1'
                        }}
                    />

                    <div style={{
                        position: 'absolute', bottom: '5px', right: '5px',
                        background: 'rgba(0,0,0,0.6)', padding: '2px 5px', borderRadius: '4px',
                        fontSize: '8px', color: '#fff', pointerEvents: 'none',
                        opacity: isHoveringImage ? 1 : 0,
                        transition: 'opacity 0.2s'
                    }}>
                        EDIT
                    </div>
                </div>
            </div>

            <div className="trainer-info">
                <h3 className="badge-title">Badges</h3>
                <div className="badges">
                    {badges.map((badge) => {
                        const isObtained = earnedBadges.includes(badge.id);
                        return (
                            <img
                                key={badge.id}
                                src={badge.src}
                                alt={badge.alt}
                                title={isObtained ? badge.title : `${badge.title} (Not Obtained)`}
                                onClick={() => toggleBadge(badge.id)}
                                style={{
                                    cursor: 'pointer',
                                    filter: isObtained ? 'none' : 'brightness(0) opacity(0.5)',
                                    transform: isObtained ? 'scale(1)' : 'scale(0.9)',
                                    transition: 'all 0.2s ease'
                                }}
                            />
                        );
                    })}
                </div>
            </div>

            <ImageEditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentUrl={trainer.imageSrc}
                onSave={(newUrl) => handleSave('imageSrc', newUrl)}
            />

        </div>
    );
};

export default TrainerCard;