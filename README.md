![Shtr](https://raw.githubusercontent.com/projectashik/shtr/main/public/favicon.ico)

# Shtr - More than url shortner

## Quick Installation

[![Deploy](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/projectashik/shtr)
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2Fprojectashik%2Fshtr&plugins=postgresql)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fprojectashik%2Fshtr&env=DATABASE_URL,HASH_SALT)

## Getting Started

```
git clone https://github.com/projectashik/shtr.git
```

```
cd shtr
```

```
yarn install
```

```
mv .env.example .env
```

Update the database url and hash salt in .env file

```
DATABASE_URL=
HASH_SECRET=
```

```
yarn dev
```

Now go to http://localhost:3000/. And use a powerful url shortner.
