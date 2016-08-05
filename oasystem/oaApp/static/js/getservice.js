angular.module("oasystem").factory('oaFactory', ['$http','$q',function($http,$q){
	var allData = [];
	return{
		getFacStu:function(){
			var deferred = $q.defer(); // 声明延后执行,监控后面的执行  
			$http.get('AllData').
				success(function(data, status, headers, config){
					deferred.resolve(data);
					allData = data;
				}).
				error(function(data, status, headers, config) {
					/* Act on the event */
					deferred.reject(data);
					console.log(status);

				});
			return deferred.promise;
		},

		addFacStu:function(add_student_num,add_student_name,add_student_sex,add_student_psd){
			var selfId=0;
			var id_list = [];
			if(allData.length==0)
				selfId = 1;
			else{
				for(var i=0;i<allData.length;i++){
					id_list.push(allData[i].id);
				}
				selfId = Math.max.apply(Math,id_list)+1;
			}
			var paramData = {
				'id':selfId,
				'student_num':add_student_num,
				'student_name':add_student_name,
				'student_sex':add_student_sex,
				'student_psd':add_student_psd
			};
			var deferred = $q.defer();
			var transform = function(data) {
                return $.param(data);
            };
			// var postCfg = {
			//     headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
			//     transformRequest: transform
			// };
	
			$http.get('AddData', {params:paramData}).
				then(function(data, status, headers, config){
					deferred.resolve(data);
					allData = data;
				},function(data){
	            	deferred.reject(data);
					console.log(status);
            	});  
            return deferred.promise;
		},
		delFacStu:function(getAllCheckedId){
			var deferred = $q.defer();
			$http.get('DeleteData',{params:getAllCheckedId}).
				then(function(data, status, headers, config){
					deferred.resolve(data);
					allData = data;
					console.log(getAllCheckedId+"删除成功");
				},function(data){
	            	deferred.reject(data);
					console.log(status);
            	});  
            return deferred.promise;
		},
		UpdateFacStu:function(num,name,sex,psd,id){
			var paramData = {
				'id':id[0],
				'student_num':num,
				'student_name':name,
				'student_sex':sex,
				'student_psd':psd
			};
			var deferred = $q.defer();
			$http.get('AddData',{params:paramData}).
				then(function(data, status, headers, config){
					deferred.resolve(data);
					allData = data;
				},function(data){
	            	deferred.reject(data);
					console.log(status);
            	});  
            return deferred.promise;
		}
	};
}]);
// function oaFactory($http,$q){
// 	var stu_list = [];
// 	var oaFactory={
// 		// addFacStu:addFacStu,
// 		getFacStu:getFacStu,
// 		// delFacStu:delFacStu,
// 		// updateFacStu:updateFacStu,
// 		// searchFacStu:searchFacStu
// 	};
	

// 	function getFacStu(){
// 		var deferred = $q.defer();
// 		$http.get('AllData').success(function(data,status){
// 			deferred.resolve(data);
// 		}).error(function(data) {
// 			/* Act on the event */
// 			deferred.reject(data);
// 			$log.error(status + ':' + data);

// 		});
// 		return deferred.promise;
// 	}

// 	// function formatData(data){
// 	// 	stu_list.splice(0,stu_list.length);
// 	// 	for(var i=0;i<data.length;i++){
// 	// 		stu_list[i] = angular.fromJson(data[i]);
// 	// 	}
// 	// }
	
// 	return oaFactory;

// }