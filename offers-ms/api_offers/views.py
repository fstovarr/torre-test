from rest_framework import response, viewsets
from api_offers.models import Offer, HeadHunterOfferUser, CompanyHeadHunterOffer
from api_offers.serializers import OfferSerializer, HeadHunterOfferUserSerializer, CompanyHeadHunterOfferSerializer
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, UpdateAPIView
from rest_framework.decorators import permission_classes, authentication_classes
from api_offers.enums import OfferState
from rest_framework import status

class UpdateOfferView(APIView):
    # def get(self, request, pk, format=None):
    #     offer = Offer.objects.filter(id=pk)
    #     return response.Response(OfferSerializer(offer).data)

    def put(self, request, pk, format=None):
        offer = Offer.objects.get(id=pk)
        state = OfferState[request.data['state']]
        offer.update_state(state.value)
        return response.Response()

class OfferView(ListCreateAPIView):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer

class SingleHeadHunterOfferUserView(APIView):
    def get(self, request, pk, format=None):
        offer = HeadHunterOfferUser.objects.filter(user_id=pk)
        if offer == None or offer.count() == 0:
            return response.Response({"error": "Not found"}, status=status.HTTP_400_BAD_REQUEST)
        return response.Response(HeadHunterOfferUserSerializer(offer, many=True).data)

class HeadHunterOfferUserView(ListCreateAPIView):
    queryset = HeadHunterOfferUser.objects.all()
    serializer_class = HeadHunterOfferUserSerializer

class SingleCompanyHeadHunterOfferView(APIView):
    def get(self, request, pk, format=None):
        offer = CompanyHeadHunterOffer.objects.filter(user_id=pk)
        if offer == None or offer.count() == 0:
            return response.Response({"error": "Not found"}, status=status.HTTP_400_BAD_REQUEST)
        return response.Response(CompanyHeadHunterOfferSerializer(offer, many=True).data)

class CompanyHeadHunterOfferView(ListCreateAPIView):
    queryset = CompanyHeadHunterOffer.objects.all()
    serializer_class = CompanyHeadHunterOfferSerializer