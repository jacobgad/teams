import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db/client';
import { sub } from 'date-fns';

const cleanUp = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'DELETE') {
		const date = sub(new Date(Date.now()), { months: 3 });

		const deleteTeams = prisma.team.deleteMany({
			where: { game: { updatedAt: { lt: date } } },
		});

		const deleteGames = prisma.game.deleteMany({
			where: { updatedAt: { lt: date } },
		});

		const deleteMembers = prisma.member.deleteMany({
			where: { teams: { every: { game: { createdAt: { lt: date } } } } },
		});

		try {
			const [teams, members, games] = await prisma.$transaction([
				deleteTeams,
				deleteMembers,
				deleteGames,
			]);
			res.status(200).json({ teams, members, games });
		} catch (error) {
			res.status(400).send(error);
		}
	}
};

export default cleanUp;
