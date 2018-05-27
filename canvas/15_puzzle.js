/*
分割した画像の画像オブジェクトをクリックすると、前後左右のスペースを検索する
パネルサイズはプログラム側にはわかるので(現在のオブジェクトサイズはそりゃわからないと困る)クリックされたところから上下左右にmouse.x,mouse.yにオブジェクトのWidth,heightを足した値分移動させ、その位置で存在判定をする。
Hitしたら座標を配列でリターンし、クリックしたオブジェクトをオブジェクトサイズ分移動させる


具体的にはサイズ50，50のオブジェクトが並んでおり、右下が空いていると仮定
中央下のオブジェクト位置は50、100～100、150　その間なら反応する
クリックしたのが62、120だとすると、前後左右にWidth,heithを足した値を出して存在判定、右側は存在しないのがわかる(Hitしない)
HitしなかったらHitしなかった位置をリターン(左：1、右：2、上：3、下：4、ヒットなし：0)
この場合2がリターンする
そしたらオブジェクトの座標(50,100)に50、0を足して移動させるイベントを発生させる
また移動中はイベント自体を止める(移動中に上とかのタイルをクリックしたら何が起きるかわからん)

移動判定はそれでよい
問題はクリア判定

移動が終わるたびにAnswerCheckイベントを発火させる
オブジェクトには0～13までのナンバーを振っておく
そしてそれぞれのオブジェクト位置を判定していく

オブジェクトには名前つけられそうなので、まずはクリックしたらオブジェクトの名前をリターンするようにしてみよう
*/


$(window).on("load",function(){
  initialize();
});

function initialize(){
	var preloadImages = function(srcs){
	  if (!srcs.length) {
	    return;
	  }
	  var dfd = $.Deferred();
	  var imgs = [];
	  for (var i=0, l=srcs.length; i<l; i++) {
	    var img = new Image();
	    img.src = srcs[i];
	    imgs.push(img);
	  }
	  var check = function () {
	    for (var i=0, l=imgs.length; i<l; i++) {
	      if (imgs[i].complete !== true) {
	        setTimeout(check, 250);
	        return false;
	      }
	    }
	    dfd.resolve(imgs);
	  };
	  check();
	  return dfd.promise();
	}

	

	var arr = canvas_change();
	
	var Obj=[];

	var srcs = [];
	for(let i=1; i<=15; i++){
		srcs.push("../img/"+i+".png");
	}
	
	preloadImages(srcs).then(function(){
		for (var i=0,true_x=0; i<4; i++,true_x+=50){
			for(var k=0,true_y=0; k<4; k++,true_y+=50){
				/* Imageオブジェクトを生成 */
				var img = new Image();
				img.src = srcs[i+k];
				/*
				img.src = "panel_"+(i+k)+".gif?" + new Date().getTime();
				img.onload = function(){
					Obj[i+k] = new CanvasObj(img,true_x,true_y,50,50);
				}
				*/
				Obj[i+k] = new CanvasObj(img,true_x,true_y,50,50);
				if(i==3 && k==3){
					break;
				}
				//Obj[i+k].draw(arr[0]);
				var test = new CanvasObj(img,true_x,true_y,50,50);
				test.draw();
				Obj[i+k].draw();
			}
		}
		//ローカルストレージに配列を保存
		window.sessionStorage.setItem("panelObj", JSON.stringify(Obj));
	});
}

