# ls -p *.jpeg | tr '\n' ',' >> _files.txt

ls *.jpeg *.jpg | awk -v RS='' -v OFS='","' 'NF { $1 = $1; print "\"" $0 "\"" }' > _files.txt