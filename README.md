requirements:

sudo apt-get update
sudo apt-get install git
sudo apt-get install python3-pip
install django
install django-webpack-loader
install pexpect

git clone https://github.com/zcqsntr/LED_paint

to run on the webapp on the raspberry pi:
cd backend 
python3 manage.py runserver 
then open the address in your browser


to run the webapp on a local device:
python3 manage.py runserver 0.0.0.0:8000
then open your Pis IP address in a browser 





npm run dev
python3 manage.py runserver
https://dev.to/zachtylr21/how-to-serve-a-react-single-page-app-with-django-1a1l
