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
```

