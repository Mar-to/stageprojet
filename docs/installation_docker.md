Installation under Docker
=========================

With the Docker installation, you have all the required softwares installed in two containers (`gogocarto` and `mongo`).

* Run `make build` to build the container images.

* Run `make up` to launch the containers.

* Enter the `gogocarto` container with this command: `make shell` or `docker exec -it gogocarto bash` (you can execute this one anywhere)

* Run `make init` from within the `gogocarto` container. This will launch all the required commands to finish the installation.

* Go to `http://localhost/project/initialize` to initialize the project.
