from django.db.models import Manager

class OfferManager(Manager):
    def create(self, **kwargs):
        return self.model(kwargs)

class HeadHunterOfferUserManager(Manager):
    def create(self, **kwargs):
        return self.model(kwargs)

class HeadHunterOfferOfferManager(Manager):
    def create(self, **kwargs):
        return self.model(kwargs)