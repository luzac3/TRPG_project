$(function(){

	$('button').on('click',function(){
		let kind = this.value;
		//�G���n���T�[�Ƃ��̂�����
		
		//mySkill�Ƃ����C���X�^���X������O��
		if(this.className=='add'){
			let skillName = $('#'+kind+'_select').val();
			//�X�L���̖��O
			
			let skill = mySkill[skillName];
			//skill�̒��g�̓C���X�^���X�����ꂽ�X�L���̓��e�̂͂�
			
			let buff = "";
			for(let key in skill["buff"]){
				buff += convert(key) + skill["buff"][key] + ",";
			}
			
			let p = $("<p id='"+kind+'_buff_'+skillName+" class="+skillName+"'></p>");
			let input = $("<input type='checkbox' class='check'>�@�X�L����:"+skillName+"�@�o�t:"+buff+"</input>");
			
			$(kind+'_contents').append(p).find("p").append(input);
			//$(kind+'_contents').append(p).append(input);
		
			$("."+skillName).prop('disabled', true);
		}
		if(this.className == 'del'){
			let skillName = $('#'+kind+'_select').val();
			//�X�L���̖��O
			
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
	//�E�N���b�N����
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
	//�X�L����o�t��ނ̉p�ꁨ���{���؂�ւ���֐��B�K�v���ǂ����͂킩���

}

function caliculate_buff(){
	//�`�F�b�N���ꂽ�o�t����������AmySkill�ƏƂ炵���킹�Ă�����o�t���`�F�b�N����
	//mySkill["buff"]�̃L�[����myBuff�C���X�^���X�̃v���p�e�B���ƍ��A�f�[�^����荞��ł���
	//myDebuff����邩�ǂ����͍l����
	
	

}


//�o�t�Z�b�g�ɂ��Ă���
//�o�t�Z�b�g�͊e��ނ��ƂɁA�A�z�z��ɕ��荞��ŃC���X�^���X������
//���ڂ������ԈႤ�̂ŁA�����łȂ��Ɩʓ|
//mySkill�͂����������C���X�^���X���܂Ƃ߂ĂԂ����񂾂��́B�e�L�����N�^�[�ɌŗL
//�X�e�[�^�X�̃C���X�^���X���ǂ����邩�͔Y��ł���
//add_skill��bud_status�Abuff�Adebuff�̎l��p�ӂ��邩�A�S���܂Ƃ߂ē˂����ނ�
//�X�L���ɂ���Ă͎g�p�񐔂�����Ŕ���������̂��Ⴄ�ꍇ������A����͂ǂ����邩�˂����Ċ����B����l�����炢�������ł͂���
//�ł���ʂ��ƂɐF���炢�������������₷����˂��Ă���

//�G�N�X�g���n�̓��ꔻ��ɂ���
//DB�Ɋ֐��˂����񂾂炢���񂶂�˂��Ă������\�Ȍ��_�Ɏ��肻���Ȃ񂾂��ǂ킽��

//���͂����֐��𕶎���Ƃ��ďo�͂���V�X�e����낤�B�蓮�͊댯��

//�o�t�`�F�b�N�̍ۂɖ߂��Ă��Ă�o�t��func�v���p�e�B�ɓ����������֐��̕��������������o���Aeval�ő����s������Ă����A��

//)ex
//dispelneedle
//�Ăѕ���if(mySkill["name"]["func"]){eval(mySkill["name"]["func"]);}
//�g���i�K�ŌĂсA�K�v�Ȃ�o�t�����Z
(function(){
	//target���ǂ��擾����H
	//�I��������N�������̂ŁA���Ԃ�L�����N�^�[�̖��O�͔��ł��Ă���͂�
	let target = name;
	for(let key in target.bud_status){
		if(target.bud_status[key]["kind"] !== "enhancer" || target.bud_status[key]["kind"] !== "bird" || target.bud_status[key]["kind"] !== "alchemist" || target.bud_status[key]["kind"] !== "enemy_skill"){
			continue;
		}
		alert(target.bud_status[key]["name"]+target.bud_status[key]["kind"]);
		//���ۂɂ͑I�����ꂽ�f�[�^��񎦂��A���[�U�[����̓��͂�҂�
		//�����Ă��̊֐�����ON�C�x���g���L�ڂ��A�{�^����I�������炱�����ɏ�������Ԃ悤�ɐ݌v����͓̂���Ȃ�
	}
}());
//JS�t�@�C�����ł܂Ƃ߂Ē@�����񂾕������S�ȋC������A������Ƃ���
//���̏ꍇ��func�t���O������t���O���g�������āA���ꂼ��̃C���X�^���X��func�v���p�e�B�Ɋ֐����˂����݁A�g�p����Ƃ���if(mySkill["name"].func)�ŌĂ�




//�o�t�Z�b�g�ɂ�name���L�[�ɁA���E���h���𒆐g�ɂ����f�[�^���˂�����
//�ŁA�o�t�f�o�t�`�F�b�N������
//����̓o�t�����遨�o�t�f�o�t�`�F�b�N�����̏���
//���E���h�I�����ɋ�炤�_���[�W�Ƃ����������Ȃ�
//���E���h�������͑S�������̎�ԊJ�n��
//�s�����L�����Z�������ꍇ�A�ǂ�ȏ󋵂ł��S���N���A���ă��^�[������B�f�[�^�̓Z�b�V�����������Ă��Ă�̂ŁA�C���͊ȒP���������
//�L�����Z���́A���ۂɕ\��������e�͏���������OK�Ȃ̂ŁB�����s�����������_�ŁA���̃f�[�^���Z�b�V�����X�g���[�W�ɕۑ����邩�炻�ꂪ�����܂Ŋm��͂��Ȃ�
//�ق��̐l�ւ́A�L�����Z��������X�g���[�W�̓��e�����̂܂ܓ����邩


