
from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("colour_pixel", views.colour_pixel, name = "colour_pixel")
]