from django.db import models

class TaskStatus(models.Model):
    is_active = models.BooleanField(default=True)
    task_description = models.CharField(max_length=50)

    def __str__(self):
        return self.task_description

