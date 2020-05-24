from django.urls import path
from api_offers import views

urlpatterns = [
    path('offers/', views.OfferView.as_view()),
    path('offers/<int:pk>', views.UpdateOfferView.as_view()),
    path('offers/user/', views.HeadHunterOfferUserView.as_view()),
    path('offers/user/<int:pk>', views.SingleHeadHunterOfferUserView.as_view()),
    path('offers/headhunter/', views.UpdateOfferView.as_view()),
    path('offers/headhunter/<int:pk>', views.UpdateOfferView.as_view()),
]