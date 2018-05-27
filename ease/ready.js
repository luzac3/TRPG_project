//準備用
$(document).ready(function(){
	let category_array = [
		sorcerer,
		conjouror,
		wizard,
		priest,
		fairy,
		magitech,
		enhancer,bird,
		rider,
		alchemist,
		deamon,
		war_leader,
		mystic,
		weapon
	];
	
	//base_skillを設定
	for(let i=0,len=category_array.length; i<len; i++){
		let category = category_array[i];
	
		const base_skill = [];
		base_skill[category] = [];
		
		let array = get_data(category);
		
		let temp = null;
		
		//データベースに接続して持ってくる
		//dataというデータベースから持ってきたデータ
		//それぞれのデータだけど、連想配列で持ってこれるんかねこれ
		for(let key in array){
			for(let key2 in array[key]){
				base_skill[category][key] = new Skill_base();
				temp = base_skill[category][key];
				temp.category = category;
				
				if(key2 == "buff"){
					temp[key2] = eval(array[key][key2]);
				}else{
					temp[key2] = array[key][key2];
				}
			}
			
		}
	}
	storager.set(base_skill,"base_skill");
});
			name = data[data[i]]
			base_skill["alchemist"][name] = new skill_base();
			
			temp = base_skill["alchemist"][name];
			
			temp.name=data["name"];
			temp.category = "alchemist";
			temp.number = 1;
			temp.level = data[key]["level"];
			temp.level = data[key]["color"];
			
			temp.range = data[key]["range"];
			temp.shape = data[key]["shape"];
			temp.time = data[key]["time"];
			temp.resist = data[key]["resist"];
			temp.type = data[key]["type"];
			temp.buff = eval(data[key]["buff"]);
			temp.con_number = data[key]["con_number"];
			
			temp.fn = data[key]["func"];
			
			temp.roundFn = roundFn;
			
			temp.main_actable= data[key]["main_actable"];
			temp.sub_actable = data[key]["sub_actable"];
			temp.message = data[key]["message"];
		}
		*/
		storager.set(base_skill,"base_skill");
	}
});

function get_data(category){
	 $.ajax({
		type:"POST",
		url:"skill_list.php",
		cache:false,
		timeout: 10000,
		data:{
			category:categorys
		}
	})
	.then(function(data){
		return data;
	},
	function(){
		return false;
	});
}
		
function category(name){
	switch(name){
		case:""
	
	
	
	
	
	
	
	
	
	}

}


