Back [[Home]]

## Ansible
Ansible is a model-driven configuration management, multi-node deployment/orchestration, and remote task execution system. Uses SSH by default, so there is no special software has to be installed on the nodes you manage. Ansible can be extended in any language.

The name "ansible" is taken from the science fiction concept of a machine capable of instantaneous or superluminal communication.

* Ansible only needs to be installed on the machines that you use to manage your infrastructure. It does not need a client.

## Installation 
Ansible is based on python and can be installed using the python2 package manager _pip_ (pip2). Ansible is python compiled and needs python2-devel installed 
```
 sudo pip2 install ansible 
```
it can also be installed from source from github.

## Configuration 
Ansible uses server configuration files in _/etc/ansible_

## Getting Started 
* ping 
* setup - get server configuration 
* file - get or modify a file 
* copy - copy a file to the sever
* command - execute a remote command on the server 
* shell - execute command as a shell 

### Ping
The servers can be ping'd 
```
$  ansible  localhost  -u root -k -m ping 
```
You will be prompted to the SSH password: and if the the message succeeds one should see 
```
localhost | success >> {
    "changed": false,
    "ping": "pong"
}
```

* if you have SSH key set up for the remote system then then leave off the  ```-k```
* To use a specific username it can be configuring 
 * per host basis 
 * global Ansible configuration in  _/etc/ansible/ansible.cfg_ and change _[defaults]_ section. 

_An example to configure and configured username, password and ssh port_
``` 
[webservers]     
site01 ansible_ssh_user=root    
site02 ansible_ssh_user=daniel      
site01-dr ansible_ssh_host=site01.dr ansible_ssh_port=65422      
```

_An example user and private key location_
```
[production]     
site01      
site02      
db01 ansible_ssh_user=fred ansible_ssh_private_key_file=/home/fred/.ssh.id_rsa bastion    
```
 
## Get Server configuration 

This setup module connects to the configured node, gathers data about the system, and then returns those values.

```
ansible machinename -u root -k -m setup 
```
This will return a long list of information 

```
localhost | success >> {
    "ansible_facts": {
        "ansible_all_ipv4_addresses": [
            "172.17.42.1",
            "192.168.0.5"
        ],
        "ansible_all_ipv6_addresses": [
            "fe80::2677:3ff:fe52:b67c"                                                                           
        ],                                                                                                       
        "ansible_architecture": "x86_64",                                                                        
        "ansible_bios_date": "11/29/2011",                                                                       
        "ansible_bios_version": "8CET51WW (1.31 )",                                                              
        "ansible_cmdline": {                                                                                     
            "BOOT_IMAGE": "/boot/vmlinuz-3.16.7-7-desktop",                                                      
            "quiet": true,                                                                                       
            "resume": "/dev/disk/by-uuid/b513c1dc-927d-409d-9249-a81571b55dfd",                                  
            "root": "UUID=30a1f145-c23c-419a-a92c-aec2d718e250",                                                 
            "showopts": true,                                                                                    
            "splash": "silent"                                                                                   
        },                                         
etc. etc 
```
### File command/module

* file without arguments returns he file contents  
``` 
$ ansible machinename -u root -k -m file -a 'path=/etc/fstab' 
```
returns 
```
localhost | success >> {
    "changed": false,
    "gid": 0,
    "group": "root",
    "mode": "0644",
    "owner": "root",
    "path": "/etc/fstab",
    "size": 1418,
    "state": "file",
    "uid": 0
}
```

### Copy 
The *copy* module takes a file on the controller machine, copies it to the managed machine, and sets the attributes 

For example, to copy the _/etc/fstab_ file to _/tmp_ on the managed machine, you will use the following command: 
 
```
$ ansible machinename -m copy -a 'path=/tmp/fstab mode=0700 owner=root' 
```

### Command
Command that will run any arbitrary command on the managed machine.

```
 ansible localhost -m command -a 'rm -rf /tmp/testing removes=/tmp/testing' 
```

If there is no file or directory named /tmp/testing, the command output will indicate that it was skipped, as follows: 
``` 
localhost | skipped 
``` 
Otherwise, if the file did exist, it will look as follows: 
``` 
ansibletest | success | rc=0 >> 
```

### Shell 

shell module allow you to execute a command as well as  redirection, pipes, or job backgrounding. 
``` 
$ ansible machinename -m shell -a '/opt/fancyapp/bin/installer.sh > 
/var/log/fancyappinstall.log creates=/var/log/fancyappinstall.log' 
```

## Using Ansible Playbooks 
Yaml defined files are used to manage more complex and repetitive commands. The Yaml file can have the following sections 

```
hosts:
users:
vars:
tasks:
handlers:
```

## Ansible repository - Galaxy 
The ansible-galaxy can be used to retrive playbooks from the Galaxy repository
The ansible command options include 
```
ansible-galaxy [init|info|install|list|remove]
```

For example to install a playbook 
```
ansible-galaxy install alexanderjardim.tomcat
```


## Links and References 
* Example playbooks https://github.com/ansible/ansible-examples
* Official repository of playbooks https://galaxy.ansible.com/
