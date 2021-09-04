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
Run ```npm install```
Copy the content of  ```config/config.json.template```  in the ```config/config.json``` 
Configure ```config/config.json``` 

Run ```sequelize db:create && sequelize db:migrate && sequelize db:seed ```


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

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).






