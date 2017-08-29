FROM node:7.10
MAINTAINER kerker <yes-reply@linux.com>

RUN apt-get update \
    && apt-get -y install apache2 \

# 用完包管理器后安排打扫卫生可以显著的减少镜像大小
    && apt-get clean \
    && apt-get autoclean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /var/www/html/* \
    && echo "ServerName localhost" >> /etc/apache2/apache2.conf
EXPOSE 80
ADD package.json /tmp/
WORKDIR /tmp/
RUN npm config set registry http://nexus.daocloud.io/repository/daocloud-npm
RUN npm install
ADD . /tmp/


RUN npm run build \
    && cp -r ./dist/* /var/www/html/ \
    && rm -rf /tmp/*



CMD ["apache2ctl", "-D", "FOREGROUND"]

#usage:
#docker build -t <REPO_NAME> .
#docker run -d -p <PORT>:80 <REPO_NAME>
