# Install all composer packages in /vendor subdirectory
composer install

# Install and build assets
php bin/console assets:install --symlink web
npm install
gulp build

# Configure the MongoDB database
php bin/console doctrine:mongodb:schema:create
php bin/console doctrine:mongodb:generate:hydrators
php bin/console doctrine:mongodb:generate:proxies
php bin/console doctrine:mongodb:fixtures:load

# Generate 200 random elements in the map
# This doesn't work at the moment
# php bin/console app:elements:generate 200

# Make the var directories writeable by Apache
chown -R www-data var/cache
chown -R www-data var/logs
chown -R www-data var/sessions
chown -R www-data web/uploads
