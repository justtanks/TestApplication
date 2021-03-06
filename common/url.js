// 管理所有的url
module.exports ={
	// 登录接口
   login:"http://47.105.199.11"+'/api/app/login',
   //退出登录
   getout:"http://47.105.199.11"+'/api/app/logout',
   //获取到用户的信息
   getuserinfo:"http://47.105.199.11"+'/api/app/user/getUserInfo',
   //获取到所有管理人员的url
   getguali:"http://47.105.199.11"+'/api/app/user/getAllLeader',
   //根据积分获取到终审人列表
   getzhongshen:"http://47.105.199.11"+'/api/app/user/getAllLeaderByScore',
   //获取所有用户列表
   getalluser:"http://47.105.199.11"+'/api/app/user/getAllUser',
   //提交申请列表. 提交积分的录入申请
   inputjifen:"http://47.105.199.11"+'/api/app/score/applyScore',
   //获取到积分分类
   getfenlei:"http://47.105.199.11"+'/api/app/score/getScoreCate',
   //获取我的审批列表
   getshenpilist:"http://47.105.199.11"+'/api/app/score/getApplyList',
   //提交审批
   shenpi:"http://47.105.199.11"+'/api/app/score/doneApply',
   //我提交的审批的列表
   myshenpi:"http://47.105.199.11"+'/api/app/score/getMyApplyList',
   //获取我的积分事件
   jifenlist:"http://47.105.199.11"+'/api/app/score/getMyScoreList',
   // 获取到积分嘻嘻
   scoremsg: "http://47.105.199.11"+ '/api/app/score/getMyTask',
   
   charmsg: "http://47.105.199.11"+'/api/app/score/getMyTaskByMonth',
   //获取到首页的分数信息
   getindexcore: "http://47.105.199.11"+'/api/app/score/myScoreInfo',
   //获取到首页柱状图信息
   getindexzhu:"http://47.105.199.11"+'/api/app/score/getMyMonthBar',
   //获取到首页饼图信息
   getindexbing:"http://47.105.199.11"+'/api/app/score/getMyMonthPie',
   //获取到公告信息
   getnotice:"http://47.105.199.11"+'/api/app/user/getNotice',
   //获取到排名信息
   getpaiming:"http://47.105.199.11"+'/api/app/score/getRank',
   //修改密码
   changepass:"http://47.105.199.11"+'/api/app/user/changePassword',
   //获取到审批的详情的界面
   getshenpixiangqing: "http://47.105.199.11"+'/api/app/score/getTeamDetail',
   // 获取到所有的积分规则
   getjifenguize:"http://47.105.199.11"+"/api/app/score/getScoreRules",
   //测试使用
   ceshi:"http://47.105.199.11"+"/api/app/score/applyScoreTest",
   //获取月份列表
   getmonthtime:"http://47.105.199.11"+"/api/app/score/getMonthList"
}
