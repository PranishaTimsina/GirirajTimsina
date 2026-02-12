from django.urls import path
from . import views

urlpatterns = [
    path('submit/', views.submit_contact_form, name='submit_contact'),
    path('messages/', views.contact_messages_list, name='messages_list'),
]
