#!/bin/bash
  gnome-terminal -x sh -c "mongod; bash" &&
  chmod +x osmconvert64 && chmod +x osmfilter32 &&
 ./osmconvert64 2018-austria-latest.osm -B=Graz.poly -o=city_graz.osm &&
 ./osmfilter32 city_graz.osm --keep="shop=* " | ./osmconvert64 - --all-to-nodes --csv="@id @lon @lat name shop addr:postcode addr:city addr:street addr:housenumber website" --csv-headline --csv-separator="," | awk -F, '$5 != "" && $4 != ""' > shops.csv &&
  sed  -e "s/\"/'/g" shops.csv > new_shops.csv &&
  mongoimport -d guide_to_graz -c locations --type csv \
  --parseGrace skipRow \
  --columnsHaveTypes \
  --fields="id.auto(),lon.double(),lat.double(),name.string(),shop.string(),postcode.string(),city.string(),street.string(),housenumber.string(),website.string()" \
  --file new_shops.csv