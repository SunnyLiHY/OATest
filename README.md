# OATest
The practise demo of python,django,angularjs(postgreSQL)

Django-1.9.8
python 2.7

(ʹ��pip���ذ�װPython������Դ�⣺pip install psycopg2��Python���Ե�PostgreSQL���ݿ�ӿڡ�)
(ע������setting.py���ݿ���ز���)

/**���ӷ�ҳָ�����**/
//��ʼ���������
$scope.common = {
				totalNum:14,     //���ݿ���Ϣ����
				currentPage:1,	//��ǰҳ��
				pagesLength: 5,	//ҳ�볤��
				perNum:2,    //ÿҳĬ����ʾ��Ϣ��
				perPageNum:[2,3,4]	//�л�ÿҳ��ʾ��Ϣ������
			};

//�첽��ѯ���ݿ⣬ָ���������븸������˫�����ݰ󶨣��������ݿ����ݼ�ʱ��������������
var promise = oaFactory.getFacStu();   //��ѯ���ݿ⣨��getservice.js������ʵ�֣�
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
							//���ݲ�����ȡҪ��ʾ��ǰ�˵������б�$scope.stu_list 
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

�ڷ�ҳָ���л����(ʹ��$watch)��ز����ı�����һ���仯�����ҳ���
