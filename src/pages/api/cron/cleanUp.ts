import { Duration, sub } from 'date-fns';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db/client';

const cleanUp = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'DELETE') {
		const duration: Duration = { months: 3 };

		const deleteTeams = prisma.team.deleteMany({
			where: {
				game: {
					updatedAt: {
						lt: sub(new Date(Date.now()), duration),
					},
				},
			},
		});

		const deleteGames = prisma.game.deleteMany({
			where: {
				updatedAt: {
					lt: sub(new Date(Date.now()), duration),
				},
			},
		});

		const deleteMembers = prisma.member.deleteMany({
			where: {
				teams: {
					every: {
						game: {
							createdAt: {
								lt: sub(new Date(Date.now()), duration),
							},
						},
					},
				},
			},
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
