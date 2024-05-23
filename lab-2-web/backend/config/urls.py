from django.urls import path, include

urlpatterns = [
    # Local
    path('', include('bucket.urls'))
]
