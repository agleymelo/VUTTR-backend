# VUTTR (Very Useful Tools to Remember) - Backend

VUTTR is a mini challenge given by [Bossabox](https://app.bossabox.com/u/agleylson-silva)

## 📝 Content

- [Technologies](#technologies_used)
- [Started](#getting_started)
- [Extra steps](#extra_steps)
- [Docs](#docs)
- [Author](#author)

## ⛏️ Technologies used <a name = "technologies_used"></a>

- [NodeJs](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)
- [Typeorm](https://typeorm.io/#/)
- [Postgress](https://www.postgresql.org/)

### Frameworks/libs

- [Express](https://expressjs.com/)
- [Jest](https://jestjs.io/)
- [UUID](https://www.npmjs.com/package/uuid)

## 🚀 Getting Started <a name = "getting_started"></a>

### Minimum requirement:

- PostSQL
- NodeJS
- **It is recommended that you use the Postgres database**

### Clone this repository to your machine

```bash
# Using SSH
git@github.com:agleymelo/VUTTR-backend.git
```

```bash
# Using HTTPS
https://github.com/agleymelo/VUTTR-backend.git
```

### Install Dependecies:

```bash
cd VUTTR-backend

# Yarn
yarn install

# Npm
npm install
```

## 🚀 Development Server

to run the server under development you can use the script

```bash
# Yarn
yarn dev:server

# Npm

npm dev:server
```

## 🚀 Generate Production build

Generate the production version

```bash
# Yarn
yarn build

# Npm

npm build
```

## 🚀 Extra steps <a name = "extra_steps"></a>

Create your own ".env" file based on ".env.example"

**if migrations were not created in your database, please use**

```bash
yarn typeorm migration:run
```

## 🚀 Docs<a name = "docs"></a>

Visit the swagger documentation on http://localhost:3000/docs or https://vuttr-api-agley.herokuapp.com/docs

## ❤️ Building

Generate the production version

```bash
# yarn
yarn build

# Npm
npm build
```

## ✍️ Author <a name = "author"></a>

👤 **Agleylson Melo**

- Twitter: [@agleymelo](https://twitter.com/agleymelo)
- Github: [@agleymelo](https://github.com/agleymelo)
- LinkedIn: [@agleymelo](https://www.linkedin.com/in/agleylson/)

<p align="center">
  DONE WITH 💜
</p>

