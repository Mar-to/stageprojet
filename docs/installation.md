Installation and Production Instructions
========================================

Feel free to add some more information if you solve installation issues!

Installation with Docker
------------

With the Docker installation, you have all the required softwares installed in two containers (`gogocarto` and `mongo`).

* Run `make build` to build the container images.

* Run `make up` to launch the containers.

* Enter the `gogocarto` container with this command: `make shell` or `docker exec -it gogocarto bash` (you can execute this one anywhere)

* Run `make init` from within the `gogocarto` container. This will launch all the required commands to finish the installation.

* Go to `http://localhost:3008/project/initialize` to initialize the project.

### Local docker-compose

If you have a specific environment, need for custom env vars, want to avoid exposing ports, etc, you can create a copy of `docker/docker-compose.yml` named `docker/docker-compose.local.yml` (it will be gitignored).


Manual Install
------------

Main requirements are :

1. PHP 7.4
2. [Composer](https://getcomposer.org/download/)
3. [Nodejs](https://nodejs.org/en/download/)
4. [Git](https://git-scm.com/)
5. Web Server (Apache, Nginx)
6. [MongoDB](http://php.net/manual/fr/mongodb.installation.php)

Please refer to the dockerfile to know all dependencies : [DockerFile](../docker/server/Dockerfile)

### Cloning Repository

```shell
git clone https://gitlab.adullact.net/pixelhumain/GoGoCarto.git
```

### Initialize the Project

Create an `.env.local` file containing:

```
MONGODB_URL=mongodb://localhost:27017
```

Execute the command:

```shell
make init
```

Now initialize your project with the following route:

`http://localhost/GoGoCarto/web/project/initialize`

SAAS Mode (Software As A Service)
--------------------------

Instead of having a single GoGoCarto instance, you can transform your site in a "farm" by turning env variable USE_AS_SAAS to true

For Development
--------------

Start watching for file changes (automatic recompilation):

```shell
make watch
```

For Production
--------------

### Cron Tabs

Here are the following cron tab you need to configure 

```shell
# for a Normal instance
@daily php GOGOCARTO_DIR/bin/console --env=prod app:elements:checkvote
@hourly php GOGOCARTO_DIR/bin/console --env=prod app:users:sendNewsletter
@hourly php GOGOCARTO_DIR/bin/console --env=prod app:webhooks:post
@daily php GOGOCARTO_DIR/bin/console --env=prod app:elements:checkExternalSourceToUpdate
```

```shell
# for a SAAS instance
* * * * * php GOGOCARTO_DIR/bin/console --env=prod app:main-command
@daily php GOGOCARTO_DIR/bin/console --env=prod app:saas:update-projects-info
@daily php GOGOCARTO_DIR/bin/console --env=prod app:projects:check-for-deleting
* * * * * cd GOGOCARTO_DIR && sh bin/execute_custom_domain.sh
```

### Updating GoGoCarto

Each time you want to update GoGoCarto, run:

```shell
make gogo-update
```

You can have a look to [the CHANGELOG](../CHANGELOG.md) to know what are the new features and breaking changes.


Issues
--------------

If memory limits while using Composer:

```shell
COMPOSER_MEMORY_LIMIT=-1 composer ...
```
