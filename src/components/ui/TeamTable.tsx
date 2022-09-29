import { Member, Team } from '@prisma/client';
import { TeamOption, teamOptions } from 'utils/teams';

interface TeamWithMembers extends Team {
	members: Member[];
}

interface Props {
	team: TeamWithMembers;
	theme?: TeamOption;
}

export default function TeamTable({ team, theme }: Props) {
	const options = theme ? theme : teamOptions[team.id % teamOptions.length];

	return (
		<div
			className={`w-full overflow-hidden rounded-lg shadow-xl transition ease-in-out hover:-translate-y-1 
			${options?.color.main}`}
		>
			<div
				className={`flex w-full items-center justify-between px-3 py-1 text-lg 
				${options?.color.dark}`}
			>
				<p>{options?.name}</p>
				<p>{team.members.length}</p>
			</div>
			<ul className='w-full'>
				{team.members.map((member, i) => (
					<>
						{i !== 0 && <hr className={options?.color.border} />}
						<li key={member.id} className={`w-full py-1 text-center`}>
							{member.name ? member.name : member.id}
						</li>
					</>
				))}
			</ul>
		</div>
	);
}
