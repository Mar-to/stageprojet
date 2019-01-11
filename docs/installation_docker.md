Installation under Docker
=========================

With the Docker installation, you have all the required softwares installed in two containers (gogocarto and mongo)

* Go to the /docker sub-directory

* Run `docker-compose build` to build the containers image

* Run `docker-compose up` to launch the containers

* Enter the `gogocarto` container with this command: `docker exec -it gogocarto bash`

* Run `./post_install.sh` from within the `gogocarto` container. This will launch all the required commands to finish the installation.

* **Warning**: During the `composer install`, when the script asks you for the parameters value, use `mongodb://mongo:27017` for the `mongodb_server` config instead of the default `mongodb://localhost:27017` value.

* Go to `http://localhost/app_dev.php/project/initialize` to initialize the project