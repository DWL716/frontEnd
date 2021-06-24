# BFC 
参考：
  https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context
  https://zhuanlan.zhihu.com/p/127187654
## BFC是什么？
BFC(block formatting context)块级格式化上下文，它是页面中的一块渲染区域，并且有一套属于自己的渲染规则，它决定了元素如何对齐内容进行布局，以及与其他元素的关系和相互作用。 当涉及到可视化布局的时候，BFC提供了一个环境，HTML元素在这个环境中按照一定规则进行布局
总结：BFC是一个独立的布局环境，BFC内部的元素布局与外部互不影响

## BFC的布局规则
1. 内部的Box会在垂直方向一个接着一个地放置。
2. Box垂直方向上的距离由margin决定。属于同一个BFC的两个相邻的Box的margin会发生重叠。
3. 每个盒子的左外边框紧挨着包含块的左边框，即使浮动元素也是如此。
4. BFC的区域不会与float box重叠。
5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然。
6. 计算BFC的高度时，浮动子元素也参与计算。