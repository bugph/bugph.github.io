function addPopup(title, msg, notClose){
	removePopup();
	$('body').css('overflow','hidden');
	var popup = $('<div class="popup"><div class="window"><div class="title">'+title+'</div><h2>'+msg+'</h2></div></div>');
	if(!notClose){
		popup.find('.window').append('<div class="buttonClose">Fechar</div>');
	}
	popup.find('.buttonClose').click(function (){
		removePopup();
	});
	$('body').append(popup);
	controllSize();
};
function removePopup(){
	$('.popup').remove();
	$('body').css('overflow','auto');
}
function controllSize(){
	if($('body').height() > $(window).height()){
		$('.popup').css('height',$('body').height());
	}
}

$('#fieldEmail').focusin(function (){
	if(this.value == "Digite seu e-mail"){
		this.value = "";
		this.style.color = "#999999";
	}
});

$('#fieldEmail').focusout(function (){
	var value = this.value.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');
	if(value == ""){
		this.value = "Digite seu e-mail";
		this.style.color = "#cecece";
	}
});

$('#contato').click(function (){
	addPopup('Contato', 'Ola, o Bugph está em fase de implementação e muito em breve estará liberado para testes, se você tiver alguma dúvida fique a vontade para entrar em contato.<br/><br/>E-mail: fabio.rogerio.sj@gmail.com <br/><br/><br/>');
});

$('.logo').click(function(){
	location.href = "/";
});

$('.buttonSend').click(function (){
	var value = $('#fieldEmail').val().replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');
	if(value == "Digite seu e-mail" || !IsEmail(value)){
		addPopup('Atenção','<br><br>Você não digitou um e-mail valido.<br><br><br><br>')
	} else {
		addPopup('Enviando...','<div class="text-center"><br><br>Estamos registrando seu e-mail em nossa base de dados!<br><br><br><image src="images/ajax-loader.gif"/></div>',true);
		$.ajax({
			url: "http://"+location.hostname+"/sendEmail.php",
			method: 'POST',
			data: {
		    	email: value
		  	},
		  	success: function( data ) {
		    	removePopup();
		    	if (data) {

		    		addPopup('Sucesso','Ufa! Não deu bug, seu e-mail foi registrado com sucesso em nossa base de dados.<br><br>Assim que for liberado a versão beta você receberá um e-mail de nossa equipe.<br><br>Até mais!');
		    		$('.inFooter h2').remove();
					$('.inFooter .inputEmail').remove();
		    	} else {
		    		addPopup('Ops!','Eita! Seu e-mail não foi registrado por algum motivo, quer dizer, por algum bug no sistema, então tente mais tarde.<br><br>Obrigado pela sua compreensão.');
		    	}
		    	
		  	}
		});
	}
});

function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}