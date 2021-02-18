from django.shortcuts import render
from django.http import JsonResponse
import json
import subprocess
import pexpect

# Create your views here.
from django.views.decorators.csrf import csrf_exempt


def index(request):
    return render(request, "paint/index.html")




print('vieiweiiewwiweie')
child = pexpect.spawn("paint/paint --led-slowdown-gpio=4")

@csrf_exempt
def colour_pixel0(request):
    
    data = json.loads(request.body)
    row = data.get("row")
    col = data.get("col")
    colour = data.get("colour")
    
    
    # convert hex to rgb    

    
    r,g,b = tuple(int(colour.lstrip('#')[i:i+2], 16) for i in (0,2,4))
    
    message = str(row) + ',' + str(col) + ',' + str(r) + ',' + str(g) + ',' + str(b)
    print(message)
    proc.stdin.flush()
    proc.stdout.flush()
    proc.stdin.write(message.encode())
    print('p')
    cppMessage = proc.stdout.readline().decode().rstrip("\n")
    print(cppMessage)
    print('l')
    return JsonResponse({"message": "Pixel changed."}, status=201)

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
    print(message)
    return JsonResponse({"message": "Pixel changed."}, status=201)




@csrf_exempt
def colour_pixel0(request):
    
    data = json.loads(request.body)
    row = data.get("row")
    col = data.get("col")
    colour = data.get("colour")
    
    
    # convert hex to rgb    

    
    r,g,b = tuple(int(colour.lstrip('#')[i:i+2], 16) for i in (0,2,4))
    
    message = str(row) + ',' + str(col) + ',' + str(r) + ',' + str(g) + ',' + str(b)
    
    completed_process = subprocess.run(["paint/paint", "--led-slowdown-gpio=4"], capture_output = True, input = message.encode(), check = True)
    print('finished')
    
    
    return JsonResponse({"message": "Pixel changed."}, status=201)
