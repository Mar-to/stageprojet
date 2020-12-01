for file in var/file_queues/custom_domain_to_remove/*
do
    CUSTOM_URL=`cat $file`
    rm /etc/nginx/sites-available/$CUSTOM_URL /etc/nginx/sites-enabled/$CUSTOM_URL
    rm $file
done

for file in var/file_queues/custom_domain_to_configure/*
do
    arguments=`cat $file`
    sh bin/configure_custom_domain.sh $arguments
    rm $file
done