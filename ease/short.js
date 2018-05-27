//現在の属性という項目も必要かな
function BuffFn(){
	this.default_status = {
		DEX:0,
		AGR:0,
		STR:0,
		INT:0,
		CON:0,
		POW:0,
		HP:0,
		maxHP:0,
		MP:0,
		maxMP:0
	},
	
	this.bonus = {
		DEX:0,
		AGR:0,
		STR:0,
		INT:0,
		CON:0,
		POW:0
	},
	
	this.battle_status = {
		def:0,
		hit:0,
		c_val:0,
		avoid:0,
		magic_power:0,
		//魔力は物によって変わってくるが・・・これは全体魔力バフとして考える(すべての魔法にかかるバフ)
		exercise:0,
		//行使判定
		action:0
		//(すべての)行為判定
	},
	
	this.CON_resist = {
		all:0,
		mental_w:0,
		mental:0,
		poison:0,
		disease:0,
		curse:0
	},
	
	this.POW_resist = {
		all:0,
		mental_w:0,
		mental:0,
		poison:0,
		disease:0,
		curse:0
	},
	
	this.category_damage = {
		all:0,
		physical:0,
		shot:0,
		magic:0
	},
		
	this.attribute_damage={
		impact:0,
		slush:0
	},
		
	this.elemental_damage = {
		fire:0,
		aqua:0,
		thunder:0,
		mad:0,
		wind:0,
		pure:0
	},
	
	this.MP_consumption_reduct = {
		all:0,
		sorcerer:0,
		conjuror:0,
		faily:0,
		magitech:0,
		pleast:0,
		wizard:0,
		deamon:0
	},
		
	this.weapon_damage = {
		sword:0,
		hammer:0,
		spear:0,
		flail:0,
		warhammmer:0,
		mace:0,
		stuff:0,
		grapple:0,
		axe:0,
		linkage:0,
		throwing:0,
		gun:0,
		bow:0,
		crossbow:0
	},
		
	this.armor_def = {
		unmetal:0,
		metal:0,
		shield:0,
	}
	
	//こっから軽減
	this.category_reduce = {
		//原則として、毒病気呪いの三種は、最初から「含まない」
		//もし含む場合はそれを特殊処理に
		all:0,
		physical:0,
		all_physical:0,
		shot:0,
		magic:0,
		all_magic:0
	},
	
	this.attribute_reduce = {
		impact:0,
		slush:0
	},
	
	this.elemental_reduce = {
		fire:0,
		aqua:0,
		thunder:0,
		mad:0,
		wind:0,
		pure:0,
		poison:0,
		disease:0,
		curse:0
	},
	
	this.effect_reduce = {
		mental_w:0,
		mental:0
	},
	
	this.other_reduce = {
		falling_reduce:0
		//落下ダメージ軽減
	},
		
	this.set_up = {
		preemptive:0,
		//先制用
		
		enemy_knowledge:0,
		//魔物知識判定
	},
	//先制とﾏﾓﾁｷ
	
	//弱点用
	this.weak = {
		magic:0,
		physical:0,
		impact:0,
		slush:0,
		fire:0,
		aqua:0,
		thunder:0,
		wind:0,
		mad:0,
		pure:0,
		hit:0,
		heal:0
	},
	
	this.other = {
		move_range:0,
		//移動距離
		
		add_heal:0,
		//回復効果を受けるとき加算
		
		act_number:0,
		//行動回数
		
		dice_reduct:0,
		//超特殊で、ダイス目を減少させる効果用。ぶっちゃけクリレイ専用
	
		/*not battle*/
		booty:0,
		
		release:0,
		//解除判定用
		
		hearing:0,
		//聞き込み判定
		
		listen:0,
		//聞き耳
		
		danger:0,
		//危険感知
		
		stealth:0,
		//隠密判定
		
		jumping:0,
		//高跳び、幅跳び判定
	}
	
	this.enemy_skill=0,
	//敵の特殊能力で、達成値を入れるスペース
	//PCには無関係
		
	this.skillFn = {};
}
function Add_skillFn(){
	//一応暫定的に追加スキルということにしているが、フラグ管理を主に行う。バステは別だけど
	//抵抗やかばうフラグなども管理
	
	this.resist = {
		fire:[null,{round:0}],
		aqua:[null,{round:0}],
		thunder:[null,{round:0}],
		mad:[null,{round:0}],
		wind:[null,{round:0}],
		pure:[null,{round:0}],
		magic:[null,{round:0}],
		poison:[null,{round:0}],
		mental_w:[null,{round:0}],
		mental:[null,{round:0}],
		fall_down:[null,{round:0}],
	},
	//魔法や打撃は{category},その下の属性が{attribute}
	//atributeは複数持つ可能性がある
	//修正。炎等の属性を{elemental},斬撃などの属性を{attribute}として区別することに変更。これで同時にいても問題ない
	//無効の場合none,半減ならhalfと入っている

	this.cover = {
		cover:null,
		covered:null
	},
	//かばうかばわれるがある場合、中身はキャラクター名
	//連続でのかばうがあるため、中身は必ず配列
	//cover = {name1:3}と記載する
	//二人が同時にかばう宣言ってできるんかな
	
	
	//ほかにもいくつか残っている。
	//移動禁止や補助動作妨害系
	//バステのフラグは割と被る可能性があるため、ターン数を管理するのが難しい
	//石化フラグなんかも。いっそプロパティにインスタンスや関数を突っ込んでしまう方が早いかもしれん
	//修正　ラウンドなどの管理はバフセット側でまとめて行うため、こっちでは管理しない。毎回再インスタンス化してデータ入れ直しを行う
	
	this.continuation_heal = 0;
}
		
