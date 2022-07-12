# short-lived (from host) "comms-hub preview"
# long-lived (from container) "sh /var/www/preview.sh"
# long-lived (from container) "hub-build"

webpack serve --host 0.0.0.0 --config=../webpack.discover.js

#webpack --config=/var/www/webpack.discover.js \
#--env SHARE_VENDOR=this \
#--env SHARE_TYPE=item \
#--env SHARE=not \
#--env WD=used
