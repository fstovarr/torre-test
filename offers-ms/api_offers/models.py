from django.db import models
from django.db.models.signals import pre_save
from django.utils import timezone
from functools import reduce
from django.contrib.auth.models import AbstractBaseUser
from django.utils.functional import cached_property
from api_offers.enums import OfferState

class Offer(models.Model):
    company_id = models.CharField(max_length=30)
    objective = models.CharField(max_length=100)
    state = models.IntegerField(default=0, choices=[(tag, tag.value) for tag in OfferState])

    def update_state(self, state):
        self.state = state
        self.save()

    @cached_property
    def get_name(self):
        return (self.objective) % "%s"

class HeadHunterOfferUser(models.Model):
    offer = models.ForeignKey(Offer, on_delete=models.CASCADE, related_name='headhunter_offer')
    user_id = models.CharField(max_length=30)
    headhunter_id = models.IntegerField()

class CompanyHeadHunterOffer(models.Model):
    offer = models.ForeignKey(Offer, on_delete=models.CASCADE, related_name='user_offer')
    headhunter_id = models.IntegerField()
    company_id = models.IntegerField()