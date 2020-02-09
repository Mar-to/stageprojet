Installation and Production Instructions
========================================

Feel free to add some more information if you solve installation issues!

Quick Install
-------------

- **Debian script**: there is a script for Debian installation named `install_debian.sh` in this docs directory! After installation, go to `http://localhost/GoGoCarto/web/project/initialize` to initialize your project.

- **Docker containers**: please follow the instructions [here](installation_docker.md).

Manual Install: Requirements
------------

1. PHP 7
2. [Composer](https://getcomposer.org/download/)
3. [Nodejs](https://nodejs.org/en/download/)
4. [Git](https://git-scm.com/)
5. Web Server (Apache, Nginx, [Wamp server](http://www.wampserver.com/) ...)
6. MongoDB (http://php.net/manual/fr/mongodb.installation.php) -> !!Version 3.4 or below!!!

Consider the [Docker installation](installation_docker.md) if you run into troubles installing these softwares.

Installation
------------

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

It will:
- install the dependencies
- install and build the assets
- load the fixtures

Now initialize your project with the following route:

`http://localhost/GoGoCarto/web/project/initialize`

Start
-----

Start watching for file changes (automatic recompilation):

```shell
gulp watch
```

Updating your Production Install
---------------------

Each time you want to update GoGoCarto, run:

```shell
make gogo-update
```

You can have a look to [the CHANGELOG](../CHANGELOG.md) to know what are the new features.


Issues
------

If when you create an element you have the issue "cannot load method bcmod from namespace ...",
you need to install the bc-math module:

```
sudo apt install php7.3-bcmath
```

If memory limits while using Composer:

```shell
COMPOSER_MEMORY_LIMIT=-1 composer ...
```
