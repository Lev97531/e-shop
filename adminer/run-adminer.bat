docker run -d --name adminer -p 8080:8080 -v ./login-password-less.php:/var/www/html/plugins-enabled/login-password-less.php -v ../dev.db:/dev.db adminer
