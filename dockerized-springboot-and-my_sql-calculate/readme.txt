docker run --name mydb -e MYSQL_ROOT_PASSWORD=<password> -e MYSQL_DATABASE=<hello_world_schema> -p 3306:3306 -d mysql:latest
