const form = document.getElementById("form");
const q = (id) => { return document.querySelector(`#${id}`); }

const handleForm = (e) => { 
    e.preventDefault();

    const local = q('local');
    const remote = q('remote');
    const subnet = q('subnet');
    const local_route = q('local_route_cidr');
    const remote_route = q('remote_route_cidr');
    const interface = q('interface');
    const route_name = q('route_name');
    const route_id = q('route_id');

    document.querySelector('#output').innerHTML = `# Output

# RUN THIS ON YOUR LOCAL MACHINE - THE ONE YOU WANT YOUR TRAFFIC TO FLOW FROM
ip tunnel add ${interface.value} mode gre local ${local.value} remote ${remote.value} ttl 255
ip link set ${interface.value} up
ip addr add ${local_route.value} dev ${interface.value}
ip route add ${subnet.value} via ${local_route.value.split('.')[0]}.${local_route.value.split('.')[1]}.${local_route.value.split('.')[2]}.2

# RUN THIS ON YOUR REMOTE MACHINE - THE ONE YOU WANT YOUR TRAFFIC TO FLOW TO
ip tunnel add ${interface.value} mode gre local ${remote.value} remote ${local.value} ttl 255
ip link set ${interface.value} up
echo "${route_id.value} ${route_name.value}" >> /etc/iproute2/rt_tables
ip addr add ${remote_route.value} dev ${interface.value}
ip addr add ${subnet.value} dev ${interface.value}
ip rule add from ${subnet.value} lookup ${route_name.value}
ip route add default via ${remote_route.value.split('.')[0]}.${remote_route.value.split('.')[1]}.${remote_route.value.split('.')[2]}.1 table KVM`
}

form.addEventListener('submit', handleForm);