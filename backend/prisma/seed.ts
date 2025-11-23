import { PrismaClient } from '@prisma/client';
import leafGreenData from './data/leaf-green.json' with { type: "json" };

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    const user = await prisma.user.upsert({
        where: { email: 'ash@ketchum.com' },
        update: {},
        create: {
            email: 'ash@ketchum.com',
            name: 'Ash Ketchum',
            password: 'hashed-secure-password',
        },
    });

    console.log(`👤 User verified: ${user.name} (ID: ${user.id})`);

    const gameSlug = 'leaf-green';

    const existingSave = await prisma.gameSave.findFirst({
        where: {
            userId: user.id,
            slug: gameSlug
        }
    });

    if (!existingSave) {
        console.log(`🎮 Creating save file for ${leafGreenData.title}...`);

        await prisma.gameSave.create({
            data: {
                slug: gameSlug,
                title: leafGreenData.title,
                gameLogoSrc: leafGreenData.gameLogoSrc,
                userId: user.id,

                trainer: {
                    create: {
                        inGameId: "None",
                        name: "None",
                        startDate: "None",
                        pokedexStatus: "None",
                        nationaldexStatus: "None",
                        finished: "None",

                        imageSrc: leafGreenData.trainer.imageSrc,
                        imageAlt: leafGreenData.trainer.imageAlt,
                    }
                },

                team: {
                    create: leafGreenData.team.map((poke, index) => ({
                        name: poke.name,
                        spriteSrc: poke.spriteSrc,
                        isShiny: poke.isShiny,
                        position: index,

                        item: (poke.item || {}) as any,
                        details: poke.details as any,
                        types: poke.types as any,
                        moves: poke.moves as any,
                        altForm: poke.altForm as any
                    }))
                },

                moments: {
                    create: leafGreenData.moments.map(moment => ({
                        src: moment.src,
                        description: moment.description,
                        date: moment.date
                    }))
                }
            }
        });

        console.log('✅ Save "Leaf Green" created successfully!');
    } else {
        console.log('⚠️ Save "Leaf Green" already exists. Skipping creation.');
    }
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });