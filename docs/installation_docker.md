Installation under Docker
=========================

With the Docker installation, you have all the required softwares installed in two containers (gogocarto and mongo)

* Go to the /docker sub-directory

* Run `docker-compose build` to build the containers image

* Run `docker-compose up` to launch the containers

* Enter the `gogocarto` container with this command: `docker exec -it gogocarto bash`

* Run all the commands given in the [installation instructions](installation.md) (composer, npm, gulp, symfony console commands...)

* **Warning**: During the `composer install`, when the script asks you for the parameters value, don't use the default value of the `mongodb_server` config. Use `mongodb://mongo:27017` instead of the default `mongodb://localhost:27017` value.

* Go to `http://localhost/app_dev.php/project/initialize` to initialize the project