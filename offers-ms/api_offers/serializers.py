from rest_framework import serializers
from api_offers.models import Offer, HeadHunterOfferUser, CompanyHeadHunterOffer

class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = [ 'company_id', 'objective', 'state' ]

class HeadHunterOfferUserSerializer(serializers.ModelSerializer):
    offer = OfferSerializer(read_only=True)
    offer_id = serializers.IntegerField()
    class Meta:
        model = HeadHunterOfferUser
        fields = [ 'offer', 'offer_id', 'user_id', 'headhunter_id' ]

class CompanyHeadHunterOfferSerializer(serializers.ModelSerializer):
    offer = OfferSerializer(read_only=True)
    offer_id = serializers.IntegerField()
    class Meta:
        model = CompanyHeadHunterOffer
        fields = [ 'offer', 'offer_id', 'headhunter_id' ]
