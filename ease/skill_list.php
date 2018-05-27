if(isset($_POST["category"])){
	require_once("./conection.php");
	$mysqli = db_connect();
	$category = $_POST["category"];
	
	$array=array();
	
	$sql="SELECT * FROM ".$category;
	$result = $mysqli -> query($sql);
	foreach($result as $row){
		foreach($row as $key => $val){
			$array[$row["name"]][$key] = $val;
		}
	}
	echo json_encode($array);
}