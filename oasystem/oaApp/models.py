from __future__ import unicode_literals

from django.db import models

# Create your models here.
class stu_info(models.Model):
	student_num = models.CharField(max_length=20)
	student_name = models.CharField(max_length=20)
	student_psd = models.CharField(max_length=20)
	student_sex = models.CharField(max_length=2)