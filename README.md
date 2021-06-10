# python-vue-playfield

## A simple web application to test Vue-Flask connection
### Repositories:
- python-vue-playfield-frontend
- python-vue-playfield-backend

**Notes:** 

- *supplied `docker-compose.yml` relies on frontend repository being cloned **inside** backend project directory. Ie:*
  ```
  cd some-path
  git clone https://github.com/yogavidya/python-vue-playfield-backend
  cd playfield-vue
  git clone https://github.com/yogavidya/python-vue-playfield-frontend
  ```

  **Resulting layout:**

  ![image](https://user-images.githubusercontent.com/23121359/121460702-b188f480-c9ad-11eb-896f-493efbc1b57b.png)

- *Python code assumes the root directory of the project to be added to PYTHONPATH; you can add said directory to PYTHONPATH in the environment, or simply create a virtual environment there, as in `python -m venv .`*

### Running the application:
- **Development**
  * Frontend:
`yarn serve`, or the npm equivalent, or use Vue UI to serve project, and open `http://localhost:8091/python-playfield`
  * Backend:
use the following `launch.json` for your VSCode project to run the backend in debugging mode  
```
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python: Modulo",
      "type": "python",
      "request": "launch",
      "module": "App.routes"
    }
  ]
}
```
- **Production 1** (nginx server on local machine)
  1. Open a shell inside the root directory of the project
  2. `docker-compose build`
  3. `docker-compose up`
  4. add the following to your nginx configuration:
  ```
  location /python-playfield {
    proxy_pass http://localhost:8091/;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_redirect off;        
  }

  location /python-playfield-api {
    proxy_set_header   X-Forwarded-Proto $scheme;
    proxy_pass http://localhost:5000/;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_redirect off;
  }
    ```
  5. browse to `https://localhost/python-playfield`
- **Production 2** (remote nginx server)
  1. Download docker images on your server
  2. Copy `docker-compose.yml` from the backend repository in an empty directory `/some-path/some-dir` on your server
  3. remove the two `build`instructions from said file 
  4. `docker-compose up`
  5. see step 4 in **Production 1** for nginx configuration
  5. browse to `https://<server-address>/python-playfield`
