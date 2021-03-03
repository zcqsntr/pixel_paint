CFLAGS=-Wall -O3 -g -Wextra -Wno-unused-parameter --std=c++17
CXX = g++
CXXFLAGS=$(CFLAGS)
OBJECTS=snake.o
BINARIES=snake

# Where our library resides. You mostly only need to change the
# RGB_LIB_DISTRIBUTION, this is where the library is checked out.
RGB_LIB_DISTRIBUTION=../../rpi-rgb-led-matrix
RGB_INCDIR=$(RGB_LIB_DISTRIBUTION)/include
RGB_LIBDIR=$(RGB_LIB_DISTRIBUTION)/lib
RGB_LIBRARY_NAME=rgbmatrix
RGB_LIBRARY=$(RGB_LIBDIR)/lib$(RGB_LIBRARY_NAME).a
LDFLAGS+=-L$(RGB_LIBDIR) -l$(RGB_LIBRARY_NAME) -lrt -lm -lpthread


MY_INCDIR = ../../lib
MY_LIB = retromatrix

LDFLAGS+= -L$(MY_INCDIR) -l$(MY_LIB) 
LDFLAGS+=-L$(RGB_LIBDIR) -l$(RGB_LIBRARY_NAME) -lrt -lm -lpthread
LDFLAGS+= -L$(EVDEV_LIBDIR) -l$(EVDEV_LIBRARY_NAME) 




all : paint



paint : paint.o  $(RGB_LIBRARY) $(EVDEV_LIBRARY)
	$(CXX) paint.o  -o $@ $(LDFLAGS) 
	
paint.o: paint.cc 
	$(CXX) -I$(MY_INCDIR) -I$(RGB_INCDIR) $(CXXFLAGS) $(LDLIBS)  -c paint.cc



clean:
	rm -f $(OBJECTS) $(BINARIES)

FORCE:
.PHONY: FORCE
