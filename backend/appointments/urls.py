from django.urls import path
from .views import AvailableTimeSlotsView, BookAppointmentView

urlpatterns = [
    path('available/', AvailableTimeSlotsView.as_view(), name='available-timeslots'),
    path('book/', BookAppointmentView.as_view(), name='book-appointment'),
]
