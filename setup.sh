

cd rpi-rgb-led-matrix
make

cd ../lib
make


cd ../backend/paint
make
sudo setcap 'cap_sys_nice=eip' paint
