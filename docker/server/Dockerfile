FROM php:7.3-apache

RUN apt-get update
RUN apt-get install --yes cron g++ gettext libicu-dev openssl libc-client-dev libkrb5-dev libxml2-dev libfreetype6-dev libgd-dev libmcrypt-dev bzip2 libbz2-dev libtidy-dev libcurl4-openssl-dev libz-dev libmemcached-dev libxslt-dev gnupg nano git
RUN apt-get -y install libzip-dev libsodium23

# PHP Configuration
RUN docker-php-ext-install bcmath
RUN docker-php-ext-install bz2
RUN docker-php-ext-install calendar
RUN docker-php-ext-install dba
RUN docker-php-ext-install curl
RUN docker-php-ext-install exif
RUN docker-php-ext-configure gd --with-freetype-dir=/usr --with-jpeg-dir=/usr
RUN docker-php-ext-install gd
RUN docker-php-ext-install gettext
RUN docker-php-ext-configure imap --with-kerberos --with-imap-ssl
RUN docker-php-ext-install imap
RUN docker-php-ext-install intl
RUN docker-php-ext-install soap
RUN docker-php-ext-install tidy
RUN docker-php-ext-install xmlrpc
RUN docker-php-ext-install mbstring
RUN docker-php-ext-install simplexml
RUN docker-php-ext-install xsl
RUN docker-php-ext-install zip
RUN docker-php-ext-configure hash --with-mhash

RUN printf "\n" | pecl install libsodium \
     && docker-php-ext-enable sodium

# MongoDB extension
RUN printf "\n" | pecl install mongodb \
     && docker-php-ext-enable mongodb

# Imagemagick
RUN apt-get install --yes libmagickwand-dev libmagickcore-dev imagemagick
RUN printf "\n" | pecl install imagick
RUN docker-php-ext-enable imagick

# Apache Configuration
RUN a2enmod rewrite
RUN a2enmod headers

# SSL
RUN a2enmod ssl
RUN a2ensite default-ssl
RUN openssl req -subj '/CN=example.com/O=My Company Name LTD./C=US' -new -newkey rsa:2048 -days 365 -nodes -x509 -keyout /etc/ssl/private/ssl-cert-snakeoil.key -out /etc/ssl/certs/ssl-cert-snakeoil.pem

# Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Prestissimo
RUN composer global require hirak/prestissimo --prefer-dist --no-progress --no-suggest --classmap-authoritative

# Node & NPM
RUN curl -sL https://deb.nodesource.com/setup_10.x  | bash -
RUN apt-get --yes install nodejs
RUN curl -L https://npmjs.org/install.sh | sh

# Gulp
RUN npm install -g gulp

# Config files
COPY custom-php-conf.ini /usr/local/etc/php/conf.d/
COPY apache.conf /etc/apache2/sites-available/000-default.conf

# We don't need this directory
RUN rm -R /var/www/html

WORKDIR /var/www

RUN apt-get install unzip