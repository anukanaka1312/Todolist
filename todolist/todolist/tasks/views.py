from django.shortcuts import render,redirect,get_object_or_404
from . models import TaskStatus
from django.contrib import messages
from django.http import JsonResponse

# Create your views here.
def show_home(request):
    tasks = TaskStatus.objects.all()
    # print(tasks)
    # if request.method == 'GET':
    #     return render(request,'home.html',{'anu': tasks})
    if request.method == 'POST':
        added_task = request.POST.get('new_task')
        print(added_task)
        if added_task:  # Prevent saving empty tasks
            TaskStatus.objects.create(
                is_active=True,
                task_description=added_task
            ) 
            return redirect('welcome-home')
    tasks = TaskStatus.objects.all()
    return render(request, 'home.html',{'anu': tasks})


# def delete_task(request,task_id):
#     if request.method == 'POST':
#         task = get_object_or_404(TaskStatus, id = task_id)
#         task.delete()
#     return redirect('welcome-home')


def delete_task_ajax(request, task_id):
    if request.method == 'POST':
        try:
            task = TaskStatus.objects.get(id=task_id)
            task.delete()
            return JsonResponse({'status': 'success'})
        except TaskStatus.DoesNotExist:
            return JsonResponse(
                {'status': 'error', 'message': 'Task not found'},
                status=404
            )
    return JsonResponse(
        {'status': 'error', 'message': 'Invalid request'},
        status=400
    )

def complete_task_ajax(request,task_id):
    if request.method == 'POST':
        try:
            task = TaskStatus.objects.get(id = task_id)
            task.is_active = False
            task.save()
            return JsonResponse({'status': 'success'})
        except TaskStatus.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Task not found'},status=404)
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

