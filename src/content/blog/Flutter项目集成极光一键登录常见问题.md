---
title: "Flutter项目集成极光一键登录常见问题"
description: "我最近在考虑要不要将自己开发过程中碰到的问题进行记录，个人是不怎么想写这种流水账式的博客的，感觉这种文章就是给自己的网站灌水。"
pubDate: "May 24 2023"
tag: ["技术","BUG","Flutter"]
wordCount: 914 
---
我最近在考虑要不要将自己开发过程中碰到的问题进行记录，个人是不怎么想写这种流水账式的博客的，感觉这种文章就是给自己的网站灌水。对于写技术文章的排斥，也是因为写这类流水账式文章太“得心应手”，对提高自己写作水平无益，再写反而显得有些幼稚。

之所以前面矫情一番，最后还是写了，不为啥，就是发现重构博客后没几篇博客文章，页面稍显空旷，确实需要“灌水”，再一想，以后可能在遇到这些问题可以来这里查查。

言归正传，个人工作APP项目中需要用到获取本机手机号一键登录的功能，这个功能在国内APP是一个常见的功能，但是却没办法通过调用手机本机内置参数或者数据实现，只能通过三大通讯运营商获取，所以，选了在市面上比较成熟的极光一键登录服务。

开发对接过程中遇到了一些问题，下面就是对这些问题做的一些记录。

## 应用签名验证
flutter项目因为是适配多个平台，所以，打包后的apk文件经过MD5加密后的值需要和极光后台账号下的应用签名一致才能通过验证。

但是，极光在这块的说明并不多，所以，个人Flutter项目建议自己生产密钥，保证打包后的apk文件MD5值固定，然后同步修改极光后台账号那边的应用签名（个人是通过客服进行修改的），保证一致。

下面提供签名的生成命令：
```shell
# 生成签名，执行后将在项目android目录下生成key.jks文件，mypassword和文件路径替换成自己的
keytool -genkeypair -alias key -keyalg RSA -keypass mypassword -storepass mypassword -keyalg RSA -keysize 2048 -validity 3650 -keystore /Users/myusername/Develop/flutter-project/android/key.jks
```

然后在android目录下创建`key.properties`文件，内容如下：
```
storePassword=mypassword
keyPassword=mypassword
keyAlias=key
storeFile=../key.jks
```

在android/app目录下的`build.gradle`文件中进行配置：
```gradle
省略......

def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {

	keystoreProperties.load(new FileInputStream(keystorePropertiesFile))

}
  
省略......

defaultConfig {
	applicationId "you-app-id"
	manifestPlaceholders = [
		JPUSH_PKGNAME :applicationId, //填写信息时的应用包名
		JPUSH_APPKEY : "appkey", // 极光后台该应用对应的Appkey
		JPUSH_CHANNEL : "developer-default", //暂时填写默认值即可.
	]

	省略......
}

signingConfigs{
	release{
		keyAlias keystoreProperties['keyAlias']
		keyPassword keystoreProperties['keyPassword']
		storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
		storePassword keystoreProperties['storePassword']
	}

	debug{
		keyAlias keystoreProperties['keyAlias']
		keyPassword keystoreProperties['keyPassword']
		storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
		storePassword keystoreProperties['storePassword']
	}
}

buildTypes {
	release {
		//引用正式签名配置信息
		signingConfig signingConfigs.debug
		//开启混淆
		minifyEnabled true
		//开启资源压缩
		shrinkResources true
		//开启zip对齐
		zipAlignEnabled true
		//如果开启混淆,记得在混淆文件中添加混淆规则
		proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
		//so库过滤，v7足够了
		ndk {
			abiFilters "armeabi-v7a"
		}
	}
	省略......

}

省略......
```

最最关键的，你需要通过极光给的验证签名工具获取应用签名，参考[如何获取Android应用签名](https://docs.jiguang.cn/jverification/FAQ/prod_faq#%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%20Android%20%E5%BA%94%E7%94%A8%E7%AD%BE%E5%90%8D%EF%BC%9F)


