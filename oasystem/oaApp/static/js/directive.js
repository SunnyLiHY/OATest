/******************************** 分页指令
**** admin :Sunny
**** createon:2016/8/9
********************************/
testapp.filter('sexFilter', function() {
	return function(input) {
		if (input == 0)
			return '男'
		else
			return '女';
	}
});

testapp.directive('anypage', function() {
	return {
		restrict: 'AE',
		replace: true,
		scope: {
			commonConfig: '=',
			tag:'='
		},
		template: '<div class="list">'+'<p>{{commonConfig.currentPage}}<p>'+
			'<ul class = "pagination" >'+
				'<li ng-class="{disabled:commonConfig.currentPage==1}" ng-click="firstPage()"> <span>首页</span></li>'+
				'<li ng-class="{disabled:commonConfig.currentPage==1}" ng-click="prePage()"> <span>&laquo; </span></li>'+
				'<li ng-repeat="item in pageList" ng-class = "{active:item==commonConfig.currentPage}" ng-click="toThisPage(item)">'+
					'<span ng-bind="item"> </span> '+
				'</li>'+ 
				'<li ng-class="{disabled:commonConfig.currentPage==commonConfig.totalPage}" ng-click="nextPage()"> <span>&raquo; </span></li>'+
				'<li ng-class="{disabled:commonConfig.currentPage==commonConfig.totalPage}" ng-click="endPage()"> <span>尾页</span></li>'+
			'</ul>'+ 
			'<div class = "topage" ng-show="commonConfig.totalNum>0">'+
				'每页 <select ng-model="commonConfig.perNum" ng-options="option for option in commonConfig.perPageNum" ng-change="toPerPageNum()"> </select> / 共 <strong ng-bind="commonConfig.totalNum"></strong>条 '+
				' 跳转到<input ng-model="changeCurrentPage" ng-keyup="changeToCurrentPage($event)"/>页/ 共 <strong ng-bind="commonConfig.totalPage"></strong>页'+
			'</div> '+
			'<div class = "no-items" ng-show = "commonConfig.totalNum<=0">空</div>'+ 
		'</div>',
		link: function(scope, element, attrs) {
			//currentPage页码放置在中间
			//判断页码长度的奇偶性
			/******************************** 变量说明
			**** pagesLength:页码长度
			**** pageList:页码列表
			**** totalPage:总页码数
			**** currentPage:当前页
			**** totalNum:数据库信息总数
			**** perNum:每页显示的信息数
			**** perPageNum:切换perNum
			********************************/

			/******************************** 方法说明
			**** getPageList():获取分页块的列表
			**** firstPage():首页
			**** prePage():上一页
			**** toThisPage():在pageList列表随机到点击的当前页
			**** nextPage():下一页
			**** endPage():尾页
			**** toPerPageNum():切换每页显示的消息数
			**** changeToCurrentPage():跳转到某页.使用ng-keyup
			***********keycode = window.event ? e.keyCode :e.which;keycode为13，即表示回车事件
			********************************/
            scope.commonConfig.pagesLength = parseInt(scope.commonConfig.pagesLength) ? parseInt(scope.commonConfig.pagesLength) : 5 ;
            if(scope.commonConfig.pagesLength % 2 === 0){
                scope.commonConfig.pagesLength = scope.commonConfig.pagesLength -1;
            }

			function getPageList(newValue, oldValue){
				scope.pageList = [];
				scope.commonConfig.totalPage=Math.ceil(scope.commonConfig.totalNum/scope.commonConfig.perNum);

				if(scope.commonConfig.totalPage>0&&scope.commonConfig.currentPage>scope.commonConfig.totalPage){
					scope.commonConfig.currentPage = scope.commonConfig.totalPage;
				}

				if(scope.commonConfig.pagesLength>=scope.commonConfig.totalPage){
					for(i =1; i <= scope.commonConfig.totalPage; i++){
						scope.pageList.push(i);
					}
				}else{
					//currentPage页码放置在中间 (每次pageList只显示五条页码)
					//当前页小于页码长度中间值
					if(scope.commonConfig.currentPage<=(scope.commonConfig.pagesLength+1)/2){
						for(i =1; i <= scope.commonConfig.pagesLength; i++){
							scope.pageList.push(i);
						}
					//当前页大于（总页码数-页码长度中间值）
					}else if(scope.commonConfig.currentPage>=(scope.commonConfig.totalPage-((scope.commonConfig.pagesLength-1)/2))){
						for(i =scope.commonConfig.totalPage-scope.commonConfig.pagesLength+1; i <= scope.commonConfig.totalPage; i++){
							scope.pageList.push(i);
						}
					//当前页介于两者之间
					}else{
						for(i=scope.commonConfig.currentPage-(scope.commonConfig.pagesLength-1)/2;i<=scope.commonConfig.currentPage+(scope.commonConfig.pagesLength-1)/2;i++){
							scope.pageList.push(i);
						}
					}
				}
				if(scope.commonConfig.onChange){                    
                        // 防止初始化两次请求问题
                    if(!(oldValue != newValue && oldValue[0] == 0)) {
                        scope.commonConfig.onChange();
                    }
                        
                }
                scope.$parent.commonConfig = scope.commonConfig;


			}

			scope.firstPage = function(){
				scope.commonConfig.currentPage = 1;
			};

			scope.prePage = function(){
				scope.commonConfig.currentPage -= 1;
			};

			scope.toThisPage = function(item){
				scope.commonConfig.currentPage = item;
				// getPageList();
				// if(scope.commonConfig.onChange){
				// 	scope.commonConfig.onChange();
				// }
			};

			scope.nextPage = function(){
				if(scope.commonConfig.currentPage<scope.commonConfig.totalPage){
					scope.commonConfig.currentPage += 1;
				}
			};

			scope.endPage = function(){
				scope.commonConfig.currentPage = scope.commonConfig.totalPage;
			};

			scope.toPerPageNum = function(){
				scope.commonConfig.currentPage = 1;
			};

			scope.changeToCurrentPage = function(e){
				var keycode = window.event ? e.keyCode :e.which;
                
                if(keycode == 13) {
                    var current_page = parseInt(scope.changeCurrentPage);
                    if(current_page>=scope.commonConfig.totalPage)
                    	scope.commonConfig.currentPage = scope.commonConfig.totalPage;
                    else if(current_page<=1)
                    	scope.commonConfig.currentPage = 1;
                    else
                    	scope.commonConfig.currentPage = current_page;

                    console.log(scope.commonConfig.currentPage);
                }
			}

			scope.$watch(function() {                    

	            if(scope.commonConfig.totalNum==undefined) {
	                scope.commonConfig.totalNum = 0;
	            }
	            var newValue = scope.commonConfig.totalNum + ' ' +  scope.commonConfig.currentPage + ' ' + scope.commonConfig.perNum;               
	            return newValue;       
            }, getPageList);	
		
		},

	};
});



