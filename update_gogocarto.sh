#!/bash/bin

git reset --hard master
git pull origin master
npm install
composer install
gulp build
gulp production
php bin/console cache:clear --env=prod

sleep 10 && chmod 777 -R var/ &
sleep 60 && chmod 777 -R var/ &
sleep 120 && chmod 777 -R var/ &
sleep 300 && chmod 777 -R var/ &
sleep 600 && chmod 777 -R var/ &
sleep 2000 && chmod 777 -R var/ &