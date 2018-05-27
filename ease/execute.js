/*
�ϐ��A�z��ꗗ
buff_set ���ׂẴo�t�̖��O�������Ă���B�L�����N�^�[�����ƂɊǗ�����Ă���
status �����̊�b�X�e�[�^�X
whole_buff �S�̂ɂ������Ă���o�t�A�Ƃ������蓮�Œǉ����ꂽ�o�t�B���X�g�ɂȂ��̂ŏ����ۑ�����K�v����

*/


//����͎��ۂ̃o�t���E���A�v�Z���ă_�C�X�𓊂���Ƃ���܂ōs���V�X�e��
//�s���J�n�{�^��������
function exectute(){
	//�o�t�̃C���X�^���X�����Ăяo���B


	let status = storager.get(name);
	//�܂��X�g���[�W����o�t���擾
	let buff_set = storager.get(name);

	//�o�t�̃��E���h�����`�F�b�N���A�K�v�Ȃ�폜����
	//�S�̃o�t���c���Ă��邩�ǂ����̃`�F�b�N���s���H�S�̃o�t�͕ʂɑ��������������ȁ���₱�����̂łЂƂ܂Ƃ߂ň������Ƃ�
	//�����Ƀo�t�̍Čv�Z���s���A�c���Ă���o�t��߂�

	let buff_set = buff_roundCheck(buff_set);

	//�o�t���C���X�^���X�����Ďg����悤�ɁB���E���h�`�F�b�N�ƈꏏ�Ɏg��
	//�Ƃ������A�C���X�^���X������Ă���f�[�^�Əƍ����ăf�[�^����荞��ł����A���ł�func�v���p�e�B��func�̎��Ԃ��Z�b�g����
	//���[�A�ł������ŃC���X�^���X���ł������C������E�E�E�ނ��낻�̕����ʓ|�Ȃ�����(��蒼���Ȃ��Ƃ����Ȃ����j
	let buff_ins = buff_instance(buff_set);

/**
//���͕s�v
	//�L�����N�^�[���𓊂��ăX�g���[�W���玩���̃o�t���E��
	let all_set = storager.get(name);

	let Buff = all_set["buff"];
	let Debuff = all_set["debuff"];
	let Add_skill = all_set["add_skill"];
	let bud_status = all_set["bud_status"];

	let status = all_set["status"];



	let buff_kind = [];
	//key��name�ɁA���g��kind��
	let buff = [];
	//�o�t�Z�b�g�͑S���C���X�^���X�����Ă����āAName�ƏƂ炵���킹��
	//�����ň�������o���ĉ��߂ĕ��荞��
	//���func�����݂���ꍇ��func���Ă�
	for(key in buff_kind){
		buff[key] = buff_set[buff_kind[key]][key];
		if(buff[key].func){
			buff[key].func();
		}
	}
*/

	let buff_adaptation = buff_adaptation(buff_set);

	//�\��
	().text(char.STR/6+char.B_STR + "(+"+buff_adaptation.STR/6+buff_adaptation.B_STR+")")
}
/**
	buff_set["alchemist"] = alchemistIns(name);



*/

function buff_set() = {
	let alchemist = {

	}

}

function buff_adaptation(buff_set){
	let buffFn = new BuffFn();
	let add_skillFn = new Add_skillFn();

	for(let key in buff_set[me]){
	//key = name
		switch(buff_set[me][key]["kind"])
			case:"buff"
				for(let key2 in buff[key]["buff"]{
				//�v����ɂ����ɉ��������Ă邩�Ƃ������ƂȂ񂾂��ǂ�
				//��������ƍl����Ɓ@{"status:["DEX":12],["DEF":2]}�Ƃ����Ă����ƁE�E�E
					for(let key3 in buff[key["buff"][key2]){
						buffFn[key2][key3] += buff[key]["buff"][key2][key3];
						//���A�C����������
						//���������̉��Ƃ��Ȃ�񂩂Ȃ��Ǝv�����ǁA���ނł������������ꍇ�������񂾂�Ȃ�
					}
				}
				break;

			case:"add_skill"
				for(let key2 in buff[key]["buff"]{
					add_skillFn[key2] = buff[key]["buff"][key2];
				}
				break;

			case:"bud_status"

				break;

			default:

				break;
	}

	//img_setter(array_set);

}

function img_setter(array){
	//�C���[�W�t�@�C���̃��[�h


}

function buff_instance(buff_set){
/*
buff_set�̒��g�m�F
buff_set[me][name]["kind"] = kind;
buff_set[me][name]["round"] = round;
*/

	let all_buff;

	let buff_ins = [];
	let kind;
	for(let key in buff_set[me]){
		all_buff = storager.get(key)
		kind = buff_set[me]["kind"];

		//�o�t�̃C���X�^���X�͂����肽���Ȃ����A����Q�Ǝ󂯓n������Ȃ��E�E�E
		//�C���X�^���X��S���X�g���[�W�ɕێ�����Ƃ���ƁA���͏����邩�����ɑS�A�b�v���Ă����āA�g���i�ɂȂ����烊���[�h����΂���
		buff_ins[key] = all_buff[kind][key];
	}
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
