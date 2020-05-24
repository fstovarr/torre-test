from rest_framework import serializers
from api_offers.models import Offer, HeadHunterOfferUser, CompanyHeadHunterOffer

class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = [ 'company_id', 'objective', 'state' ]

class HeadHunterOfferUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeadHunterOfferUser
        fields = [ 'offer', 'user_id', 'headhunter_id' ]

class CompanyHeadHunterOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyHeadHunterOffer
        fields = [ 'offer', 'headhunter_id' ]
