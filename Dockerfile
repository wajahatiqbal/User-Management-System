FROM centos:latest
LABEL maintainer="wajahatiqbal47@gmail.com"

EXPOSE 4000
EXPOSE 3000

RUN curl -sL https://rpm.nodesource.com/setup_8.x | bash -
RUN yum -y install http://mirror.rackspace.com/epel/epel-release-latest-7.noarch.rpm && yum update -y
RUN yum install -y epel-release nodejs make gcc-c++ git \
 && cd /tmp/ \
 && npm install -g node-gyp
RUN npm install -g pm2@1.1.3
#ADD package.json /tmp-app/
#ADD api/package.json /tmp-api/

WORKDIR /app

ADD . /app

RUN cd /app

RUN npm install --ignore-engines

RUN cd /app/api && npm install --ignore-engines

ENTRYPOINT ["pm2", "--no-daemon", "start"]

CMD ["process.json"]
