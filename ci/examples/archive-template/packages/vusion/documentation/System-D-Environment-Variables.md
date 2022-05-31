[**Example
10.17**](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/system_administrators_guide/chap-managing_services_with_systemd)
*Postfix.service Unit File*

```systemd
[Unit]
Description=OpenSSH server second instance daemon
After=syslog.target network.target auditd.service sshd.service

[Service]
EnvironmentFile=/etc/sysconfig/sshd
ExecStart=/usr/sbin/sshd -D -f /etc/ssh/sshd-second_config $OPTIONS
ExecReload=/bin/kill -HUP $MAINPID
KillMode=process
Restart=on-failure
RestartSec=42s

[Install]
WantedBy=multi-user.target
```

The `[Unit]` section describes the service, specifies the ordering dependencies, as well as conflicting units.
In `[Service]`, a sequence of custom scripts is specified to be executed during unit activation, on stop, and on reload.
`EnvironmentFile` points to the location where environment variables for the service are defined, `PIDFile` specifies a
stable PID for the main process of the service. Finally, the `[Install]` section lists units that depend on the service.
