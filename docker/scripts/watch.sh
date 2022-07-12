# short-lived (from host) "comms-hub watch"
# long-lived (from container) "sh /var/www/watch.sh"
# long-lived (from container) "hub-watch"

webpack --config=/var/www/webpack.config.js \
--env SHARE_VENDOR=$1 \
--env SHARE_TYPE=$2 \
--env SHARE=$3 \
--env WD=$4 \
--watch
