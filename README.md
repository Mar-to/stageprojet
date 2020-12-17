![Map](docs/images/1.png "Intro")

GoGoCarto
=========

**Documentation and Tutorials availables at https://doc.gogocarto.fr/**

Contact
--------
You can contact us on the channel GoGoCarto at https://chat.lescommuns.org/channel/gogocarto

Overview
--------

GoGoCarto is a full reusable application to create collaborative maps

It's highly configurable, and ready to be reused by anyone to create its own map, with its own data, categories, moderation rules, configuration etc...
There is a whole back office to manage data, contents, configuration

![Dashboard](docs/images/21.png "Dashboard")

[See more screenshot of the backoffice](docs/backoffice-screenshots.md)

Multi Instance Mode
-------------------

You can configure your server to work as a multi instance creator. See example at https://gogocarto.fr
Every new project will live in a dedicate subdomain like my-map.gogocarto.fr


GoGoCarto & GoGoCartoJs
------------------

The GoGoCarto project is divided into two separate projects.

- GoGoCarto repo take care of backend stuff, the form to add new elements, the backoffice, and additonnals pages sucha as homepage
- [GoGoCartoJs](https://gitlab.adullact.net/pixelhumain/GoGoCartoJs) an autonomous javascript library responsible for data vizualisation (map, list, categories, search...). [See the online full documentation](https://pixelhumain.github.io/GoGoCartoJs)

Stack
-----

Symfony4, MongoDB, Typescript

Installation
-------------

[Installation intructions](docs/installation.md)
