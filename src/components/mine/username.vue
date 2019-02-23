<template>
   <div :style="{top: '88px', bottom: '0px'}" class="page">
	<div class="inp">
		<input type="text" placeholder="账户名/手机号/Email"class="user" />
		<input type="password" placeholder="请输入您的密码" class="pass"/>
	</div>
	<div class="btn">
		<button type="submit">登录</button>
	</div>
	<div class="reg">
			<a href="#">立即注册</a>
			<a href="#">找回密码</a>
		</div>
		<footer>
			<div class="copyright">
				<span class="copyright">© 猫眼电影 客服电话：
				 <a  href="#">400-670-5335</a>
				</span>
			</div>
		</footer>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
	.page{
		width: 100%;
	  	height: 200px;
	  	position: absolute;
	  	background: #f5f5f5;
	  	overflow: hidden;
	  	top: 0;
	}
	.inp{
		  display: flex;
	    	flex-direction: column;
	    	input{
	    	 	display: block;
	    	width: 100%;
	    	height: 50px;
	    	font-size: 17px;
	    	line-height: 50px;
	    }
	    }
	   .btn{
	   	margin: 20px 10px;
	   	button{
	   		width: 100%;
	   		height: 50px;
	   		line-height: 50px;
	   		font-size: 20px;
	  	    background: #df2d2d;
	   		color: #fff;
	   		border: 0;
	   	}
	   }
	   .reg{
	   	display: flex;
		justify-content:space-between;
		margin: 18px 10px;
		a{
			color: #df2d2d;
		}
	}
	footer{
		margin-top: .3rem;
	    padding: 0 .2rem .4rem;
	    background-color: #f8f8f8;
	    .copyright{
	    	text-align: center;
	    	a{
			color: #df2d2d;
	    	}
	    }
	}
</style>