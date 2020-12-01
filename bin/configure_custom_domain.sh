#!/bin/bash
# Exple : sh configure_custom_domain.sh my-domain.fr mymap.gogocarto.fr contact@email.com
CUSTOM_URL=$1 # no http(s):// inside
GOGO_URL=$2 # no http(s):// inside
CONTACT_EMAIL=$3
echo "
server {
    server_name www.$CUSTOM_URL;
    return 301 \$scheme://$CUSTOM_URL\$request_uri;
}
server {
  listen 80;
  listen [::]:80;
  server_name $CUSTOM_URL;
  location ~ .* {
     proxy_set_header Host $GOGO_URL;
     proxy_pass https://$GOGO_URL;
     proxy_set_header X-Real-IP \$remote_addr;
     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
     proxy_set_header X-NginX-Proxy true;
     proxy_redirect off;
  }
}
" | tee /etc/nginx/sites-available/$CUSTOM_URL

ln -s /etc/nginx/sites-available/$CUSTOM_URL /etc/nginx/sites-enabled/$CUSTOM_URL
service nginx reload

# Creat ceertificate
certbot certonly --rsa-key-size 4096 --webroot -w /var/www/certbot/ --email $CONTACT_EMAIL --agree-tos --text --renew-hook "/usr/sbin/nginx -s reload" -d $CUSTOM_URL

# Edit
echo "
server {
    server_name www.$CUSTOM_URL;
    return 301 \$scheme://$CUSTOM_URL\$request_uri;
}
server {
  listen 80;
  listen [::]:80;
  server_name $CUSTOM_URL;
  return 301 https://\$server_name\$request_uri;
}
server {
  listen 443 ssl http2;
  server_name $CUSTOM_URL;
  ssl_certificate /etc/letsencrypt/live/$CUSTOM_URL/fullchain.pem;
  ssl_certificate_key  /etc/letsencrypt/live/$CUSTOM_URL/privkey.pem;
  location ~ .* {
     proxy_set_header Host $GOGO_URL;
     proxy_pass https://$GOGO_URL;
     proxy_set_header X-Real-IP \$remote_addr;
     proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
     proxy_set_header X-NginX-Proxy true;
     proxy_redirect off;
  }
}" | tee /etc/nginx/sites-available/$CUSTOM_URL

service nginx reload

