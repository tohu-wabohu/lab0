# Notes

## Linux

### Get Ubuntu Server 22.04 iso
```
wget https://releases.ubuntu.com/22.04.2/ubuntu-22.04.2-live-server-amd64.iso
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

## Docker
Change MTU
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
