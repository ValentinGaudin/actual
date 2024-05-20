######################
### PHP BASE IMAGE ###
######################
FROM php:8.3-fpm-alpine AS platform-base

ARG DOCKER_UID
ARG DOCKER_GID

# Basics
RUN apk --update --no-cache add bash nano

# Add easy extension installer
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

# Install required extensions
RUN chmod +x /usr/local/bin/install-php-extensions

# Install default required extensions
RUN install-php-extensions apcu calendar igbinary pcntl zip http pdo_mysql mysqli gd opcache intl

# Change UID
RUN apk --no-cache add shadow && \
    usermod -u ${DOCKER_UID} www-data && \
    groupmod -g ${DOCKER_GID} www-data

# Install opcache
RUN install-php-extensions opcache
ADD docker/php/opcache.ini /usr/local/etc/php/conf.d/opcache.ini

# Install Composer from image
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

USER www-data

############################
### platform LOCAL IMAGE ####
############################
FROM platform-base AS platform-local

USER root

# Setup entrypoint with startup commands
COPY docker/php/docker-entrypoint /usr/local/bin/docker-php-entrypoint
RUN chmod +x /usr/local/bin/docker-php-entrypoint

USER www-data

##################################
### WEBSERVER NGINX BASE IMAGE ###
##################################
FROM nginx:stable AS webserver-base

###################################
### WEBSERVER NGINX LOCAL IMAGE ###
###################################
FROM webserver-base AS webserver-local

ADD docker/nginx/local/conf.d-default.conf /etc/nginx/conf.d/default.conf
ADD docker/nginx/local/nginx.conf /etc/nginx/nginx.conf