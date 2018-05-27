//base用の、全く変更しないバフのインスタンスを用意する必要ありですね
//結局全インスタンスは最初に生成する必要あります
function apply(me){
//あくまで単体で使用。チェックのついたバフの名前と種別とラウンド数だけを拾ってくる
//この辺、kindをcategoryに統一したほうがよさそうな感じがするよ
	let buff_set = storager.get("buff_set");

	let whole_buff = [];
	//クラスを集めて、そのプロパティをチェックして、チェックがついてるかどうかで確認
	//これはバフを適用するときの関数に移動、こっちではない
	let check_list = $(".check");
	for (let i=0,len=check_list.length; i<len; i++){
		if(check_list[i].checked == true){
			let data = check_list[i].nextAll();
			if(check_list[i].closest("td").prev().attr("id") != all_buff || check_list[i].closest("td").prev().attr("id") != all_debuff){
				//名前
				let name = data[0].val();
				buff_set[me][name]["category"] = check_list[i].closest("td").prev().attr("id");
				if(buff[category][name]["roundFn"]){
					buff_set[me][name]["round"] = round_check(base_skill[category]["name"]);
				}else{
					buff_set[me][name]["round"] = buff[category][name]["round"];
				}

				continue;
			}

			buff_set[me]["name"] = data[0].val();
			buff_set[me]["name"]["round"] = data[?];
			whole_buff["name"] = data[0];

			whole_buff[data[0].val()] = [];

			whole_buff[data[0].val()][data[1].val()] = data[2].val();

			if(data[3].val() == ""){
				storager.set(whole_buff,"whole_buff");
				continue;
			}
			whole_buff[data[0].val()][data[3].val()] = data[4].val();

			if(data[5].val() == ""){
				storager.set(whole_buff,"whole_buff");
				continue;
			}
			whole_buff[data[0].val()][data[5].val()] = data[6].val();
			storager.set(whole_buff,"whole_buff");
		}
	}
	storager.set(buff_set,"buff_set");
}

class storager{
	Function.prototype.toJSON = Function.prototype.toString;

	static set(Obj_name,Obj){
		window.sessionStorage.setItem(Obj_name, JSON.stringify(Obj));
	}

	static get(Obj_name){
		let Obj = window.sessionStorage.getItem(Obj_name);
		let parser = function(k,v){return v.toString().indexOf('function') === 0 ? eval('('+v+')') : v};
		return JSON.parse(Obj,parser);
	}
}
