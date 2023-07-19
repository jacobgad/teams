# Changelog

## [1.3.1](https://github.com/jacobgad/teams/compare/v1.3.0...v1.3.1) (2023-07-19)


### Bug Fixes

* :bug: text field error overlap ([82329c2](https://github.com/jacobgad/teams/commit/82329c20ee0f2b8335a6d5fd9e5f65cec0b2dc9f))

## [1.3.0](https://github.com/jacobgad/teams/compare/v1.2.2...v1.3.0) (2023-07-11)


### Features

* :construction: add delta-e function ([12f5c94](https://github.com/jacobgad/teams/commit/12f5c94f5bffea21623ed97f02fe79f174e3beb6))
* :construction: build out getNextTheme function using delta-e ([c6eeffb](https://github.com/jacobgad/teams/commit/c6eeffb33864436a80904429ce7d7c5592e18737))
* :sparkles: add rgb values to team data ([ba364e9](https://github.com/jacobgad/teams/commit/ba364e9b0042a3579e3d09bc7491aa966c442f4e))


### Bug Fixes

* :bug: have variance in team themes ([6b7b436](https://github.com/jacobgad/teams/commit/6b7b43683ddd9b54bfae1e040905b272b3f84d9b))

## [1.2.2](https://github.com/jacobgad/teams/compare/v1.2.1...v1.2.2) (2023-05-03)


### Performance Improvements

* :zap: switch to prisma jsonProtocol ([3faa581](https://github.com/jacobgad/teams/commit/3faa58174720f9c472af4650a097c0dd3721bce6))

## [1.2.1](https://github.com/jacobgad/teams/compare/v1.2.0...v1.2.1) (2022-11-17)


### Performance Improvements

* :zap: use hidden in next link to not block prefetch ([a2ce041](https://github.com/jacobgad/teams/commit/a2ce041751134cd93a7cef3ccc52c43e686ee663))

## [1.2.0](https://github.com/jacobgad/teams/compare/v1.1.0...v1.2.0) (2022-10-29)


### Features

* :sparkles: Add nav user menu ([28251e3](https://github.com/jacobgad/teams/commit/28251e36afa211da647ba1bf7f3ecc441eeeb955))

## [1.1.0](https://github.com/jacobgad/teams/compare/v1.0.1...v1.1.0) (2022-10-26)


### Features

* :sparkles: complete transition to tRPC v10 ([b4da2b3](https://github.com/jacobgad/teams/commit/b4da2b32abfe2cc26c67c8692b035377fbfaab0f))

## [1.0.1](https://github.com/jacobgad/teams/compare/v1.0.0...v1.0.1) (2022-10-25)


### Bug Fixes

* :bug: handle auth button loading state ([c23dcca](https://github.com/jacobgad/teams/commit/c23dcca09fcdeb882235960c25245075abd51aeb))

## 1.0.0 (2022-10-24)


### Features

* :construction: add google authentication ([3348203](https://github.com/jacobgad/teams/commit/334820320f0eefc5bee0414e33d4e93e808e846c))
* :construction: complete game view ([85ff7d2](https://github.com/jacobgad/teams/commit/85ff7d2baa7284aa63320e60d3d337ef91654623))
* :construction: Option to require member names ([c34c5b9](https://github.com/jacobgad/teams/commit/c34c5b9d55eaa381cdfbe4d2cfa69e92b7d3313a))
* :sparkles: Add animations from framer motion ([061d1e9](https://github.com/jacobgad/teams/commit/061d1e9a7a079776152a78f81dc9d2f734ebfa27))
* :sparkles: add api clean up function ([d7312fc](https://github.com/jacobgad/teams/commit/d7312fccb1a14ca67b24e93cfe9df2de1cab199e))
* :sparkles: Add create game form ([43ed461](https://github.com/jacobgad/teams/commit/43ed461527c2d87bae700e77a997fcafdc964f44))
* :sparkles: Add dicebear avatars when oauth image is not provided ([5c18bcc](https://github.com/jacobgad/teams/commit/5c18bcc6db11181911e2a636b65eee2ce4557ff3))
* :sparkles: Allow deletion of games ([3f3fcc6](https://github.com/jacobgad/teams/commit/3f3fcc6f10302b2e5af374806b1f3c9d64183e5d))
* :sparkles: Complete Auth, protected routes and home page ([7a1879c](https://github.com/jacobgad/teams/commit/7a1879c9fd1f54a7f7cf5a587e603eed68df8d81))
* :sparkles: complete join game feature ([d46d641](https://github.com/jacobgad/teams/commit/d46d641c0b23b21cba3832b22ccb049d1357b7a0))
* :sparkles: Increate max teams to 20 with new colors ([61c725d](https://github.com/jacobgad/teams/commit/61c725deb4b77b3850d00ffc8098472a201e51cf))
* :sparkles: Option to require member names ([2932655](https://github.com/jacobgad/teams/commit/293265552cff5d1fd356bda5f6a2c70f84490253))
* :sparkles: Sort games list from newest to oldest ([ad39f57](https://github.com/jacobgad/teams/commit/ad39f57c7d25b055f5ffdea417f248750d13e3dc))


### Bug Fixes

* :art: update cleanup cron to run at midnight ([be48744](https://github.com/jacobgad/teams/commit/be48744a72356a5196d0ac28461d080ae2c8236b))
* :bug: comment out api route example ([117a5ba](https://github.com/jacobgad/teams/commit/117a5ba3c9993274660accf4b785c6dfcf267518))
* :bug: Fix docuent undefigned on SSR ([caf1169](https://github.com/jacobgad/teams/commit/caf1169294b4f0f86d3952a209959c4811fdd4a9))
* :bug: Fix signout redirect bug ([d1c8a58](https://github.com/jacobgad/teams/commit/d1c8a58f36b8992681e7837fa8221c120c7a7825))
* :bug: fix typescript errors ([ad6afe1](https://github.com/jacobgad/teams/commit/ad6afe1c12250cad768ae00ac0054b8ba481e748))
* :bug: move GameListItem to components folder ([8fc6e72](https://github.com/jacobgad/teams/commit/8fc6e72ce2c0fe65aaaf7ead222ca69ac94827fc))
* :bug: refetch member joing page to keep members up to date ([42ca0eb](https://github.com/jacobgad/teams/commit/42ca0eb85351421ecbaab2922130709fae452930))
* :bug: remove '1' from team count desplay ([8b79a1a](https://github.com/jacobgad/teams/commit/8b79a1a8a074ed485d8bafc220b57448bcdf5c60))
* :bug: remove hard coded join url ([1c6d0c1](https://github.com/jacobgad/teams/commit/1c6d0c1ae5ad32258c4adcfca7a05d61bdc2d882))
* :bug: removed unused router import ([fdf68e7](https://github.com/jacobgad/teams/commit/fdf68e7ed1ac64313d31574aae733457112953af))
* :bug: set cleanup cron to run 1am UTC time ([7adffab](https://github.com/jacobgad/teams/commit/7adffab2799eca1f1d56a57453f3bffb69628f2e))
* :bug: set refresh interval on game page to get updated list of users ([3ee99c3](https://github.com/jacobgad/teams/commit/3ee99c3ec04b8f4b2d921cd9f3de0b6893b0cabe))


### Performance Improvements

* :zap: disable delete game button when loading & imporve styles ([9455457](https://github.com/jacobgad/teams/commit/9455457af9e196dd2e4966fc70390b2e64da45e6))
* :zap: Make Loading spinners non blocking for games pages ([8a1672e](https://github.com/jacobgad/teams/commit/8a1672eab0d1d1662db825703b83e3a1475c7075))
* :zap: refactor to use Link for prefetching ([b0046db](https://github.com/jacobgad/teams/commit/b0046db6d97bb4156421f9d5ac99d05922b8288c))
* :zap: Setup github cron to hit cleanUp api route every 15min ([2128de3](https://github.com/jacobgad/teams/commit/2128de3a25c1c0d4065b6ddbcaf53100a6eb54b0))
* :zap: use getServerSideProps to protect routes ([77560da](https://github.com/jacobgad/teams/commit/77560daf3cfc62cc6c5d7bf344219e1d494568b8))
