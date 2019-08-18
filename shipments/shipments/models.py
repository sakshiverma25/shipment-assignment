from django.db import models

class shipments(models.Model):
    """This class represents the bucketlist model."""
    shipmentId = models.CharField(max_length=100, blank=False, unique=True)
    date_created = models.DateTimeField(auto_now_add=True)
    shipmentName=models.CharField(max_length=255, blank=False)
    shipmentStatus=models.BooleanField(default=True)


    def __str__(self):
        """Return a human readable representation of the model instance."""
        return "{}".format(self.shipmentId)