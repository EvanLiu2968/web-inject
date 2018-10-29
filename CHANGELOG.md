# Change Log

## 1.0.2(2018-10-29)

Features
- 增加参数`serial`(Boolean)设置注入方式为串行或者并行，`webInject.js`默认为串行注入，其他为并行注入
- 放弃使用`blueimp-md5`生成id来标记已执行任务，以内部的任务Map来记录，新增`webInject.getFinishedTask()`获取已执行任务

Bug Fixes
- 修复注入js为数组时，没有根据数组顺序依次注入（解决js依赖问题）

## 1.0.1

Features
- 新增支持链式注入image类型

## 1.0.0

Features
- 初始版本发布，支持链式注入css、js
