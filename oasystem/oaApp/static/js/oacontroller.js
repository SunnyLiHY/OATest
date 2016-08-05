angular.module("oasystem", [])
	.controller('oacontroller', ['$scope', 'oaFactory', '$http', '$window','$filter', function($scope, oaFactory, $http, $window,$filter) {
			$('.popover-show').popover('hide');
			var promise = oaFactory.getFacStu();
			promise.then(
				function(data) {
					$scope.stu_list = data;
					$scope.order = "id";
					// $scope.test=$scope.stu_list.length;
					console.log($scope.stu_list[0].student_name);
				},
				function(data) {
					$scope.stu_list = {
						error: 'kong'
					};
				}
			);

			//增加一条学生信息
			$scope.showAddStuForm = showAddStuForm;
			$scope.addOneStu = addOneStu;
			function addOneStu() {
				var promise = oaFactory.addFacStu($scope.add_student_num, $scope.add_student_name,
					$scope.add_student_sex, $scope.add_student_psd);
				promise.then(
					function(data) {
						$scope.stu_list = data;
						location.reload();
						// console.log($scope.stu_list[0].student_name);
					},
					function(data) {
						$scope.stu_list = {
							error: 'kong'
						};
					}
				);

			}

			//重置添加信息块内容
			function showAddStuForm() {
				$scope.add_student_num = "";
				$scope.add_student_name = "";
				$scope.add_student_sex = "女";
				$scope.add_student_psd = "";
			}

			$scope.searchStu = searchStu; //查询过滤
			$scope.updateOneStu = updateOneStu; //选择修改按钮
			$scope.updateStu = updateStu;

			$scope.is_check = false; //一条数据被选中的状态

			$scope.isChecked = isChecked; //获取选中id
			$scope.delStu = delStu; //删除
			var getAllCheckedId = []; //可删除多个，但是修改时长度只能为1
			var pos; //当只选中一条数据时，获取选中项在stu_list中的位置

			//获取所有选中的行数据的id值
			function isChecked(item, is_Check) {
				if (is_Check) {
					getAllCheckedId.push(item.id); //若选中，则在数组添加这个id
				} else {
					for(var i=0;i<getAllCheckedId.length;i++){
						if(getAllCheckedId[i]==item.id)
							getAllCheckedId.splice(i,1);
					}
					// getAllCheckedId.splice(getAllCheckedId.indexOf(item.id)); //若没有选中，则删除该id   
					//indexOf()方法可返回某个指定的字符串值在字符串中首次出现的位置
				}
				if (getAllCheckedId.length == 1){
					for(var i=0;i<$scope.stu_list.length;i++){
						if($scope.stu_list[i].id==getAllCheckedId[0])
							pos = i;
					}
				}
			}

			function delStu() {
				var promise = oaFactory.delFacStu(getAllCheckedId); //
				getPromiseValue(promise);
				getAllCheckedId = [];
			}

			function getPromiseValue(promise) {
				promise.then(
					function(data) {
						$scope.stu_list = data;
						location.reload();
					},
					function(data) {
						$scope.stu_list = {
							error: 'kong'
						};
					}
				);
			}

			function updateOneStu() {
				showAddStuForm();
				if (getAllCheckedId.length != 1) {
					$('.popover-show').popover('show');
					$('#UpdatemyModal').modal('hide');
				} else {
					$('.popover-show').popover('hide');
					$('#UpdatemyModal').modal('show');
					$scope.update_student_num = $scope.stu_list[pos].student_num;
					$scope.update_student_name = $scope.stu_list[pos].student_name;
					$scope.update_student_sex = $scope.stu_list[pos].student_sex;
					$scope.update_student_psd = $scope.stu_list[pos].student_psd;
				}
			}

			function updateStu(){
				var promise = oaFactory.UpdateFacStu($scope.update_student_num,$scope.update_student_name,
					$scope.update_student_sex,$scope.update_student_psd,getAllCheckedId); 
				getPromiseValue(promise);
			}

			function searchStu(){
				var copySerList = $scope.stu_list;
				copySerList = $filter('filter')(
					copySerList,
					{
						'student_num':$scope.student_num,
						'student_name':$scope.student_name
					}
				);
				$scope.stu_list = copySerList;
			}
		}

	]);