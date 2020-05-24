from rest_framework import response, viewsets
from api_offers.models import Offer, HeadHunterOfferUser, CompanyHeadHunterOffer
from api_offers.serializers import OfferSerializer, HeadHunterOfferUserSerializer, CompanyHeadHunterOfferSerializer
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, UpdateAPIView
from rest_framework.decorators import permission_classes, authentication_classes
from api_offers.enums import OfferState

class UpdateOfferView(APIView):
    def put(self, request, pk, format=None):
        offer = Offer.objects.get(id=pk)
        state = OfferState[request.data['state']]
        offer.update_state(state.value)
        return response.Response()

class OfferView(ListCreateAPIView):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer

class HeadHunterOfferUserView(ListCreateAPIView):
    queryset = HeadHunterOfferUser.objects.all()
    serializer_class = HeadHunterOfferUserSerializer

class CompanyHeadHunterOfferView(ListCreateAPIView):
    queryset = CompanyHeadHunterOffer.objects.all()
    serializer_class = CompanyHeadHunterOfferSerializer