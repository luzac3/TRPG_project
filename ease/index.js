$(document).ready(function(){
	$("button").on("click",function(){
		let str = $("select").val();
		location.href = "./window.html?character_name="+str;
	});
})