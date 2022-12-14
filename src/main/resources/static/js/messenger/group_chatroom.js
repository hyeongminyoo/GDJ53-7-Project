
	let ws;

	function wsOpen(){
		ws = new WebSocket("ws://" + location.host + "/chatroom");
		wsEvt();
		
		ws.onopen = onOpen; //접속
		ws.onclose = onClose; //접속해제
	}
	
	console.log("1. sessionId : ", $("#sessionId").val());

//------------------------------------
		
	function wsEvt() {
		ws.onopen = function(data){
			//소켓이 열리면 초기화 세팅하기
		}
		
		ws.onmessage = function(data) {
			let msg = data.data;
			if(msg != null && msg.trim() != ''){
				
			  let d = JSON.parse(msg);
			  if(d.type =="getId"){
				  let si =d.sessionId != null ; d.sessionId ="";
				  
				  if(si !=""){
					  $("#sessionId").val(si); 
				  }
			  }else if (d.type =="message"){
				
				console.log("d.sessionId : ", d.sessionId);
				console.log("sessionId : ", $("#sessionId").val());
				
				  //내가 보냈을 때
				  if(d.sessionId==$("#sessionId").val()){
					  $("#chating").append("<div class='me'>"
					  						+"<div class='me-bubble-flex-first'><div class='me-bubble'>" +d.msg+"</div>"
					 						+"<div class='me-count'><span>1</span></div></div></div>");	
				  
				  //남이 보냈을 때
				  }else{
						$("#chating").append("<div class = 'you'>"
												+"<div class = 'you-flex'>"
												+"<div class='you-profile'>"
												+"<div class='pic'><img src='/img/chatroom-profile.jpg' width='35px' height='35px'></div></div>"
												+"<div class='you-namebubble'><div class='you-name'><span><strong>"+d.userName+"</strong></span></div>"
												+"<div class='you-bubble-flex'><div class='you-bubble'>" +d.msg+ "</div>"
												+"<div class='you-count'><span>1<span></div></div></div></div></div>"
											);
					}
						
				}else{
					console.warn("unknown type!")
				}
			  }

		}

		document.addEventListener("keypress", function(e){
			if(e.keyCode == 13){ //enter press
				send();
			}
		});
	}

//--------------------------------------------

	function chatName(){
		let userName = $("#userName").val();
		if(userName == null || userName.trim() == ""){
			alert("사용자 이름을 입력해주세요.");
			$("#userName").focus();
		}else{
			wsOpen();
			$("#yourName").hide();
			$("#msg").show();
		}
	}

//---------------------------------------------

	function send() {
		
		let option={
				type:"message",
				sssionId:$("#sessionId").val(),
				userName:$("#userName").val(),
				msg: $("#chatting").val()
			}
		ws.send(JSON.stringify(option))
		$('#chatting').val("");
		
		console.log("seeeeeeeeee : ", sessionId);
	}
	
//---------------------------------------------

	//채팅창에서 들어왔을 때
	function onOpen(evt) {
		console.log("open event : "+evt);
		var str = userName + ": 님이 입장하셨습니다.";
		ws.send(str);
	}

	//채팅창에서 나갔을 때
	function onClose(evt) {
		console.log("close event : "+evt);
		var str = userName + ": 님이 방을 나가셨습니다.";
		ws.send(str);
	}
	












	
	