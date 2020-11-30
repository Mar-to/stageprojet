Installation under Docker
=========================

With the Docker installation, you have all the required softwares installed in two containers (`gogocarto` and `mongo`).

* Run `make build` to build the container images.

* Run `make up` to launch the containers.

* Enter the `gogocarto` container with this command: `make shell` or `docker exec -it gogocarto bash` (you can execute this one anywhere)

* Run `make init` from within the `gogocarto` container. This will launch all the required commands to finish the installation.

* Go to `http://localhost:3008/project/initialize` to initialize the project.

### Local docker-compose

If you have a specific environment, need for custom env vars, want to avoid exposing ports, etc, you can create a copy of `docker/docker-compose.yml` named `docker/docker-compose.local.yml` (it will be gitignored).
