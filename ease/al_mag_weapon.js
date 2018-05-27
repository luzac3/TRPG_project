
/*初期化の際にロードさせるけど、使うのはインスタンス化したとき*/
/*取得終わったらストレージに保存*/
/*全て並列処理*/
let skill_base = function(){
/*変数宣言*/
/*
	var alchemist = [];
	var magic = [];
	var weapon = [];
	var sield= [];
	var armor = [];
	var skill = [];
	var ability = [];
	var ornament = [];
*/

	/*インスタンスの雛形*/

	this.name = null;

	//アルケミとかなんとか
	this.category = null;

	this.number = 1;
	//基本は1回しか使えないのだが・・・複数回使える条件もある
	this.x=0;
	this.y=0;
	//起点を表す。主にエリア用だけど、攻撃でもどの範囲まで巻き込むか判定するのに使う
	//ユーザーの入力待ち項目、射撃なら狙う場所ね

	this.level = 0;
	this.color = 0;
	this.target_character = [];
	this.target_number = null;
	this.target_x = [];
	this.target_y = [];
	//射撃などで敵を狙う場合と、範囲で巻き込まれる敵の位置
	/*
	this.target_character = target.splice("_")[0];
	this.target_number = target.splice("_")[1] == "infinity" ? infinity : parseInt(target[1]);
	this.target_range = target.splice("_")[2];
	*/

	this.point = 0;
	//上と似ているが、これは狙える場所の数というか回数みたいなもの

	this.range = 0;

	this.shape = null;
	//形状。種類は別の配列にでもまとめたいよね
	//形状を引数にしたfnを呼んで、位置指定させて戻すっていう
	this.time =0;
	//持続時間。攻撃とかは一瞬だから0

	this.resist = null;
	//抵抗可否、種類

	this.type = null;
	//統一
	//atack,buff,debuff,budstatus,gird,resistance,heal,all_heal,release
	//特殊な場合はextraが入る
	//複合ならhyblid(味方バフ敵デバフ),同時ならbuff_debuffなど考えよう

	this.buff = null;

	this.attribute = null;

	this.element = null;

	this.con_number = 0;
	//何枚使うか。コンマテとかも一応書いておく

	this.MP_consumption = 0;

	//維持ラウンド数が変化する可能性があるもの。魔法とか練技とか
	//特技と宣言特技をチェックするような関数を別で作る
	this.roundFn = null;

	this.card_rank = null;
	//上昇数値とかダメージとかは全部ここに記録
	//インスタントは威力だけ記録しておけばわかるよね
	//noneが入っていたらそのランクのカードは使用できない

	var fn = null;

	this.main_actable=null;
	this.sub_actable =null;
	//主動作可能か補助動作可能か

	this.F_sub_act = false;
	//結局どっちで使ったか　trueなら補助動作で使ってるので主動作では使えない
	//これ賦術の中身で判別することなの？キャラクター行動で判別するんじゃないの

	//エリアや場所(地点)に残るバフかどうか
	//中心座標は移動するがバードなどもこれにあたる。発動時のみのバトルソングはあたらない(範囲外に出れないし外から範囲内に入れない)
	//位置座標の指定は別
	this.area = null;

	//達成値
	this.achievement_val = 0;

	this.message = null;

};
