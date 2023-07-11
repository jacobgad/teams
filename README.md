# Teams - start games fast!

Teams is a fast way to split up a group of people into random teams, just create a game and share the link.

Teams was build from watching the frustrations of Verena, a youth leader who would expend way too much effort organising the youth into groups to start a game.

I pray that this app means for you, less time organising and more time having fun with friends.

## Demo

https://teams.gad.engineer

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`

`NEXT_PUBLIC_VERCEL_URL`

`GOOGLE_CLIENT_SECRET`

`GOOGLE_CLIENT_ID`

`NEXTAUTH_URL`

`NEXTAUTH_SECRET`

## Developer Environment Setup

1. Setup postgres in a docker container

```bash
docker run --name postgres -p 5432:5432 -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=password -d postgres
```

2. Clone the repo

```bash
git clone git@github.com:jacobgad/teams.git
```

3. Change directory into the teams folder and add the environment variables listed above to a .env file in the root directory.

```bash
cd teams
touch .env
```

4. Install dependencies

```bash
npm install
```

5. Run dev server

```bash
npm run dev
```

## Acknowledgements

- [create-t3-app](https://github.com/t3-oss/create-t3-app)
- [Nextjs](https://nextjs.org/)
- [tRPC](https://trpc.io/)
- [prisma](https://www.prisma.io/)
- [tailwind](https://tailwindcss.com/)
- [next-auth](https://next-auth.js.org/)

## Authors

- [@jacobgad](https://github.com/jacobgad)
