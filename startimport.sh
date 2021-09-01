#!/bin/bash
listfile=`ls x*`
for onefile in $listfile; do
  echo "start $onefile"
  php insertmongo.php $onefile
  echo "finish $onefile"
  rm $onefile
done
