from django.shortcuts import render_to_response
import json
from oaApp.models import stu_info
from django.http import HttpResponse
from django.forms.models import model_to_dict

# Create your views here.
def start_index(request):
	return render_to_response('index.html')

stu_list = []
#all list
def OaData():
	del stu_list[:]
	stu_all_list = stu_info.objects.all()
	for var in stu_all_list:
		stu_list.append(model_to_dict(var))

def AllData(request):
	OaData()
	return HttpResponse(json.dumps(stu_list))

def AddData(request):
	id = int(request.GET.get('id'))
	print int(request.GET.get('id'))
	student_num = request.GET.get('student_num')
	student_name = request.GET.get('student_name')
	student_sex = request.GET.get('student_sex')
	student_psd = request.GET.get('student_psd')
	
	uplist = stu_info(id=id,student_num=student_num,student_name=student_name,
		student_sex=student_sex,student_psd=student_psd)
	uplist.save()
	OaData()
	return HttpResponse(json.dumps(stu_list))

def DeleteData(request):
	idlist = request.GET.dict().values()
	for val in idlist:
		stu_info.objects.get(id=val).delete()
	OaData()
	return HttpResponse(json.dumps(stu_list))