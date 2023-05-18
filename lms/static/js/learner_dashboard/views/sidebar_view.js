/*
eslint-disable import/no-extraneous-dependencies, import/no-duplicates, import/order, import/no-self-import,
import/no-cycle, import/no-relative-packages, import/no-named-as-default, import/no-named-as-default-member,
import/named, import/no-useless-path-segments
*/
import Backbone from 'backbone';

import HtmlUtils from 'edx-ui-toolkit/js/utils/html-utils';

import NewProgramsView from './explore_new_programs_view';
import SubscriptionUpsellView from './subscription_upsell_view';

import sidebarTpl from '../../../templates/learner_dashboard/sidebar.underscore';

class SidebarView extends Backbone.View {
    constructor(options) {
        const defaults = {
            el: '.sidebar',
            events: {
                'click .js-subscription-upsell-cta ': 'trackSubscriptionUpsellCTA',
            },
        };
        // eslint-disable-next-line prefer-object-spread
        super(Object.assign({}, defaults, options));
    }

    initialize(data) {
        this.tpl = HtmlUtils.template(sidebarTpl);
        this.context = data.context;
    }

    render() {
        HtmlUtils.setHtml(this.$el, this.tpl(this.context));
        this.postRender();
    }

    postRender() {
        if (this.context.isUserB2CSubscriptionsEnabled) {
            this.subscriptionUpsellView = new SubscriptionUpsellView({
                context: this.context,
            });
        }

        this.newProgramsView = new NewProgramsView({
            context: this.context,
        });
    }

    trackSubscriptionUpsellCTA() {
        window.analytics.track(
            'edx.bi.user.subscription.program-dashboard.upsell.clicked',
        );
    }
}

export default SidebarView;
