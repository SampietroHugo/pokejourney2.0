import React, { useState, useEffect } from 'react';

interface ImageEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newUrl: string) => void;
    currentUrl: string;
}

const ImageEditModal: React.FC<ImageEditModalProps> = ({ isOpen, onClose, onSave, currentUrl }) => {
    // Alterado aqui: inicia com uma string vazia ('') em vez de currentUrl
    const [url, setUrl] = useState('');

    // DICA EXTRA: Este useEffect garante que o campo limpe sempre que você reabrir o modal
    // (Caso o modal não seja desmontado pelo componente pai ao fechar)
    useEffect(() => {
        if (isOpen) {
            setUrl('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: '#2a3447',
                padding: '20px',
                borderRadius: '8px',
                border: '2px solid #f5d85b',
                width: '400px',
                color: 'white',
                display: 'flex', flexDirection: 'column', gap: '15px'
            }}>
                <h3 style={{ margin: 0, color: '#f5d85b', textAlign: 'center', fontFamily: '"Press Start 2P", monospace', fontSize: '12px' }}>
                    Trainer Image
                </h3>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px' }}>Image URL:</label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com/image.png"
                        style={{
                            width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #4a5b6e',
                            backgroundColor: '#1c212e', color: 'white', boxSizing: 'border-box' // Adicionei box-sizing pra evitar quebra de layout
                        }}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <button onClick={onClose} style={{
                        padding: '8px 15px', background: 'transparent', border: '1px solid #4a5b6e',
                        color: '#a8b3c9', borderRadius: '4px', cursor: 'pointer'
                    }}>
                        Cancel
                    </button>
                    <button onClick={() => { onSave(url); onClose(); }} style={{
                        padding: '8px 15px', background: '#f5d85b', border: 'none',
                        color: '#1c212e', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
                    }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageEditModal;