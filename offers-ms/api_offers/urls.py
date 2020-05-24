from django.urls import path
from api_offers import views

urlpatterns = [
    path('offers/', views.OfferView.as_view()),
    path('offers/<int:pk>', views.UpdateOfferView.as_view()),  # this now points to the manage view
]