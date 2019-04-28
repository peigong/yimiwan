测试号管理：https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index
  appID:wx9c1d647c2717b64e
  appsecret:526abee06e5ab3654aa12bd389f45f85
微信公众平台接口调试工具：https://mp.weixin.qq.com/debug/
微信JS-SDK说明文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
入门指引：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1472017492_58YV5
微信 JS 接口签名校验工具：https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign

请求地址：
https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx9c1d647c2717b64e&secret=526abee06e5ab3654aa12bd389f45f85
{"access_token":"20_Qg7h4gPInM1byF00xmTzL1Sxx_Bd21xhGcrpMBVjTffa9FF9WWaanv7Xcs5QRnUxZhqZ57IDcKS1k4elA_Fe3A8C1Gwbo77uqlI-2KM4Arb2naoUkQULZ825YqIw1ruCPJoyQPrwo08A5RYYYZQeAHAPQH","expires_in":7200}
返回结果:
Connection: close
Date: Sat, 20 Apr 2019 11:22:14 GMT
Content-Type: application/json; encoding=utf-8
Content-Length: 173
{
    "access_token": "20_TfnoW0AzZN01tPCQo1FsPmYw4q3QkYbViQcHTbKX7VX-V7iWV33H60iIn6btqWIpV_D4Tieq7UW2IKn91nlamH0IOLldjhlyPvKeHYAYJFj67ATO02oUF0S3jhkKUZfAGAWGL",
    "expires_in": 7200
}

获取用户列表
http请求方式: GET（请使用https协议）
https://api.weixin.qq.com/cgi-bin/user/get?access_token=20_Qg7h4gPInM1byF00xmTzL1Sxx_Bd21xhGcrpMBVjTffa9FF9WWaanv7Xcs5QRnUxZhqZ57IDcKS1k4elA_Fe3A8C1Gwbo77uqlI-2KM4Arb2naoUkQULZ825YqIw1ruCPJoyQPrwo08A5RYYYZQeAHAPQH

{"total":1,"count":1,"data":{"openid":["od6cv1Hr1ISYhtaHds7kEeTwjvPE"]},"next_openid":"od6cv1Hr1ISYhtaHds7kEeTwjvPE"}

获取用户基本信息（包括UnionID机制）
https://api.weixin.qq.com/cgi-bin/user/info?access_token=20_Qg7h4gPInM1byF00xmTzL1Sxx_Bd21xhGcrpMBVjTffa9FF9WWaanv7Xcs5QRnUxZhqZ57IDcKS1k4elA_Fe3A8C1Gwbo77uqlI-2KM4Arb2naoUkQULZ825YqIw1ruCPJoyQPrwo08A5RYYYZQeAHAPQH&openid=od6cv1Hr1ISYhtaHds7kEeTwjvPE&lang=zh_CN
{"subscribe":1,"openid":"od6cv1Hr1ISYhtaHds7kEeTwjvPE","nickname":"周培公","sex":1,"language":"zh_CN","city":"丰台","province":"北京","country":"中国","headimgurl":"http:\/\/thirdwx.qlogo.cn\/mmopen\/gQQO820rz5VGo4XICCOD12YWRMJc4xybibcn37wg4SyzQb1icCl4E6wxtKYOAsd2T9nTtRObIV26MXzFnyicrjkVA\/132","subscribe_time":1555755825,"remark":"","groupid":0,"tagid_list":[],"subscribe_scene":"ADD_SCENE_QR_CODE","qr_scene":0,"qr_scene_str":""}

{ noncestr: '31753515220764217',
  jsapi_ticket:
   'HoagFKDcsGMVCIY2vOjf9ngCsR2_Zl1NVZI-I2u92TDWti0ca0LJgToj7ilW_5ptRxglR31sm5sO_B_EPimykQ',
  timestamp: '1556449426',
  url: 'http://localhost:8080/pages/wx/flow/list.html' }
jsapi_ticket=HoagFKDcsGMVCIY2vOjf9ngCsR2_Zl1NVZI-I2u92TDWti0ca0LJgToj7ilW_5ptRxglR31sm5sO_B_EPimykQ&noncestr=31753515220764217&timestamp=1556449426&url=http://localhost:8080/pages/wx/flow/list.html
jsapi_ticket=HoagFKDcsGMVCIY2vOjf9ngCsR2_Zl1NVZI-I2u92TDWti0ca0LJgToj7ilW_5ptRxglR31sm5sO_B_EPimykQ&noncestr=31753515220764217&timestamp=1556449426&url=http://localhost:8080/pages/wx/flow/list.html
a2c325931f6d95acc5def5b6d895d9560cd33e44
a2c325931f6d95acc5def5b6d895d9560cd33e44
