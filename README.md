# OATest
The practise demo of python,django,angularjs(postgreSQL)

Django-1.9.8
python 2.7

(使用pip下载安装Python公共资源库：pip install psycopg2，Python语言的PostgreSQL数据库接口。)
(注意设置setting.py数据库相关参数)

/**增加分页指令组件**/
//初始化组件参数
$scope.common = {
				totalNum:14,     //数据库消息总数
				currentPage:1,	//当前页码
				pagesLength: 5,	//页码长度
				perNum:2,    //每页默认显示消息数
				perPageNum:[2,3,4]	//切换每页显示消息数数据
			};

//异步查询数据库，指令作用域与父作用域双向数据绑定，根据数据库数据即时更新上述各参数
var promise = oaFactory.getFacStu();   //查询数据库（在getservice.js服务中实现）
promise.then(
	function(data) {
		totalNum = data.length;
		$scope.data_list = data;
		$scope.common = {
			totalNum:totalNum,
			currentPage:$scope.common.currentPage,
			pagesLength: $scope.common.pagesLength,
			perNum:$scope.common.perNum,
			perPageNum:$scope.common.perPageNum,
			onChange: function(){
				//根据参数截取要显示在前端的数据列表$scope.stu_list 
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

在分页指令中会监听(使用$watch)相关参数的变量，一旦变化则更新页码表