function bad_status(){
	this.seal ={
		//ラウンド数を値に
		sorceror:0,
			
	},
	
	this.actable = {
		all:null,
		main_act:null,
		sub_act:null,
		move:null
	},
	
	this.continuation_damage = {
		//categoryなど。配列の場合もあり
		class:null,
		//magicなど
		subclass:null,
		round:0,
		damage:0
	}
/*
	this.skillFn = {}
	//スキルとかで特別に呼ばれる関数を放り込むスペース

		
	this.dice_change = {
		fortune:false,
		//こっちはグレーテストフォーチュン用
		
		vorpal_sword:false
		//首切り刀フラグ(武器のインスタンス用かこれ)
		
		//ほかにも妖精さん用とかアレコレ
		
	}
*/
}

(function(){
	//セッティング用
	var bdb_jp = {
		DEX:"器用",
		B_DEX:"器用ボーナス",
		AGR:"敏捷",
		B_AGR:"敏捷ボーナス",
		STR:"筋力",
		B_STR:"筋力ボーナス",
		INT:"知力",
		B_INT:"知力ボーナス",
		CON:"生命",
		B_CON:"生命ボーナス",
		POW:"精神",
		B_POW:"精神ボーナス",
		DEF:"防護点",
		HP:"HP",
		maxHP:"最大HP",
		MP:"MP",
		maxMP:"最大MP",
		hit:"命中",
		avoid:"回避",
		all_damage:"ダメージ",
		physical_damage:"物理ダメージ",
		impact_damage:"衝撃属性ダメージ",
		slush_damage:"斬撃ダメージ",
		fire_damage:"炎属性ダメージ",
		aqua_damage:"水・氷属性ダメージ",
		thunder_damage:"雷属性ダメージ",
		mad_damage:"土属性ダメージ",
		wind_damage:"風属性ダメージ",
		pure_damage:"純エネルギー属性ダメージ",
		magic_damage:"魔法ダメージ",
		magic_power:"魔力",
		all_MP_consumption_reduct:"MP軽減",
		sorcerer_MP_consumption_reduct:"MP軽減・ソーサラー",
		conjuror_MP_consumption_reduct:"MP軽減・コンジャラー",
		faily_MP_consumption_reduct:"MP軽減・フェアリーテイマー",
		magitech_MP_consumption_reduct:"MP軽減・マギテック",
		clelic_MP_consumption_reduct:"MP軽減・クレリック",
	
	}

	var bdb_kind = {
		buff:"増加",
		debuff:"低下",
		reduct:"減少",
		resist:"抵抗",
		add_skill:"スキル追加",
		transform:"変身",
		heal:"回復",
		restore:"状態異常解除",
		fixed:"固定値"
	}
	//これはあくまでテーブルにない特技の分なん


	//弱点属性


}());

function key_getter(str,array){
	for(key in array){
		if(array[key] == str){
			return key;	
		}
	}
}
//探す文字とそれが含まれる配列を投げれば、キー値を返す
/*
function multiplex(array){
	//連想配列の同キーをまとめた新しい配列を返す
	//array{0}{"DEX"}=1;
	//array{1}{"DEX"}=2;
	temp_array = $.extend(true, [], array);
	temp_array_num = {};
	new_array = {};
	for(let i=0,len=array.length; i<len; i++){
		//
		temp_array_num[i] = array[i][temp_array[i]];
		if(temp_array){
			for(let j=temp_array.length-1; j>=0; j--){
				if(array[i] in temp_array[j]){
					
					temp_array_num[j] += array[j][temp_array[j]];
				}
			}
			continue;
		}
		//key値　DEXとか
		temp_array[i] = Object.keys(array[i]);
		temp_array_num[i] = array[i][temp_array[i]];
	}
	for(let i=0,len=temp_array.length; i<len; i++){
		new_array[i] = [];
		new_array[i][temp_array[i]] = temp_array_num[i];
	}
	return new_array;
}
方針を変更
バフは加えられるたびに、それぞれのアイコンを表示
それぞれのアイコンにはclassに名前を書き込んでおく。これにより常にデータの削除が可能に
属性バフは原則上書きなのですでにかかっていたら、前のバフは消える属性バフはかける際に他のバフが残ってないかをチェック
それ以外はステータスに関係するすべてをバフ適応の際に足していく
*/