function canvas_change(){
	if(!window.sessionStorage.getItem("canvas_kind")){
		var old_canvas_kind = 2;
		var canvas_kind = 1;
	}else{
		var old_canvas_kind = window.sessionStorage.getItem("canvas_kind");
		//1と0の切り替え
		var canvas_kind = (2 - old_canvas_kind) + 1;
	}
	
	window.sessionStorage.setItem("canvas_kind",canvas_kind);
	
	var canvas = $("#pz_canvas"+old_canvas_kind);
	if ( ! canvas || ! canvas.getContext ) { return false; }
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, 250, 250);
	//一度完全にクリアする
	//オブジェクトが溜まっていく方式だとヤバイので一応クリアする
	
	var canvas = $("#pz_canvas"+canvas_kind);
	if ( ! canvas || ! canvas.getContext ) { return false; }
	var ctx = canvas.getContext('2d');
	var arr = {ctx,canvas_kind,old_canvas_kind};
	
	//背景を塗る
	ctx.fillStyle=rgb(0,0,0);
	ctx.drawImage(0,0,250,250);
	
	//オブジェクトと現在のキャンバス(Visible用)と過去のキャンバス(Hidden用)を送る
	return arr;
}
//→CTXを切り替える
//切り替わったCTXで全オブジェクトのDrawを実行
//Hiddenを切り替える

function CanvasObj(img,x,y,width,height){
	this.x=x;
	this.y=y;
	this.width=width;
	this.height=height;
	this.img = img;
	this.draw = function(ctx){
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}

function RectObj(x,y,width,height,r,g,b,ctx){
	this.x=x;
	this.y=y;
	this.width=width;
	this.height=height;
	this.r=r;
	this.g=g;
	this.b=b;
	
	this.draw = function(ctx){
		ctx.fillStyle=rgb(this.r, this.g, this.b);
		ctx.drawImage(this.x, this.y, this.width, this.height);
	}
}

function rewrite(Obj){
	//移動用の再描画システム
	var arr = canvas_change();
	
	for (var i=0,true_x=0; i<4; i++,true_x+=50){
		for(var k=0,true_y=0; k<4; k++,true_y+=50){
			Obj[i].draw(arr[0]);
		}
	}
	$("#pz_canvas"+arr[1]).style.visibility='visible';
	//必ず描画してから消さないと意味がない
	$("#pz_canvas"+arr[2]).style.visibility='hidden';
}



function shufle(){

	//シャッフル
	var blankObj = new RectObj(200,200,50,50,0,0,0);
	var arr = canvas_change();
	blankObj.draw(arr[0]);
	
	//目隠し用の関数なのだが、最初はデバック用に呼ばないでおこう
	//blind();
	
	var Obj = JSON.parse(window.sessionStorage.getItem(panelObj));
/**
case:0=左
case:1=上
case:2=右
case:3=下

*/
	var loop = 0;
	var zahyou = [];
	var temp = [];
	
	var Temp = function(x,y){
		this.x=x;
		this.y=y;
	}
	
	while(loop<15){
		
		/*
		考え方
		上下左右をチェック
		→枠外に出るなら無視
		→一度通った場所も無視
		Blankデータに足した、引いた値がオーバーラップしている部分は配列に入れない
		最初の位置なら上(2)か左(1)しか入らない
		*/
		var count = 0;
		//左
		if(blankObj.x -50 > 0){
			zahyou[count]={
				x:blankObj.x -50,
				y:blankObj.y,
				move:-50,
				houkou:0
			}
			count++;
		}
		//上
		if(blankObj.y + 50 < 250){
			zahyou[count]={
				x:blankObj.x,
				y:blankObj.y + 50,
				move:50,
				houkou:1
			}
			count++;
		}
		//右
		if(blankObj.x +50 > 250){
			zahyou[count]={
				x:blankObj.x + 50,
				y:blankObj.y,
				move:50,
				houkou:2
			}
			count++;
		}
		//下
		if(blankObj.y - 50 < 0){
			zahyou[count]={
				x:blankObj.x,
				y:blankObj.y - 50,
				move:-50,
				houkou:3
			}
			count++;
		}
		//一度通った場所にはいかない
		for(i=0; i>zahyou.length; i++){
			for(k=0; k>temp.length; k++){
				if(zahyou[i].x == temp[k].x && zahyou[i].y == temp[k].y){
					zahyou.splice(i, 1);
					brake;
				}
			}
		}
		
		//交換できるものが何もなければ処理を戻す
		if(zahyou.length == 0){
			return;
		}
		
		/**
		整理
		zahyou配列にはブランクオブジェクトの移動先=移動するパネルのいる場所が入る
		changeXは移動するパネルの位置X座標なので、
		*/
		
		
		//ランダムに存在する座標のどこかに移動
		var change = Math.floor( Math.random() * zahyou.length );
		var changeX = zahyou[change].x;
		var changeY = zahyou[change].y;
		//var move = zahyou[change].move/50;	//移動を見せる場合、50は移動速度(小さいほど早いテスト用だが50はクッソ早いはず)
		var move = zahyou[change].move;
		var houkou = zahyou[change].houkou;
		
		for(var i=0; i<Obj.length; i++){
			if(changeX == Obj[i].x && changeY == Obj[i].y){
				//ループ用保存
				Obj[i].x=blankObj.x;
				Obj[i].y=blankObj.y;
				//ループ使いたいのでここではブランクを入れ替えない
			
				break;
			}
		}
		
		var move_point = 50;
		
		loop(Obj,i,houkou,move_point,move);
			
		//ループごとに増えるんだからこれでいいはず
		temp[loop] = new Temp(blankObj.x,blankObj.y);
		
		blankObj.x=changeX;
		blankObj.y=changeY;
		//最後にブランクオブジェクトのオブジェクト内容を書き直して、再描画
		Obj.push(blankObj);
		rewrite(Obj);
		Obj.pop();
		
	loop++;
	}
}

window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame    ||
	window.oRequestAnimationFrame      ||
	window.msRequestAnimationFrame     ||
	function(callback){
		window.setTimeout(callback, 1000 / 60);
	};
})();
    
