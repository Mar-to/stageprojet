Installation and Production Instructions
========================================

Feel free to add some more information if you solve installation issues!

Quick Install
-------------

- **Debian script**: there is a script for Debian installation named `install_debian.sh` in this docs directory! After installation, go to `http://localhost/GoGoCarto/web/project/initialize` to initialize your project.

- **Docker containers**: please follow the instructions [here](installation_docker.md).

Requirements
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

### Cloning Repository (clone dev branch)

```shell
cd path-to-php-server-folder (default linux /var/www/html, windows c:/wamp/www... )
git clone https://gitlab.adullact.net/pixelhumain/GoGoCarto.git
cd GoGoCarto/
```

### Installing Dependencies

PHP dependencies (Symfony, bundles...)

```shell
composer install
```

Workflow dependencies (compiling SASS and JavaScript)

```shell
npm install gulp
npm install
```

Start
-----

Create an `.env.local` file containing:

```
MONGODB_URL=mongodb://localhost:27017
```

Dump assets:

```shell
php bin/console assets:install --symlink web
```

First build of JavaScript and CSS:

```shell
gulp build
```

Start watching for file change (automatic recompile):

```shell
gulp watch
```

Generate Database
-----------------

Go to Symfony console: `http://localhost/GoGoCarto/web/_console`

Run the followings command:

```shell
doctrine:mongodb:schema:create
doctrine:mongodb:generate:hydrators
doctrine:mongodb:generate:proxies
doctrine:mongodb:fixtures:load
```

The last command will generate a basic configuration.

Then generate if necessary random points on the map:

```shell
app:elements:generate 200
```

Now initialize your project with the following route:

`http://localhost/GoGoCarto/web/project/initialize`

Updating your Install
---------------------

Each time you want to update GoGoCarto, run the following script:

```shell
sh deploy.sh
```

You can have a look to [the CHANGELOG](../CHANGELOG.md) to know what are the new features.

Production
----------

1. Dump assets in Symfony console to update the web/templates files:

```
assets:install web
```

2. Generate compressed JS and CSS files:

```
gulp build
gulp production
```

3. Enable gz compression in your web server.

4. In the distant console (http://yoursite.com/web/_console):

```
cache:clear --env=prod
```

5. Make sure that the var folder is writable `chmod -R 771 var/`.

Issues
-------

If when you create an element you have the issue "cannot load method bcmod from namespace ...",
you need to install the bc-math module:

```
sudo apt install php7.3-bcmath
```

If memory limits while using Composer:

```shell
COMPOSER_MEMORY_LIMIT=-1 composer ...
```
