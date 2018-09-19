<?php

  $nome = $_POST['nome'];
  $email = $_POST['email'];
  $mensagem = $nome . '<br />' . $email . '<br />' . $_POST['assunto'] . ': ' . $_POST['mensagem'];

  // emails para quem será enviado o formulário
  $emailenviar = "softmaxi@softmaxi.com.br";
  $emailenviar = "eduardomatias.1989@gmail.com";
  $destino = $emailenviar;
  $assunto = "Contato pelo Site";

  // É necessário indicar que o formato do e-mail é html
  $headers  = 'MIME-Version: 1.0' . "\r\n";
  $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
  $headers .= 'From: $nome <$email>';
  //$headers .= "Bcc: $EmailPadrao\r\n";
  
  $enviaremail = mail($destino, $assunto, $mensagem, $headers);
  var_dump($enviaremail);
  $retorno = ($enviaremail) ? : "ERRO AO TENTAR ENVIAR A MENSAGEM, TENTE NOVAMENTE!";
  echo json_encode($retorno);

?>