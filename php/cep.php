<?php
require_once 'help.php';

if (!isset($_GET['cep'])) jsonError('cep ausente',422);
$cep = preg_replace('/\D/','', $_GET['cep']);
if (strlen($cep) !== 8) jsonError('cep inválido',422);

$url = "https://viacep.com.br/ws/{$cep}/json/";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 5);
$res = curl_exec($ch);
$err = curl_error($ch);
curl_close($ch);

if ($res === false) jsonError('Erro ao consultar ViaCEP: '.$err,500);

$data = json_decode($res, true);
if (isset($data['erro']) && $data['erro'] === true) jsonError('CEP não encontrado',404);

jsonOk(['cep'=>$cep, 'dados'=>$data]);
