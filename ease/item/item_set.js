$(document).ready(function(){
	$("#sub_weapon").siblings().hide();
	$("#buff_input").hide();
	$("#rank").next().hide();
	$("#maken").parent().next().hide();

	$("#send").on("click",function(){
		let array = {};
		array["name_jp"] = $("#name").val();
		if($("#not_for_sale").prop('checked')){
			array["not_for_sale"] = 1;
		}else{
			array["not_for_sale"] = 0;
		}
		array["base_value"] = $("#base_value").val();
		array["era"] = $("#era").val();

		array["table"] = $("#category > select").val();

		switch(array["table"]){
			case "weapon":
				array["category"]="['"+$('#sub_weapon > select').val()+"']";
				array["hand"]=$('#weapon_hand:checked').val();
				array["rank"]=$("#weapon_rank input:checked").val();
				break;
			case "shield":
				array["rank"]=$("#weapon_rank input:checked").val();
				break;
			case "armor":
				array["category"]="['"+$('#sub_armor > select').val()+"']";
				array["rank"]=$("#weapon_rank input:checked").val();
				break;
			case "ornament":
				let temp ="{";
				$("#sub_ornament input:checked").each(function(){
					temp += "'"+$(this).val()+"',";
				});
				temp = temp.slice(0,-1);
				temp += "}";
				array["ornament"] = temp;
				break;
		}
		if($("#is_buff").prop('checked')){
			if(array["table"] == "item"){
				array["how_to_use"] = $("#how_to_use").val();
				array["buff_bilong"] = $("#buff option:selected").attr("class");
			}
			array["buff"] = "{'" + $("#buff").val() + "':" + $("#number").val() +"}";
			//2つ以上ある場合があれば、それを分岐させないといけなくなるな
		}else{
			if(array["table"] == "item"){
				array["how_to_use"] = null;
				array["buff_bilong"] = null;
			}
			array["buff"] = null;
		}
		array["detail"] = $("#detail").val();
		array["func"] = null;

		console.log(array);
		//ここでajaxを使いデータを送る
		$.ajax({
			url: "./item_set.php",
			cache: false,
			timeout: 10000,
            type:'POST',
            dataType: 'json',
			data:{
				array:array
			}
		}).then(
			function(data){
				console.log(data);
				alert(data);
			},
			function(data){
				alert("error!");
			}
		);
	});

	$("#category > select").on("change",function(){
		let val=$(this).val();
		if(val == "weapon" || val== "shield" || val == "armor" || val == "ornament"){
			$("#sub_category").show();
			$("#sub_"+val).siblings().hide();
			$("#sub_"+val).show();
		}else{
			$("#sub_category").hide();
		}
	});
	$("#is_buff").on("change",function(){
		if($(this).prop("checked")){
			$("#buff_input").show();
		}else{
			$("#buff_input").hide();
		}
	});

	$("#maken").on("change",function(){
		if($(this).prop("checked")){
			$("#maken").parent().next().next().hide();
			$("#maken").parent().next().show();
		}else{
			$("#maken").parent().next().next().show();
			$("#maken").parent().next().hide();
		}
	});
	$("#rank").on("change",function(){
		if($(this).prop("checked")){
			$("#rank").next().show();
		}else{
			$("#rank").next().hide();
		}
	});

	$(".add").on("click",function(){
		console.log($(this).prev().attr("id"));
		let str = $(this).prev().attr("id");
		let index = str.lastIndexOf("_");
		let number = parseInt(str.slice(index+1));
		number++;
		str = str.substring(0,index+1);

		let clone = $(this).prev().clone(true);
		clone.id = str+number;
		clone.insertAfter($(this).prev());
	});
});