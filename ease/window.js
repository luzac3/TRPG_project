$(function(){

	$('button').on('click',function(){
		let kind = this.value;
		//エンハンサーとかのくくり
		
		//mySkillというインスタンスがある前提
		if(this.className=='add'){
			let skillName = $('#'+kind+'_select').val();
			//スキルの名前
			
			let skill = mySkill[skillName];
			//skillの中身はインスタンス化されたスキルの内容のはず
			
			let buff = "";
			for(let key in skill["buff"]){
				buff += convert(key) + skill["buff"][key] + ",";
			}
			
			let p = $("<p id='"+kind+'_buff_'+skillName+" class="+skillName+"'></p>");
			let input = $("<input type='checkbox' class='check'>　スキル名:"+skillName+"　バフ:"+buff+"</input>");
			
			$(kind+'_contents').append(p).find("p").append(input);
			//$(kind+'_contents').append(p).append(input);
		
			$("."+skillName).prop('disabled', true);
		}
		if(this.className == 'del'){
			let skillName = $('#'+kind+'_select').val();
			//スキルの名前
			
			let val = $(kind+'_contents p:last-child').attr("class");
			$("."+skillName).prop('disabled', false);
			val.remove();
		
		}
	});
	
	$(".closer").on("click",function(){
		let close = $(this).next();
		if(close.attr("class") == 0){
			close.hide();
			close.attr("class",1);
		}else{
			close.show();
			close.attr("class",0);
		}
	});
	
	/*
	//右クリック制御
	$(".detail").on("contextmenu",function(){
		let target;
		if($(this).prop("tagName") == "label"){
			target = $(this).attr("id");
		}else{
			target = $(this).val();
		}
		return false;
	});
	*/

}());

function convert(eng){
	//スキルやバフ種類の英語→日本語を切り替える関数。必要かどうかはわからん

}

function caliculate_buff(){
	//チェックされたバフ名を回収し、mySkillと照らし合わせてあらゆるバフをチェックする
	//mySkill["buff"]のキー名とmyBuffインスタンスのプロパティを照合、データを放り込んでいく
	//myDebuffを作るかどうかは考え中
	
	

}


//バフセットについてだが
//バフセットは各種類ごとに、連想配列に放り込んでインスタンス化する
//項目がだいぶ違うので、そうでないと面倒
//mySkillはそういったインスタンスをまとめてぶっこんだもの。各キャラクターに固有
//ステータスのインスタンスをどうするかは悩んでいる
//add_skillとbud_status、buff、debuffの四種用意するか、全部まとめて突っ込むか
//スキルによっては使用回数や条件で発動するものが違う場合があり、それはどうするかねえって感じ。それ考えたらいけそうではある
//でも種別ごとに色くらい分けた方が見やすいよねっていう

//エクストラ系の特殊判定について
//DBに関数突っ込んだらいいんじゃねっていう乱暴な結論に至りそうなんだけどわたし

//入力した関数を文字列として出力するシステム作ろう。手動は危険だ

//バフチェックの際に戻ってきてるバフのfuncプロパティに入った即時関数の文字列を引っ張り出し、evalで即実行するっていうアレ

//)ex
//dispelneedle
//呼び方はif(mySkill["name"]["func"]){eval(mySkill["name"]["func"]);}
//使う段階で呼び、必要ならバフを加算
(function(){
	//targetをどう取得する？
	//選択したら起動されるので、たぶんキャラクターの名前は飛んできているはず
	let target = name;
	for(let key in target.bud_status){
		if(target.bud_status[key]["kind"] !== "enhancer" || target.bud_status[key]["kind"] !== "bird" || target.bud_status[key]["kind"] !== "alchemist" || target.bud_status[key]["kind"] !== "enemy_skill"){
			continue;
		}
		alert(target.bud_status[key]["name"]+target.bud_status[key]["kind"]);
		//実際には選択されたデータを提示し、ユーザーからの入力を待つ
		//そしてこの関数内にONイベントを記載し、ボタンを選択したらこっちに処理が飛ぶように設計するのは難しくない
	}
}());
//JSファイル内でまとめて叩き込んだ方が安全な気がする、ちょっとだけ
//その場合はfuncフラグか特殊フラグを使うかして、それぞれのインスタンスのfuncプロパティに関数をねじ込み、使用するときはif(mySkill["name"].func)で呼ぶ




//バフセットにはnameをキーに、ラウンド数を中身にしたデータをねじ込む
//で、バフデバフチェックをする
//流れはバフかかる→バフデバフチェック→次の処理
//ラウンド終了時に喰らうダメージとかあったかなあ
//ラウンド数減少は全部自分の手番開始時
//行動をキャンセルした場合、どんな状況でも全部クリアしてリターンする。データはセッションから取ってきてるので、修復は簡単だったんな
//キャンセルは、実際に表示する内容は書き換えてOKなので。何か行動をした時点で、そのデータをセッションストレージに保存するからそれがされるまで確定はしない
//ほかの人へは、キャンセルしたらストレージの内容をそのまま投げるか


