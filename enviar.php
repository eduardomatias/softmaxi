<?php

$nome = addslashes($_POST['nome']);
$email = addslashes($_POST['email']);
$mensagem = $nome . '<br />' . $email . '<br /><strong>' . addslashes($_POST['assunto']) . '</strong>: ' . addslashes($_POST['mensagem']);

// emails para quem será enviado o formulário
$emailenviar = "softmaxi@softmaxi.com.br";
$destino = $emailenviar;
$assunto = "Contato pelo site (www.softmaxi.com.br)";

// É necessário indicar que o formato do e-mail é html
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= 'From: ' . $nome . '<' . $email . '>';
//$headers .= "Bcc: $EmailPadrao\r\n";

$enviaremail = mail($destino, $assunto, $mensagem, $headers);
$retorno = ($enviaremail) ? : "ERRO AO TENTAR ENVIAR A MENSAGEM, TENTE NOVAMENTE!";
echo json_encode($retorno);
?>