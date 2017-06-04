#!/bin/bash
# function: it can watch local network.

function ipArray() {
	local_wan_ip=192.168.40.249
	local_gw_server=192.168.40.1
	local_gw_link_fw=192.168.203.2
	local_fw_server=192.168.203.3
	local_conre_route=192.168.203.1
}

function pingCmd(){
	ip=$1
	package=$2
	ping $ip -c $package
}


function main(){
	ipArray
	for ip in $local_wan_ip $local_gw_server $local_gw_link_fw $local_fw_server $local_conre_route;do
		echo "###################################################################"
		pingCmd $ip 4
		echo 
		echo 
		echo
	done
}

main
