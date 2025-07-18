from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('home',views.show_home,name= 'welcome-home'),
    path('delete-task/<int:task_id>/',views.delete_task_ajax, name ='delete-task' ),
    path('complete-task/<int:task_id>', views.complete_task_ajax, name='complete-task')
]
