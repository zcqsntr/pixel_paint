from django.shortcuts import render
from django.http import JsonResponse
import json
# Create your views here.
from django.views.decorators.csrf import csrf_exempt

def index(request):
    return render(request, "paint/index.html")

@csrf_exempt
def colour_pixel(request):
    data = json.loads(request.body)
    index = data.get("index")
    colour = data.get("colour")
    print(index, colour)
    return JsonResponse({"message": "Pixel changed."}, status=201)
