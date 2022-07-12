# short-lived (from host) "comms-hub serve"
# long-lived (from container) "sh /var/www/serve.sh"
# long-lived (from container) "hub-serve"

webpack serve --host 0.0.0.0 --config=../webpack.serve.js

#webpack --config=/var/www/webpack.discover.js \
#--env SHARE_VENDOR=this \
#--env SHARE_TYPE=item \
#--env SHARE=not \
#--env WD=used
