export interface ImageAsset {
    src: string;
    alt?: string;
    title?: string;
    altSprite?: string;
}

export interface Move {
    name: string;
    typeSrc: string;
    typeAlt: string;
}

export interface PokemonDetails {
    gender: string;
    ability: string;
    nature: string;
    captureDate: string;
}

export interface AltForm {
    icon: string;
    tooltip: string;
    altSprite: string;
}

export interface Pokemon {
    id?: string;
    name: string;
    spriteSrc: string;
    isShiny: boolean;
    item?: ImageAsset;
    details: PokemonDetails;
    types: ImageAsset[];
    moves: Move[];
    altForm?: AltForm | null;
    position?: number;
}

export interface Badge {
    id: string;
    title: string;
    alt: string;
    src: string;
}

export interface Trainer {
    id: string;
    inGameId: string;
    name: string;
    startDate: string;
    pokedexStatus: string;
    nationaldexStatus: string;
    finished?: string;
    imageSrc: string;
    imageAlt: string;
    badges: string[];
}

export interface Moment {
    id?: string;
    src: string;
    description: string;
    date: string;
}

export interface UserSaveData {
    id?: string;
    title: string;
    gameLogoSrc: string;
    trainer: Trainer;
    team: Pokemon[];
    moments?: Moment[];
}

export interface GameStaticConfig {
    title: string;
    logoSrc: string;
    badges: Badge[];
}