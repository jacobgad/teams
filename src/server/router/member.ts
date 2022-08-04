import { createRouter } from './context';
import { z } from 'zod';
import { Member, Team } from '@prisma/client';
import { TRPCError } from '@trpc/server';

export const memebrRouter = createRouter().query('joinGame', {
	input: z.object({
		memberId: z.string().uuid().nullable(),
		gameId: z.string().cuid(),
	}),
	async resolve({ ctx, input }): Promise<{ team: Team; memberId: Member['id'] }> {
		async function getMember(id: Member['id'] | null): Promise<Member> {
			if (!id) return ctx.prisma.member.create({ data: {} });
			const found = await ctx.prisma.member.findUnique({ where: { id } });
			if (found) return found;
			return ctx.prisma.member.create({ data: {} });
		}
		const member = await getMember(input.memberId);

		const game = await ctx.prisma.game.findUnique({
			where: { id: input.gameId },
			include: { Teams: { include: { members: true } } },
		});
		if (!game) throw new TRPCError({ code: 'NOT_FOUND', message: 'Game not found' });

		const team = game.Teams.find((t) => t.members.find((m) => m.id === member.id));
		if (team) return { team, memberId: member.id };

		if (game.Teams.length < game.teamCount) {
			const team = await ctx.prisma.team.create({
				data: {
					gameId: input.gameId,
					members: { connect: { id: member.id } },
				},
			});
			return { team, memberId: member.id };
		}

		const smallestTeam = game.Teams.reduce((prev, curr) =>
			curr.members.length < prev.members.length ? curr : prev
		);
		const updatedTeam = await ctx.prisma.team.update({
			where: { id: smallestTeam.id },
			data: { members: { connect: { id: member.id } } },
		});
		return { team: updatedTeam, memberId: member.id };
	},
});
