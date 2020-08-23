#!/bin/bash
# Exple : sh remove_custom_domain_config.sh my-domain.fr
CUSTOM_URL=$1
rm /etc/nginx/sites-available/$CUSTOM_URL /etc/nginx/sites-enabled/$CUSTOM_URL