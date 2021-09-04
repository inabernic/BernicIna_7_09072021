# Getting Started
You will need pre-instaled :
```
Node.js
MySQL
Vue.js
```

# backend
## 
## Project setup
### Run ```npm install```
### Copy the content of  ```template.env```  to a new ```.env``` file
### Add a secret TOKEN and select your environment in ```.env``` file (default is: development)
### Copy the content of  ```config/config.json.template```  to a new ```config/config.json``` file
### Add your database details ```config/config.json```
### Update database initial setup and the user admin as you wish in ```seeders/*.js``` files
The default admin:
```
    email: admin@example.com
    password: 123
```
### Run ```sequelize db:create && sequelize db:migrate && sequelize db:seed ```



# front
## Project setup
```
npm install
```
Update the variable "API"  with your backend adress in the file front/store.js 

### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```
### To preview the production build locally using the serve NPM package
```
serve -s dist
```
### Lints and fixes files
```
npm run lint
```

### Customize VUE configuration
See [Configuration Reference](https://cli.vuejs.org/config/).






