from django.urls import path
from .views import (
    AvailableTimeSlotsView, 
    BookAppointmentView,
    TimeSlotListCreateView,
    TimeSlotDetailView,
    CounselorAppointmentsView
)

urlpatterns = [
    path('available/', AvailableTimeSlotsView.as_view(), name='available-timeslots'),
    path('book/', BookAppointmentView.as_view(), name='book-appointment'),
    path('timeslots/', TimeSlotListCreateView.as_view(), name='timeslots-list-create'),
    path('timeslots/<int:pk>/', TimeSlotDetailView.as_view(), name='timeslots-detail'),
    path('counselor/', CounselorAppointmentsView.as_view(), name='counselor-appointments'),
]
