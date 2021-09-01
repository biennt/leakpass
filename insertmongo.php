<?php
system("rm -f onefile.js");
$handle = fopen($filename=$argv[1], "r");
$i=0;
$turn=0;
if ($handle) {
    while (($line = fgets($handle)) !== false) {
      $pieces = explode(":", preg_replace('~[\r\n]+~', '', $line));
      if ( $i==0 ) {
          $myfile = fopen("onefile.js", "a") or die("Unable to open file!");
          $txt="db.sha1.insertMany([ { \"hashpass\": \"" . $pieces[0] . "\", \"count\": " . $pieces[1] . " }\n";
          fwrite($myfile, $txt);
      } else {
          $myfile = fopen("onefile.js", "a") or die("Unable to open file!");
          $txt=", { \"hashpass\": \"" . $pieces[0] . "\", \"count\": " . $pieces[1] . " }\n";
          fwrite($myfile, $txt);
      }
      $i++;
      if ($i==1000) {
        $txt="])";
        fwrite($myfile, $txt);
        fclose($myfile);
        echo $turn . " \n";
        $i=0;
        system("mongo mongodb://localhost/pwd onefile.js");
        system("rm -f onefile.js");
        echo "turn =". $turn ."\n";
        $turn++;
      }
    }
    $txt="])";
    fwrite($myfile, $txt);
    fclose($myfile);
    system("mongosh mongodb://localhost/pwd onefile.js");
    system("rm -f onefile.js");

} else {
    echo "cannot open the file";
}
?>
