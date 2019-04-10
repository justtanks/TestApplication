<!-- 测试多项的列表 -->
<template>
	<view>
		<!-- 选择积分规则 -->
		 
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists:[
    {
        "value":1001,
        "label":"产量积分",
        "children":[
           
            {
                "value":10011,
                "label":"基础分",
                "fenshu":30,
                 "children":[
                    {"value":10011,
                     "label":"基础分",
                    "fenshu":30
                    }
                ]
            },
            {
              "value":10012,
                "label":"完成任务",
                "fenshu":40
            },
             {
             "value":10013,
                "label":"超额完成任务",
                "fenshu":60,
                  "children":[
                    {"value":10011,
                     "label":"基础分",
                    "fenshu":30
                    }
                ]
            }

        ]
    },
 {
        "value":110000,
        "label":"北京市",
        "children":[
            {
                "value":110117,
                "label":"平谷区"
            },
            {
                "value":110118,
                "label":"密云区"
            },
            {
                "value":110119,
                "label":"延庆区"
            }
        ]
    },
   {
        "value":1001,
        "label":"产量积分",
        "children":[
           
            {
                "value":10011,
                "label":"基础分",
                "fenshu":30,
                 "children":[
                    {"value":10011,
                     "label":"基础分",
                    "fenshu":30
                    }
                ]
            },
            {
              "value":10012,
                "label":"完成任务",
                "fenshu":40
            },
             {
             "value":10013,
                "label":"超额完成任务",
                "fenshu":60,
                  "children":[
                    {"value":10011,
                     "label":"基础分",
                    "fenshu":30
                    }
                ]
            }

        ]
    }

]
// list结尾 
			};
		}
	}
</script>

<style>

</style>
