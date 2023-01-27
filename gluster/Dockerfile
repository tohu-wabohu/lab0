FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
  software-properties-common

RUN add-apt-repository -y ppa:gluster/glusterfs-10

RUN apt-get update && apt-get install -y \
  glusterfs-server

CMD ["/usr/sbin/glusterd", "-N"]

