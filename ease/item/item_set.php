<?php
if(!empty($_POST)){
	$array = $_POST["array"];

	require_once("../conection.php");

	$mysqli = db_connect();

	$table = $array["table"];
	unset($array["table"]);
	$sql="INSERT INTO ".$table." (";


	foreach($array as $key => $val){
		$sql .= $key.',';
	}
	unset($val);

	$sql = substr($sql, 0, -1);

	$sql .= ") VALUES (";


	foreach($array as $val){
		$sql .= '"'.$val.'"'.',';
	}

	$sql = substr($sql, 0, -1);

	$sql .= ")";
	if($mysqli->query($sql)){
		echo json_encode("s");
	}else{
		echo json_encode($sql);
	}


	$mysqli->close();

	//echo json_encode($sql);
}else{

	echo json_encode("no data");
}

?>