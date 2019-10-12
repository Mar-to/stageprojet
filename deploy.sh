#!/bash/bin

git reset --hard master
git pull origin master
npm install
composer install
gulp build
gulp production
php bin/console db:migrate
sh cache_clear.sh
sleep 5
chmod 777 -R var/
sleep 10
chmod 777 -R var/
chmod 777 -R /var/www/gogocarto/var/