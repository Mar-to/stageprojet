Installation under Docker
=========================

With the Docker installation, you have all the required softwares installed in two containers (`gogocarto` and `mongo`).

* Go to the `/docker` sub-directory.

* Run `docker-compose build` to build the container images.

* Run `docker-compose up` to launch the containers.

* Enter the `gogocarto` container with this command: `docker-compose exec gogocarto bash` or `docker exec -it gogocarto bash` (you can execute this one anywhere)

* Run `./post_install.sh` from within the `gogocarto` container. This will launch all the required commands to finish the installation.

* Go to `http://localhost/project/initialize` to initialize the project.
