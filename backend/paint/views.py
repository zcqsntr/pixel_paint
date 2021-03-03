from django.shortcuts import render
from django.http import JsonResponse
import json
import subprocess
import pexpect

# Create your views here.
from django.views.decorators.csrf import csrf_exempt


def index(request):
    return render(request, "paint/index.html")


"""
THIS IS WHERE YOU NEED TO ADD THE ARGUMENTS FOR YOUR SPECIFIC MATRIX, I'VE INCLUDED SOME EXAMPLES BELOW

IF YOU DON'T KNOW THE ARGUMENTS I SUGGEST READING THE RGB-RPI LIBRARY DOCUMENTATION AND PLAY AROUND WITH IT UNTIL YOU CAN GET THE DEMOS RUNNING
THEN REPLACE THE STRING BELOW WITH THE ARGUMENTS YOU HAVE TO SUPPLY TO RUN THE DEMOS, WITHOUT THE -D OBVIOUSLY
"""

# this line is for my 64x64 matrix using adafruit-hat running on a pi 4
rpi_rgb_args = "--led-cols=64 --led-rows=64 --led-gpio-mapping=adafruit-hat --led-slowdown-gpio=4"


rpi_rgb_args = "--led-cols=64 --led-rows=64 --led-gpio-mapping=adafruit-hat --led-slowdown-gpio=4"


child = pexpect.spawn("paint/paint " + rpi_rgb_args)

@csrf_exempt
def colour_pixel(request):
    
    data = json.loads(request.body)
    row = data.get("row")
    col = data.get("col")
    colour = data.get("colour")
    
    
    # convert hex to rgb    


    r,g,b = tuple(int(colour.lstrip('#')[i:i+2], 16) for i in (0,2,4))
    
    message = str(row) + ',' + str(col) + ',' + str(r) + ',' + str(g) + ',' + str(b)
    child.sendline(message)
    
    return JsonResponse({"message": "Pixel changed."}, status=201)


@csrf_exempt
def clear(request):
    child.sendline('clear')
    return JsonResponse({"message": "Cleared"}, status=201)
            
