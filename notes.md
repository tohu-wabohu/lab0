# Notes

## Glusterfs

```
gluster peer probe gluster01
gluster peer status
gluster volume add-brick gluster_vol replica 3 gluster01:/gluster_vol force
gluster volume heal gluster_vol info
```
