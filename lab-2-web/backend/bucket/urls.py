from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import sort_view
from .viewsets import ArrayAdapterViewSet


router = DefaultRouter()
router.register(r"arrays", ArrayAdapterViewSet, basename="array")

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/sort/", sort_view, name="sort_view"),
]
