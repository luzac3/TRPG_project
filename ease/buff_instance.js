//これを毎回のチェックではなく、バフ起動時のチェックに変更する感じで
//ラウンド管理は相変わらずあっちで
function buff_instance(name){
	let category = category_check(name);
	for(let key in base_skill[category]){
		buff_ins[category][name] = $.extend(true,{}, base_skill[category][key]);

		//プロパティへの参照なので、こっちに放り込んでおいたら右側も変化するはず
		buff_temp = buff_ins[category][name];

		buff_temp.name=name;
		buff_temp.category = category;
		if(category == "alchemist"){
			//ユーザー入力によるカードランクに固定
			buff_temp.card = cardrank;
			buff_temp.buff = buff_temp[cardrank];
			if(sub.checked?){
				buff_temp.F_sub_act = true;
				buff_temp.point = 1;
				//達成値を0に固定
				buff_temp.achievement_point = 0;
			}

			if(カードランクとか補助動作とか)
			if(has_skill("連続賦術")){
				buff_temp.number = 2;
			}
			//維持時間とかの処理は厄介だ
		}

		//起点は基本一度しか保存しない(範囲判定)ため、基本的にバフを保存するここでチェックしない(発動時だから)
		//よってラウンド変化のバフの再インスタンス化ではチェックしないのだが・・・
		//よく考えてみたら、起点は保持しとかないとおかしくなるねこれ
		//バード等の起点が移動するタイプは変化させる必要があるし、ついでに保持する必要もある。名前とラウンド管理の配列に、起点の保持も入れないといけないのかこれ
		//しかも起点保持が必要なもののみなので・・・roundFnで一緒に起動させる？
		if(category == "bird"){
				buff_temp.x = my.x;
				buff_temp.y = my.y;
			}
		}

		buff_temp.range = base_skill[category][key]["range"];
		buff_temp.shape = base_skill[category][key]["shape"];
		buff_temp.time = base_skill[category][key]["time"];
		buff_temp.resist = base_skill[category][key]["resist"];
		buff_temp.type = base_skill[category][key]["type"];
		buff_temp.buff = eval(base_skill[category][key]["buff"]);
		buff_temp.con_number = base_skill[category][key]["con_number"];
		if(buff_temp.fn){
			buff_temp.fn = func_set(key);
			//いつ何をチェックするのかの配列が必要
			//たとえばクリレイならダイスを投げるときの処理を変更するため、ダメージダイスチェック処理配列に追加するというふう
		}
		//そもそもデータベースの中身が全く足りていないレンジも形状も

		buff_temp.main_actable= base_skill[category][key]["main_actable"];
		buff_temp.sub_actable = base_skill[category][key]["sub_actable"];
		buff_temp.message = base_skill[category][key]["message"];
	}
		case:"weapon"
			for(let key in weapon){

			}
			for(let key in magic){

			}
			for(let key in sield){

			}
			for(let key in armor){

			}
			for(let key in skill){

			}
			for(let key in ability){

			}
			for(let key in ornament){

			}

};

function buff_instance(){
	for(let key in alchemist){
		name = alchemist[key]["name"];
		buff_ins["alchemist"][name] = new skill_base();

		//プロパティへの参照なので、こっちに放り込んでおいたら右側も変化するはず
		buff_temp = buff_ins["alchemist"][name];

		buff_temp.name=name;
		buff_temp.category = "alchemist";
		if(has_skill("連続ふじゅつ")){
			buff_temp.number = 2;
		}
		buff_temp.level = base_skill["alchemist"][key]["level"];
		buff_temp.level = base_skill["alchemist"][key]["color"];

		buff_temp.range = base_skill["alchemist"][key]["range"];
		buff_temp.shape = base_skill["alchemist"][key]["shape"];
		buff_temp.time = base_skill["alchemist"][key]["time"];
		buff_temp.resist = base_skill["alchemist"][key]["resist"];
		buff_temp.type = base_skill["alchemist"][key]["type"];
		buff_temp.buff = eval(base_skill["alchemist"][key]["buff"]);
		buff_temp.con_number = base_skill["alchemist"][key]["con_number"];
		if(buff_temp.fn){
			buff_temp.fn = func_set(key);
		}

		buff_temp.main_actable= base_skill["alchemist"][key]["main_actable"];
		buff_temp.sub_actable = base_skill["alchemist"][key]["sub_actable"];
		buff_temp.message = base_skill["alchemist"][key]["message"];
	}
	for(let key in weapon){

	}
	for(let key in magic){

	}
	for(let key in sield){

	}
	for(let key in armor){

	}
	for(let key in skill){

	}
	for(let key in ability){

	}
	for(let key in ornament){

	}

};