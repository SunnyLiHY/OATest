# OATest <br/>
The practise demo of python,django,angularjs(postgreSQL)<br/>
<br/>
Django-1.9.8<br/>
python 2.7<br/>
<br/>
(使用pip下载安装Python公共资源库：pip install psycopg2，Python语言的PostgreSQL数据库接口。)<br/>
(注意设置setting.py数据库相关参数)<br/>
<br/>
/**增加分页指令组件**/<br/>
//初始化组件参数<br/>
$scope.common = {<br/>
	totalNum:14,     //数据库消息总数<br/>
	currentPage:1,	//当前页码<br/>
	pageSumNum: 5,	//页码长度<br/>
	perNum:2,    //每页默认显示消息数<br/>
	perPageNum:[2,3,4]	//切换每页显示消息数数据<br/>
};<br/>
<br/>
//异步查询数据库，指令作用域与父作用域双向数据绑定，根据数据库数据即时更新上述各参数<br/>
var promise = oaFactory.getFacStu();   //查询数据库（在getservice.js服务中实现）<br/>
promise.then(<br/>
	function(data) {<br/>
		totalNum = data.length;<br/>
		$scope.data_list = data;<br/>
		$scope.common = {<br/>
			totalNum:totalNum,<br/>
			currentPage:$scope.common.currentPage,<br/>
			pageSumNum: $scope.common.pageSumNum,<br/>
			perNum:$scope.common.perNum,<br/>
			perPageNum:$scope.common.perPageNum,<br/>
			onChange: function(){<br/>
				//根据参数截取要显示在前端的数据列表$scope.stu_list <br/>
				var start = ($scope.common.currentPage-1)*$scope.common.perNum;<br/>
				var end =  ($scope.common.currentPage-1)*$scope.common.perNum+$scope.common.perNum;<br/>
				$scope.stu_list = data.slice(start, end);<br/>
   	 		}<br/>
		};<br/>
		// $scope.stu_list = data.slice(0, $scope.common.perNum);<br/>
	},<br/>
	function(data) {<br/>
		$scope.stu_list = {<br/>
			error: 'kong'<br/>
		};<br/>
	}<br/>
);<br/>

在分页指令中会监听(使用$watch)相关参数的变量，一旦变化则更新页码表<br/>
