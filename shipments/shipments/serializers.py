# todo/serializers.py

from rest_framework import serializers
from .models import shipments


class ShipmentsSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = shipments
        fields = ('id','shipmentId', 'date_created', 'shipmentName','shipmentStatus')
        read_only_fields = ['date_created']