<template>
    <pckg-loader v-if="!$store.state.basket.loaded"></pckg-loader>
    <div v-else class="derive-basket-summary-header">

        <router-link class="button no-shadow margin-none left nobr" :class="buttonSize" to="/basket">
            <i class="fal fa-shopping-cart"></i>
            <span class="badge badge-success">{{ totalOrdersUsers }}</span>
            <div class="hidden-xs display-inline">{{ __('basket.btn.basket') }}</div>
        </router-link>

        <div v-if="false" class="collapse multi-collapse" id="shoppingcart">

            <div class="shopping-cart"
                 style="-webkit-box-shadow: 0 11px 50px 3px rgba(0,0,0,0.2);-moz-box-shadow: 0 11px 50px 3px rgba(0,0,0,0.2);box-shadow: 0 11px 50px 3px rgba(0,0,0,0.2);">

                <div class="shopping-cart-items" style="max-height:300px;">
                    <derive-basket-order-cart v-for="(order,i) in orders" step="1" :identifier="order.id" :order="order"
                                              :key="order.id" :summary="getSummary(order)"></derive-basket-order-cart>
                </div>
                <div v-if="totalOrdersUsers > 1" class="pull-right"> {{ __('basket.summary.total') }}: {{ summary.total
                    | price }}
                </div>
            </div> <!--end shopping-cart -->
        </div> <!--end container -->

    </div>
</template>

<script>
export default {
    name: 'derive-basket-summary-header',
    mixins: [CommsHubHelpers.translations],
    props: {
        buttonSize: {
            default: 'size-s'
        }
    },
    data: function () {
        return {};
    },
    created: function() {
        this.$store.commit('prepareBasket', {isOnBasket: true, loadOrder: Pckg.basket});
    },
    methods: {
        getSummary: function (order) {
            var tempSummary = {};
            var packets = order.packets.reduce(function (value, packet) {
                return value + ((parseFloat(packet.price) * parseInt(packet.selection.quantity)) || 0.0);
            }, 0.0);
            tempSummary.packets = packets;

            var items = order.packets.reduce(function (value, packet) {
                return value + packet.items.reduce(function (value, item) {
                    return value + (parseFloat(item.pivot.value) || 0.0);
                }, 0.0);
            }, 0.0);
            tempSummary.items = items;

            tempSummary.promocode = -1 - 0.5 * parseInt(order.id);

            tempSummary.processing = 2 + 0.5 * parseInt(order.id);

            tempSummary.delivery = order.profile.setting.delivery ? 4.5 : 0.0;

            tempSummary.total = packets + items + tempSummary.promocode + tempSummary.processing + tempSummary.delivery;

            return tempSummary;
        }
    },
    computed: {
        orders: function () {
            return this.$store.state.basket.basketOrder.orders;
        },
        countProducts: function () {
            return Math.random();
            /*return this.orders.reduce(function (order) {
                return order.ordersUsers.reduce(function (ordersUser) {
                    return ordersUser.packet.selection.quantity;
                }, 0);
            }, 0);*/
        },
        summary: function () {
            if (this.orders.length == 0) {
                return {};
            }

            var summary = {};
            $.each(this.orders, function (i, order) {
                $.each(this.getSummary(order), function (key, val) {
                    summary[key] = summary[key] ? parseFloat(summary[key]) + parseFloat(val) : parseFloat(val);
                });
            }.bind(this));
            return summary;
        },
        totalOrdersUsers: function () {
            return this.$store.state.basket.basketOrder.orders.reduce(function (sum, order) {
                return sum + order.packets.reduce(function (sum, packet) {
                    return sum + parseInt(packet.selection.quantity);
                }, 0);
            }, 0);
        }
    }
}
</script>
