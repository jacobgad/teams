import type { Member, Team } from '@prisma/client';
import type { TeamOption } from 'utils/teams';

interface TeamWithMembers extends Team {
	members: Member[];
}

interface Props {
	team: TeamWithMembers;
	theme: TeamOption;
}

export default function TeamTable({ team, theme }: Props) {
	return (
		<div
			className={`w-full overflow-hidden rounded-lg shadow-xl transition ease-in-out hover:-translate-y-1 
			${theme.color.main}`}
		>
			<div
				className={`flex w-full items-center justify-between px-3 py-1 text-lg 
				${theme.color.dark}`}
			>
				<p>{theme.name}</p>
				<p>{team.members.length}</p>
			</div>
			<ul className={`w-full divide-y ${theme.color.divide}`}>
				{team.members.map((member) => (
					<li key={member.id} className={`w-full py-1 text-center`}>
						{member.name ? member.name : member.id}
					</li>
				))}
			</ul>
		</div>
	);
}
