
# AD Blocker
这是一个诠释屏蔽广告是多么简单的程序。如果不想用其他插件，为何不自己写一个，几行代码搞定。

比如，csdn的右下角广告：
```js
function csdn(){
	var ad = $("#layerd")
		if(ad!=undefined&&ad!=null){
			ad.hide()
	}	
}
```

