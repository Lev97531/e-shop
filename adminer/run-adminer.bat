docker run -d --name adminer -u root -p 8080:8080 -v ./login-password-less.php:/var/www/html/plugins-enabled/login-password-less.php -v ../data.db:/data.db adminer
