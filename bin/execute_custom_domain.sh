#!/bin/bash

# Log into a file
exec 3>&1 1>>var/log/subdomains.log 2>&1

for file in var/file_queues/custom_domain_to_remove/*
do    
    if [ -e $file ] 
    then
        CUSTOM_URL=`cat $file`
        echo "\n\n\nRemoving subdomain for $file : $CUSTOM_URL"
        if [ -n "$CUSTOM_URL" ]; then
            echo "Remove previous certificates if exists"
            if [ -e /etc/letsencrypt/live/$CUSTOM_URL/cert.pem ]; then
                certbot revoke -n --cert-path /etc/letsencrypt/live/$CUSTOM_URL/cert.pem            
            fi 
            echo "Delete previous nginx conf"
            rm /etc/nginx/sites-available/$CUSTOM_URL /etc/nginx/sites-enabled/$CUSTOM_URL
            rm $file       
            echo "Reload Nginx" 
            service nginx reload       
        fi
    fi
done

for file in var/file_queues/custom_domain_to_configure/*
do
    if [ -e $file ] 
    then
        arguments=`cat $file`
        echo "\n\n\nConfigure new domain for $file : $arguments"

        if sh bin/configure_custom_domain.sh $arguments
        then
            echo "Successfully configured $file, the file queue can now be deleted"
            service nginx reload
            rm $file
        else
            echo "Problem while configuring $file"
        fi    
    fi
done
