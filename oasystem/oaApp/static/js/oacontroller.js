/******************************** 控制器
**** admin :Sunny
**** create time:2016/8/5
********************************/
testapp
	.controller('oacontroller', ['$scope', 'oaFactory', '$http', '$window', '$filter', function($scope, oaFactory, $http, $window, $filter) {
			$('.popover-show').popover('hide');
			$('.popover-delete').popover('hide');

			//在异步动态获取data之前，事先初始化common（指令的commonConfig属性）
			//angular监听totalNum，perNum,currentPage。即总信息数，每页显示的消息数，当前页，
			//发生变化时，调用getPageList函数，刷新页码列表（注意：不能仅仅监听当前页，因为totalNum，perNum发生变化时，可能当前页不变
			$scope.common = {
				totalNum:14,
				currentPage:1,
				pagesLength: 5,
				perNum:2,
				perPageNum:[2,3,4]
			};

			$scope.data_list = [];
			var promise = oaFactory.getFacStu();
			promise.then(
				function(data) {
					// $scope.order = "id";
					totalNum = data.length;
					$scope.data_list = data;
					$scope.common = {
						totalNum:totalNum,
						currentPage:$scope.common.currentPage,
						pagesLength: $scope.common.pagesLength,
						perNum:$scope.common.perNum,
						perPageNum:$scope.common.perPageNum,
						onChange: function(){
							var start = ($scope.common.currentPage-1)*$scope.common.perNum;
							var end =  ($scope.common.currentPage-1)*$scope.common.perNum+$scope.common.perNum;
							$scope.stu_list = data.slice(start, end);
           		 		}
					};
					// $scope.stu_list = data.slice(0, $scope.common.perNum);
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
				getPromiseValue(promise);

			}

			//重置添加信息块内容
			function showAddStuForm() {
				$scope.add_student_num = "";
				$scope.add_student_name = "";
				$scope.add_student_sex = "男";
				$scope.add_student_psd = "";
			}

			$scope.searchStu = searchStu; //查询过滤
			$scope.updateOneStu = updateOneStu; //选择修改按钮
			// $scope.updateStu = updateStu;

			$scope.is_check = false; //一条数据被选中的状态

			$scope.isChecked = isChecked; //获取选中id
			$scope.delStu = delStu; //删除
			var getAllCheckedId = []; //可删除多个，但是修改时长度只能为1
			var idPosition; //当只选中一条数据时，获取选中项在stu_list中的位置

			//获取所有选中的行数据的id值
			function isChecked(item, is_Check) {
				if (is_Check) {
					getAllCheckedId.push(item.id); //若选中，则在数组添加这个id
				} else {
					for (var i = 0; i < getAllCheckedId.length; i++) {
						if (getAllCheckedId[i] == item.id)
							getAllCheckedId.splice(i, 1); //若没有选中，则删除该id   
					}
					//indexOf()方法可返回某个指定的"字符串"值在字符串中首次出现的位置
				}

				//选中一个时，获取在data_list中被选中项的索引
				if (getAllCheckedId.length == 1) {
					for (var i = 0; i < $scope.data_list.length; i++) {
						if ($scope.data_list[i].id == getAllCheckedId[0])
							idPosition = i;
					}
				}
			}

			function delStu() {
				if (getAllCheckedId.length == 0)
					$('.popover-delete').popover();
				else {
					$('.popover-delete').popover('hide');
					var promise = oaFactory.delFacStu(getAllCheckedId); //
					getPromiseValue(promise);
					getAllCheckedId = [];
				}

			}

			function getPromiseValue(promise) {
				promise.then(
					function(data) {
						$scope.stu_list = data.slice(0,$scope.common.perNum);
						location.replace('#list');
					},
					function(data) {
						$scope.stu_list = {
							error: 'kong'
						};
					}
				);
			}

			//修改时，dialog显示被选中项的初始值
			function updateOneStu() {
				showAddStuForm();
				if (getAllCheckedId.length != 1) {
					$('.popover-show').popover();
					return false;
				} else {
					$('.popover-show').popover('hide');
					$('#user_edit').attr('href', '#list/update/' + idPosition);
					return true;
				}
			}

			function searchStu(){
				var promise = oaFactory.searchFacStu($scope.student_num,$scope.student_name);
				promise.then(
				function(data) {
					$scope.stu_list = data;
					console.log();
				},
				function(data) {
					$scope.stu_list = {
						error: 'kong'
					};
				}
			);
			}
		}

	]);

testapp
	.controller('oaupcontroller', function($scope, oaFactory, $http, $routeParams) {
		var idpos = $routeParams.idpos;
		var promise = oaFactory.getFacStu();
		promise.then(
			function(data) {
				$scope.data_list = data;
				$scope.update_student_num = $scope.data_list[idpos].student_num;
				$scope.update_student_name = $scope.data_list[idpos].student_name;
				$scope.update_student_sex = $scope.data_list[idpos].student_sex;
				$scope.update_student_psd = $scope.data_list[idpos].student_psd;
			},
			function(data) {
				$scope.stu_list = {
					error: 'kong'
				};
			}
		);
		$scope.updateStu = updateStu;

		function updateStu() {
			var promise = oaFactory.UpdateFacStu($scope.update_student_num, $scope.update_student_name,
				$scope.update_student_sex, $scope.update_student_psd, $scope.data_list[idpos].id);
			getPromiseValue(promise);
		}

		function getPromiseValue(promise) {
			promise.then(
				function(data) {
					$scope.stu_list = data;
					location.replace('#list');
				},
				function(data) {
					$scope.stu_list = {
						error: 'kong'
					};
				}
			);
		}

	});

