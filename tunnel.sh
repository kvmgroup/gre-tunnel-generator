ip tunnel add gre2 mode gre local 107.189.10.171 remote 23.88.32.19 ttl 255
ip link set gre2 up
ip addr add 192.168.169.1/30 dev gre2
ip route add 144.172.76.2/32 via 192.168.169.2

ip tunnel add gre2 mode gre local 23.88.32.19 remote 107.189.10.171 ttl 255
ip link set gre2 up
echo "100 KVM" >> /etc/iproute2/rt_tables
ip addr add 192.168.168.2/30 dev gre2
ip addr add 144.172.76.2/32 dev gre2
ip rule add from 144.172.76.2/32 lookup KVM
ip route add default via 192.168.168.1 table KVM