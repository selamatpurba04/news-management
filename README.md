# News Management

A simple management news, there are the components to build it, such as :

- Backend : <a href="https://nodejs.org/en/">NodeJS</a>
- FrontEnd : <a href="http://vuejs.org/">Vue.JS</a>
- Database : <a href="https://www.mongodb.com/">MongoDB</a>
- MongoDB driver : <a href="http://mongoosejs.com/">Mongoose</a>
- Framework : <a href="http://expressjs.com/">Express JS</a>
- Promise based HTTP client : <a href="https://github.com/axios/axios">Axios</a>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Installing Server (Backend)

- Clone the repository
```
git clone https://github.com/selamatpurba04/news-management.git newsManagement
```

- Install NPM packages
```
cd newsManagemen/server
npm install
```

- Make sure mongodb service already running
```
service mongod status
```

- Run mongod with a local data directory
```
mongod --dbpath=data
```

- Run the server
```
npm run start
```

### Installing Clinet (Frontend)

- Clone the repository
```
git clone https://github.com/selamatpurba04/news-management.git newsManagement
```

- Install NPM packages
```
cd newsManagemen/client
npm install
```

- Run the server
```
npm run start
```