function loop(Obj,i,houkou,move_point,speed){

    requestAnimFrame(loop);
 
	//ループ
	if(houkou % 2 ==0){			//左右移動
		Obj[i].x += speed;
	}else{						//上下移動
		Obj[i].y += speed;
	}
	//move_pointは絶対値でガリガリ削る
	move_point -= Math.abs(move);
	
	rewrite(Obj);
}

function blind(){
	//目隠し用(これがないと移動してるのがわかってしまう)
	//いわゆる再描画システムなのだが、位置を入れ替えるという制約が発生する
	//canvasの上に描画する？
	ctx.fillStyle=rgb(0, 0, 0);
	ctx.beginPath();
	ctx.fillRect(0,0, 250, 250);
}

function game(){
	if (this.x < Obj[i].x &&
		this.x + Obj[i].width > Obj[i].x &&
		this.y < Obj[i].y &&
		this.y + this.height > Obj[i].y) {
		// hit test succeeded, handle the click event!
		return true;
	}

	function clear_hantei(){
		if(hantei()){
			clear();
		}
	}
	
	function hantei(){
		for (i=0,true_x=0; i<4; i++,true_x+=50){
		//x座標・行数を指定
			for(k=0,true_y=0; k<4; k++,true_y+=50){
			//y座標・列数を指定
				if(Obj[i+k].x != true_x || Obj[i+k].y != true_y){
					return false;
				}
			}
		}
		return true;
	}

	function clear(){
		alert("clear!");
	}
}












//完成したら次のお仕事、擬似3D化
//基本的にオブジェクトを箱と考える
//まずは変換式(xyz立体平面→xy平面)
//イメージとしては立体で描いたブロックを写真に撮り、その頂点を立体として描画するイメージ
//描画の際は立体→平面を自動で切り替え、頂点を入れて描画するシステムを使う
//テクスチャも平面の上面に貼り付け
//混乱を避けるため、ボックスはワンサイズで変更不可
//正確である必要は全くなく、ちゃんと「見えれば」OK
//またパンやズームは不要なのでどんなに上っても、どんなに奥に行っても同じ画角

//乱戦の範囲は相変わらずボックス形式だが、距離は直線計算で(1ボックスの縦横を1mと判定)
//あくまで距離の判定はボックスの中央点から開始するため、たとえば地点Aから左に2、上に3移動したとすると横2m縦3mの三角移動をしたと判定される
//もしくは完全な位置座標でもいいけど・・・できるよ？達成可能になったよこれで




