.. _nginx:


Nginx configuration
===================

Virtual hosting
---------------

To provide web access to schooltool using the Nginx web server as a proxy, add this to
``nginx.conf``::

      upstream school1 {
        server 127.0.0.1:7080;
      }
      server {
        listen       80;
        server_name  school1.example.org;
        location / {
          proxy_pass http://school1/++vh++http:school1.example.org:80/++/;
        }
        location /schooltool.task_results/ {
          proxy_pass http://127.0.0.1:7080/schooltool.task_results/;
        }
      }

