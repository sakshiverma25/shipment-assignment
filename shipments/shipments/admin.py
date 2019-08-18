from django.contrib import admin
from .models import shipments # add this

class ShipmentsAdmin(admin.ModelAdmin):  # add this
  list_display = ('shipmentId','shipmentName', 'date_created', 'shipmentStatus') # add this

# Register your models here.
admin.site.register(shipments, ShipmentsAdmin) # add this