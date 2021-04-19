import socket

postgres_user = "postgres"
postgres_password = "postgres"

JWT_SECRET = 'myjwtsecret'


def get_ip():
    hostname = socket.gethostname()
    ip_address = socket.gethostbyname(hostname)
    if ip_address[0:3] == '172':
        return '172.17.0.1'
    else:
        return 'localhost'
