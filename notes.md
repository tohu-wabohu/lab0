# Notes

## Linux

### Get Ubuntu Server 22.04 iso
```
wget https://releases.ubuntu.com/22.04.2/ubuntu-22.04.2-live-server-amd64.iso
```

### Zipping, Tarring, archiving, etc...
#### Tar
```
tar -C /foobar_path/ -cvf foobar.tar foobar/
tar -I lz4 -cvf foobar.tar.lz4 foobar/
lz4 -d foobar.tar.lz4 | tar -xv
```
#### Rsync
```
rsync -azP /foobar /destination/

  -a (or --archive):            This option is short for "archive" and syncs directories recursively.
                                It also preserves symbolic links, file permissions, user &  group
                                ownerships and timestamps.

  -z (or --compress):           This option compresses data during the transfer, which can speed up the
                                transfer process if you're dealing with large files.

  -P (or --partial --progress): This option combines two functionalities.
                                The --partial part allows resuming interrupted transfers,
                                while --progress shows the progress during the transfer.
```
#### SCP
```
scp -c aes128-ctr 10.0.0.1:/tmp/foobar.tar.gz .
```

## Network

### Disable IPv6
```
# vi /etc/default/grub
GRUB_CMDLINE_LINUX="ipv6.disable=1"
GRUB_CMDLINE_LINUX_DEFAULT="ipv6.disable=1"

update-grub
```

## HDD/SSD/...

### Wipe SSD disk
Just to be on a safe side, we'll erase data in three different ways:
```
dd if=/dev/urandom of=/dev/nvmeX bs=1M status=progress
dd if=/dev/zero    of=/dev/nvmeX bs=1M status=progress
blkdiscard -s /dev/nvmeX
```

## Glusterfs
```
gluster peer probe gluster01
gluster peer status
gluster volume add-brick gluster_vol replica 3 gluster01:/gluster_vol force
gluster volume heal gluster_vol info

# Remove
gluster volume remove-brick gluster_vol replica 3 gluster04:/gluster_vol force
gluster peer detach gluster04
```

## Git
Quick add, commit, push:
```
git add -A; git commit -m "up"; git push
git add -A; git commit -m "up"; git push --force-with-lease    # after branch rebase
```

Delete branches:
```
git branch -d localBranchName                    # delete branch locally
git push origin --delete remoteBranchName        # delete branch remotely
```

Get hash:
```
git rev-parse --short HEAD
```

After fetching, remove any remote-tracking branches which no longer exist on the remote:
```
git fetch --prune
```

## Docker
#### Change MTU
```
# vi /etc/docker/daemon.json
{
  "mtu": 1400
}

systemctl restart docker


docker network rm docker_gwbridge

docker network create -d bridge \
--subnet 172.18.0.0/16 \
--opt com.docker.network.bridge.name=docker_gwbridge \
--opt com.docker.network.bridge.enable_icc=false \
--opt com.docker.network.bridge.enable_ip_masquerade=true \
--opt com.docker.network.driver.mtu=1400 \
docker_gwbridge

docker network inspect docker_gwbridge


docker swarm leave --force
docker swarm init --advertise-addr 127.0.0.1 --listen-addr 127.0.0.1 --data-path-addr 127.0.0.1
```

#### Scale down/up all service in swarm
```
for i in $(docker service ls |grep filter |awk '{print $2}'); do echo $i; docker service scale ${i}=0; done
```

#### Docker Compose, docker-compose.yml, example
```
version: "2.2"
services:
  web:
    build: .
    ports:
      - "8000:8000"
    mem_limit: 4g
    dns:
      - 8.8.8.8
      - 4.4.4.4

  foobar:
    image: ubuntu:20.04
    build:
      context: /data/build
      dockerfile: Dockerfile-foobar
    restart: always
    command: sleep infinity
```

#### Dockerfile example
```
FROM ubuntu:20.04

SHELL ["/bin/bash", "-c"]

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get upgrade -y && apt-get install -y \
  procps \
  iproute2 \
  dnsutils \
  iputils-ping \
  git \
  curl \
  wget \
  vim \
  # ---- other packages -----
  && rm -rf /var/lib/apt/lists/*
```

#### Join nodes to swarm - retrieve the join command including the join token
```
docker swarm join-token worker                # as a worker node
docker swarm join-token manager               # as a manager node
```
## KVM
Cheatsheet:
```
virsh autostart myvm			# Enable autostart of VM
virsh autostart myvm --disable  	# Disable autostart of VM
virsh list --all --autostart		# List VMs which are masrked for autostart
