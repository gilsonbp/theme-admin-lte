
$(document).ready(function() {
    $(".my-colorpicker").colorpicker();
});
/*
 * TODO
    // Charts
    $.jqplot.config.enablePlugins = true;
   
	// Forms / FIXME
	$('fieldset').addClass('ui-widget-content ui-corner-all');
	$('legend').addClass('ui-widget-header ui-corner-all');
	$('label').addClass('ui-widget ui-corner-all');

    // Wizard - "next" button triggered by hitting enter button
    $("#theme_wizard_nav_next").keyup(function(event){
        if (event.keyCode == 13) {
            $("#wizard_nav_next").click();
        }
    });

    $("#theme_wizard_nav_previous").keyup(function(event){
        if (event.keyCode == 13) {
            $("#wizard_nav_previous").click();
        }
    });
*/

function theme_clearos_dialog_close(obj)
{
    obj.close();
}

function theme_clearos_dialog_box(id, title, message, options)
{
    var modal_dialog = new BootstrapDialog({
        type: BootstrapDialog.TYPE_WARNING,
        title: title,
        buttons: [{
            label: lang_close,
            action: function(my_dialog) {
                if (typeof options != 'undefined' && options.reload_on_close)
                    window.location.reload();
                else if (typeof options != 'undefined' && options.redirect_on_close)
                    window.location = options.redirect_on_close;
                else
                    my_dialog.close();
            }
        }],
        message: message
    });
    modal_dialog.open();
    return modal_dialog;
}

function theme_clearos_info_box(type, title, message, options)
{
    if (type === 'critical') {
        box_class = 'alert-danger';
        icon_class = 'fa fa-times-circle';
    } else if (type === 'warning') {
        box_class = 'alert-warning';
        icon_class = 'fa fa-exclamation-triangle';
    } else {
        box_class = 'alert-success';
        icon_class = 'fa fa-check-circle';
    }

    id = (options != undefined && options.id != undefined) ? ' id="' . options.id + '"' : '';

    return ' \
        <div class="theme-infobox alert ' + box_class + '"' + id + '> \
            <i class="' + icon_class + '"></i> \
            <strong style="padding-right: 10px;">' + title + '</strong>' + message + ' \
        </div> \
    ';
}

function theme_clearos_progress_bar(value, options)
{

    id = (options != undefined && options.id != undefined) ? ' id="' . options.id + '"' : '';

    return ' \
        <div class="progress sm " ' + id + '>\
            <div class="progress-bar progress-bar-primary sm" role="progressbar" valuenow="' + value + '" aria-valuemin="0" aria-valuemax="100" style="width:' + value + '%">\
                <span class="sr-only">' + value + '%</span>\
            </div>\
        </div>\
    ';
}

function theme_clearos_set_progress_bar(id, value, options)
{
    $('#' + id).css('width', value + '%').attr('aria-valuenow', value);
}

function theme_get_app_logo(domid, data)
{
    $('#' + domid).html($.base64.decode(data.base64));
}

function theme_paginate(url, total, active)
{
    var html = '';
    var offset = 0;
    var max = 5;
    if (active > (max / 2))
        offset = Math.floor(active - Math.floor(total / (max / 2)));
    if (active > offset + max)
        offset = total - max + 1;
    else if (total <= active + max / 2)
        offset = total - max + 1;

    if (offset < 0)
        offset = 0;

    if (total < max)
        max = total;

    for (i = offset; i < max + offset; i++) { 
        html += '<a href="' + url + '/' + i + '" class="btn ' + (i == active ? 'btn-primary' : 'btn-secondary') + ' btn-sm">' + i + '</a>';
    }
    return html;
}

function theme_sdn_account_setup(landing_url, username, device_id) {

    return '\
        <div id="sdn-account-setup-dialog" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true"> \
          <div class="modal-dialog"> \
            <div class="modal-content"> \
              <div class="modal-header"> \
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> \
                <h4>' + lang_marketplace_sdn_account_setup + '</h4> \
              </div> \
              <div class="modal-body"> \
                <div id="sdn_marketplace_setup_dialog" title="lang_marketplace_sdn_account_setup">\
                   <p>\
                   ' + lang_marketplace_sdn_account_setup_help_1 + '\
                   </p>\
                   <p>\
                   ' + lang_marketplace_sdn_account_setup_help_2 + '\
                   </p>\
                </div>\
              </div>\
              <div class="modal-footer">\
                <div class="btn-group">\
                  <a href="' + landing_url + '?username=' + username + '&device_id=' + device_id + '" target="_blank" class="btn btn-sm btn-primary theme-anchor-edit">' + lang_marketplace_setup_payment_on_clear + '</a>\
                  <a href="#" id="account-setup-cancel" class="btn btn-sm btn-link theme-anchor-cancel">' + lang_cancel + '</a>\
                </div>\
              </div>\
            </div>\
          </div>\
        </div>\
        <script type="text/javascript">\
            $("#account-setup-cancel").click(function (e) {\
                e.preventDefault();\
                $("#sdn-account-setup-dialog").modal("hide");\
            });\
            $("#sdn-account-setup-dialog").on("hidden.bs.modal", function () {\
                window.location = "/app/marketplace";\
            });\
        </script>\
    ';
}

function theme_app(type, list, options)
{
    disable_buttons = '';
    learn_more_target = '';
    if (options.mode == 'feature' || options.mode == 'qsf') {
        disable_buttons = ' disabled';
        learn_more_target = ' target="_blank"';
    }

    for (index = 0 ; index < list.length; index++) {
        app = list[index];

        box_class = 'box-primary';

        // TODO - type 
        html = '\
            <div class="box ' + box_class + ' marketplace-app" id="box-' + app.basename + '">\
                <div class="box-header">\
                    <h3 class="box-title" stye="float: left;">' + app.name + '</h3>\
                    <div id="active-select-' + app.basename + '" class="' + (app.incart ? '' : 'theme-hidden ') + 'marketplace-selected"><i class="fa fa-check-square-o"></i></div>\
                </div>\
                ' + (app.installed ? '<span class="marketplace-installed">' + lang_installed.toUpperCase() + '</span>' : '') + '\
                <div class="box-body">\
                    <div class="marketplace-app-info">\
                        <div class="marketplace-app-lhs">\
                            <div class="marketplace-app-info-icon">\
                                <div class="box box-solid">\
                                    <div class="theme-app-logo-container">\
                                        <div id="app-logo-' + app.basename + '" class="theme-app-logo box-body theme-placeholder">\
                                            ' + get_placeholder("svg") + '\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                            <div style="clear: both;"></div>\
                            <div class="marketplace-app-info-rating">' + theme_star_rating(app.rating) + '</div>\
                            <div class="marketplace-app-info-price">' + theme_price(UNIT, app.pricing) + '</div>\
                        </div>\
                        <div class="marketplace-app-rhs">\
                            <div class="marketplace-app-info-description">\
                                <p>' + app.description.replace(/(\r\n|\n|\r)/g, '</p><p>') + '</p>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="marketplace-app-info-more"><a href="/app/marketplace/view/' + app.basename + '"' + learn_more_target + '>' + lang_marketplace_learn_more + '</a></div>\
                </div>\
                <div class="box-footer">\
                    <div style="float: right;">' +
                    (app.installed
                        ? '<div class="btn-group">' +
                        '<a href="/app/' + app.basename + '" class="btn btn-primary btn-sm' + disable_buttons + '">' + lang_configure + '</a>' +
                        '<a href="/app/marketplace/uninstall/' + app.basename + '" class="btn btn-secondary btn-sm' + disable_buttons + '">' + lang_uninstall + '</a>' +
                        '</div>'
                        : '<input type="submit" name="install" value="' + (app.incart ? lang_marketplace_remove : lang_marketplace_select_for_install) + '" id="' + app.basename + '" class="btn btn-primary btn-sm marketplace-app-event" data-appname="' + app.name + '"/>' +
                        '<input type="checkbox" name="cart" id="select-' + app.basename + '" class="theme-hidden"' + (app.incart ? ' CHECKED' : '') + '/>'
                    ) + '\
                    </div>\
                    <div style="clear: both;"></div>\
                </div>\
            </div>\
            ' + (index % 2 ? '<div style="clear: both;"></div>' : '') + '\
        ';
        if (options.optional_apps)
            $('#optional-apps').append(html);
        else
            $('#marketplace-app-container').append(html);
    }

    $('#marketplace-app-container').append('\
        <div style="clear: both;"></div>\
        <script type="text/javascript">\
            $(".marketplace-app-info-description").dotdotdot({\
                ellipsis: "..."\
            });\
        </script>\
    ');
}

function theme_related_app(type, list)
{
    for (index = 0 ; index < list.length; index++) {
        app = list[index];
        box_class = 'box-primary';

        if (type == 'complimentary')
            box_class = 'box-primary';
        else if (type == 'other_by_devel')
            box_class = 'box-warning';
        html = '\
            <div class="box ' + box_class + ' marketplace-related-app" id="box-' + app.basename + '">\
                <div class="box-header">\
                    <h3 class="box-title">' + app.name + '</h3>\
                </div>\
                <div class="box-body">\
                    <div class="marketplace-app-info">\
                        <div class="marketplace-app-lhs">\
                            <div class="marketplace-app-info-icon">\
                                <div class="theme-app-logo-container">\
                                    <div  id="app-logo-' + app.basename + '" class="theme-app-logo box-body theme-placeholder">\
                                        ' + get_placeholder("svg") + '\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="marketplace-app-info-rating">' + theme_star_rating(app.rating) + '</div>\
                        </div>\
                        <div class="marketplace-app-rhs">\
                            <div class="marketplace-app-info-description">\
                                <p>' + app.description.replace(/(\r\n|\n|\r)/g, '</p><p>') + '</p>\
                            </div>\
                        </div>\
                        <div style="clear: both;"></div>\
                    </div>\
                </div>\
                <div class="box-footer">\
                    <div class="marketplace-app-info-more"><a href="/app/marketplace/view/' + app.basename + '">' + lang_marketplace_learn_more + '</a></div>\
                </div>\
            </div>\
        ';
        $('#app_' + type).append(html);
    }
    // Make sure only to call this 'dotdotdot' once
    if (type == 'other_by_devel') {
        $('#app_' + type).append('\
            <script type="text/javascript">\
                $(".marketplace-app-info-description").dotdotdot({\
                    ellipsis: "..."\
                });\
            </script>\
        ');
    }
}

function theme_clearos_on_page_ready(my_location)
{
    get_marketplace_data(my_location.basename);

    // Insert login dialog
    // TODO find a proper dom to hitch this to
    $('.right-side').append(' \
        <div id="sdn-login-dialog" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true"> \
          <div class="modal-dialog"> \
            <div class="modal-content"> \
              <div class="modal-header"> \
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> \
                <h4>' + sdn_org + ' ' + lang_sdn_authentication_required + '</h4> \
              </div> \
              <div class="modal-body"> \
                <p>' + lang_sdn_authentication_required_help + '</p> \
                <form class="form-horizontal theme-form" role="form"> \
                  <div class="form-group"><label class="col-md-4 control-label" for="sdn_usernme">' + lang_username + '</label> \
                    <div class="col-md-8"><select id="sdn_username" class="form-control"></select></div> \
                  </div> \
                  <div id="sdn_password_group" class="form-group"> \
                    <label class="col-md-4 control-label" for="sdn_password">' + lang_password + '</label> \
                    <div class="col-md-8"> \
                      <input id="sdn_password" type="password" name="password" value="" class="form-control" /> \
                      <a href="#" id="sdn_forgot_password" class="btn btn-sm btn-link">' + lang_forgot_password + '</a> \
                    </div> \
                  </div> \
                  <div id="sdn_lost_password_group" class="form-group theme-hidden"> \
                    <label class="col-md-4 control-label" for="sdn_password">' + lang_sdn_email + '</label> \
                    <div class="col-md-8"> \
                      <input id="sdn_email" type="text" name="sdn_email" value="" class="form-control autofocus" /> \
                    </div> \
                  </div> \
                  <div id="sdn-login-dialog-message-bar"></div> \
                </form> \
              </div> \
              <div class="modal-footer"> \
                <div class="btn-group"> \
                  <a href="#" id="sdn_login_action" class="btn btn-sm btn-primary theme-anchor-edit">' + lang_login + '</a> \
                  <a id="sdn_login_cancel" href="#" class="btn btn-sm btn-link theme-anchor-cancel">' + lang_cancel + '</a> \
                </div> \
              </div> \
            </div> \
          </div> \
        </div> \
    ');

    $('#sdn_login_action').on('click', function () {
        auth_options.reload_after_auth = false;
        auth_options.action_type = 'login';

        if ($('#sdn_lost_password_group').is(':visible'))
            auth_options.action_type = 'lost_password';
        clearos_is_authenticated();
    });

    $('#sdn_login_cancel').on('click', function (e) {
        $('#sdn-login-dialog').modal('hide');
    });

    $('#sdn_forgot_password').click(function (e) {
        e.preventDefault();
        $('#sdn-login-dialog-message-bar').html('');
        $('#sdn_password_group').hide();
        $('#sdn_lost_password_group').show();
        $('.autofocus').focus();
        $('#sdn_login_action').text($('#sdn_login_action').text() == lang_login ? lang_reset_password_and_send : lang_login);
    });

    $('input#sdn_password').keyup(function(event) {
        if (event.keyCode == 13) {
            auth_options.action_type = 'login';
            clearos_is_authenticated();
        }
    });

    $('input#sdn_email').keyup(function(event) {
        if (event.keyCode == 13) {
            auth_options.action_type = 'lost_password';
            clearos_is_authenticated();
        }
    });
}

function theme_rating_review(basename, id, title, comment, rating, pseudonym, timestamp, agree, disagree) {
    return '\
        <div class="theme-review">\
          <div>\
            <div class="theme-review-reviewer">' + pseudonym + '</div>\
            <div class="theme-review-rating">' + theme_star_rating(rating) + '</div>\
          </div>\
          <div style="clear: both;"</div>\
          <div>\
            <div class="theme-review-title">\
                <span class="theme-review-title-highlight">' + title + '</span>' + (comment != null ? comment.substr(title.length) : '') + '\
            </div>\
            <div class="theme-review-mod agree">\
                <a href="#" id="' + basename + '-' + id + '-up" class="btn btn-sm btn-primary review-action">\
                    <span id="agree_' + id + '">' + agree + '</span> <i class="fa fa-thumbs-up"></i>\
                </a>\
            </div>\
            <div class="theme-review-mod disagree">\
                <a href="#" id="' + basename + '-' + id + '-dn" class="btn btn-sm btn-primary review-action">\
                    <span id="disagree_' + id + '">' + disagree + '</span> <i class="fa fa-thumbs-down"></i>\
                </a>\
            </div>\
          </div>\
        </div>\
        <div style="clear: both;"></div>\
    ';
}

function theme_screenshots(basename, screenshots) {
    var html = '';
    // Themers...do not change domID of img tag...used to fetch PNG from static.clearsdn.com.
    for (i = 0 ; i < screenshots.length; i++) {
        html += '\
            <a href="/cache/' + screenshots[i].filename + '" data-lightbox="ss-set" data-title="' + screenshots[i].caption + '">\
                <img id="ss-' + basename + '_' + screenshots[i].index + '" data-index="' + screenshots[i].index +'" src="/clearos/themes/AdminLTE/img/placeholder.png" class="theme-screenshot-img">\
            </a>\
        ';
    }
    return html;
}

function theme_star_rating(stars) {
    var html = '';
    for (var index = 1; index <= 5; index++)
        html += '<i class=\'app-rating-action theme-star fa fa-star' + (stars >= index ? ' on' : '') + '\'></i>';

    return html;
}

function theme_price(UNIT, price) {
    var html = price.unit_price > 0 ? price.currency + price.unit_price + ' ' + UNIT[price.unit] : lang_marketplace_free;

    return html;
}

function get_marketplace_data(basename) {

    // Let's see if we have a connection to the Internet
    // Block on this call (async set to false)
    $.ajax({
        url: '/app/network/get_internet_connection_status',
        method: 'GET',
        dataType: 'json',
        async: false,
        success : function(status) {
            if (status != 'offline')
                internet_connection = true;
        },
        error: function (xhr, text_status, error_thrown) {
        }
    });

    // Avoid furter calls if target fields do not exist
    if ($('#sidebar_additional_info').length == 0)
        return;

    // No connection to Internet...let's bail
    if (!internet_connection) {
        $('#sidebar_additional_info').html('<a href=\'/app/network\' class=\'highlight-link\'>' + lang_internet_down + '</a>');
        $('#sidebar_additional_info_row').show(200);
        return;
    }

    $.ajax({
        url: '/app/marketplace/ajax/get_app_details/' + basename,
        method: 'GET',
        dataType: 'json',
        success : function(json) {
            if (json.code != undefined && json.code != 0) {
                $('#sidebar_additional_info').css('color', 'red');
                $('#sidebar_additional_info_row').show(200);
                if (json.code < 0) {
                    // Could put real message for codes < 0, but it gets a bit technical
                    $('#sidebar_additional_info').html(lang_marketplace_connection_failure);
                } else {
                    if (json.code == 3)
                        $('#sidebar_additional_info').html('<a href=\'/app/registration/register\'>' + json.errmsg + '</a>');
                    else
                        $('#sidebar_additional_info').html(json.errmsg);
                }
                return;
            } else {
                // Add title to review form
                $('#review-app-name').html(json.name);
                // We add rows in the reverse order to keep this section under the Version/Vendor

                // Evaluation
                if (json.license_info != undefined && json.license_info.evaluation != undefined && json.license_info.evaluation == true) {
                    if (json.license_info.eval_limitations != undefined) {
                        $('#sidebar_additional_info_row').after(
                            c_row(
                                lang_marketplace_eval_limitations,
                                '<a id=\'eval-limit-anchor\' href=\'javascript: void(0)\'>' + lang_yes + '</a>' +
                                '<div class=\'theme-rhs-tooltip\'>' + json.license_info.eval_limitations + '</div>'
                            )
                        );
                        $('#eval-limit-anchor').tooltip({
                            offset: [-140, -315],
                            position: 'center left',
                            effect: 'slide',
                            direction: 'left',
                            slideOffset: 110, 
                            opacity: 0.95
                        });
                    }
                    $('#sidebar_additional_info_row').after(
                        c_row(
                            lang_marketplace_trial_ends,
                            $.datepicker.formatDate('M d, yy', new Date(json.license_info.expire))
                        )
                    );
                    $('#sidebar_additional_info_row').after(
                        c_row(
                            lang_status,
                            '<span style=\'color: red\'>' + lang_marketplace_evaluation + '</span>'
                        )
                    );
                } else {
                    // Redemption period
                    if (json.license_info != undefined && json.license_info.redemption != undefined && json.license_info.redemption == true) {
                        $('#sidebar_additional_info_row').after(
                            c_row(
                                lang_status,
                                '<span style=\'color: red\'>' + lang_marketplace_redemption + '</span>'
                            )
                        );
                    }

                    // No Subscription
                    if (json.license_info != undefined && json.license_info.no_subscription != undefined && json.license_info.no_subscription == true) {
                        $('#sidebar_additional_info_row').after(
                            c_row(
                                lang_status,
                                '<span style=\'color: red\'>' + lang_marketplace_expired_no_subscription + '</span>'
                            )
                        );
                    }

                    // Subscription?  A unit of 100 or greater represents a recurring subscription
                    if (json.license_info != undefined && json.license_info.unit >= 100) {
                        var bill_cycle = lang_marketplace_billing_cycle_monthly;
                        if (json.license_info.unit == 1000)
                            bill_cycle = lang_marketplace_billing_cycle_yearly;
                        else if (json.license_info.unit == 2000)
                            bill_cycle = lang_marketplace_billing_cycle_2_years;
                        else if (json.license_info.unit == 3000)
                            bill_cycle = lang_marketplace_billing_cycle_3_years;
        
                        $('#sidebar_additional_info_row').after(
                            c_row(
                                lang_marketplace_billing_cycle,
                                bill_cycle
                            )
                        );
                        if (json.license_info.expire != undefined) {
                            $('#sidebar_additional_info_row').after(
                                c_row(
                                    lang_marketplace_renewal_date,
                                    $.datepicker.formatDate('M d, yy', new Date(json.license_info.expire))
                                )
                            );
                        }
                    }
                }

                // Support Policy
                if (json.supported != undefined && !json.hide_support_policy) {
                    // TODO - there are some clearcenter references here
                    $('#sidebar_additional_info_row').after(
                        c_row(
                            lang_marketplace_support_policy,
                            get_support_policy(json)
                        )
                    );
                }

                // Version updates
                if (!json.up2date) {
                    $('#sidebar_additional_info_row').after(
                        c_row(
                            lang_marketplace_upgrade,
                            json.latest_version
                        )
                    );
                }
            }
            if (json.complementary_apps != undefined && json.complementary_apps.length > 0 && !json.hide_recommended_apps) {
                comp_apps = '<h3 class=\'box-title\'>' + lang_marketplace_recommended_apps + '</h3>' +
                    '<div>' + lang_marketplace_sidebar_recommended_apps.replace('APP_NAME', '<b>' + json.name + '</b>') + ':</div>';
                for (index = 0 ; index < json.complementary_apps.length; index++) {
                    comp_apps += '<div class=\'row\'>';
                    comp_apps += '  <div class=\'col-lg-8\'>';
                    comp_apps += '    <a href=\'/app/marketplace/view/' + json.complementary_apps[index].basename + '\'>';
                    comp_apps += json.complementary_apps[index].name;
                    comp_apps += '    </a>';
                    comp_apps += '  </div>\n';
                    comp_apps += '  <div class=\'col-lg-4\'>';
                    comp_apps += theme_star_rating(Math.round(json.complementary_apps[index].rating));
                    comp_apps += '  </div>';
                    comp_apps += '</div>';
                }
                $('#sidebar-recommended-apps').html(comp_apps);
            }
        },
        error: function (xhr, text_status, error_thrown) {
            console.log(xhr.responseText.toString());
        }
    });
}

function theme_clearos_loading(options) {
    var classes = '';
    var text = '';
    var center_begin = '';
    var center_end = '';
    if (options != undefined) {
        if (options.classes)
            classes = options.classes;
        if (options.text)
            text = '<span style=\'margin-left: 5px;\'>' + options.text + '</span>';
        if (options.center) {
            center_begin = '<div style=\'width: 100%; text-align: center;\'>';
            center_end = '</div>';
        }
    }
    return center_begin + '<i class=\'fa fa-spinner fa-spin ' + classes + '\'></i>' + text + center_end;
}

function c_row(field, value) {
    return '<div class=\'row\'>' +
                '<div class=\'col-lg-6 theme-field\'>' + field + '</div>' +
                '<div class=\'col-lg-6\'>' + value + '</div>' +
           '</div>'
    ;
}

function marketplace_select_app(id) {
    $('#' + id).val(lang_marketplace_remove);
    $('#active-select-' + id).removeClass("theme-hidden");
}

function marketplace_unselect_app(id) {
    $('#' + id).val(lang_marketplace_select_for_install);
    $('#active-select-' + id).addClass("theme-hidden");
}

function get_support_policy(json) {
    return '<a href=\'#\' data-toggle=\'modal\' data-target=\'#support-legend\'>' +
        '<i class=\'fa fa-circle theme-support theme-support-' + (json.supported & 1) + '\'></i>' +
        '<i class=\'fa fa-circle theme-support theme-support-' + (json.supported & 2) + '\'></i>' +
        '<i class=\'fa fa-circle theme-support theme-support-' + (json.supported & 4) + '\'></i>' +
        '<i class=\'fa fa-circle theme-support theme-support-' + (json.supported & 8) + '\'></i>' +
        '<i class=\'fa fa-circle theme-support theme-support-' + (json.supported & 16) + '\'></i>' +
        '</a>' +
        '<div id=\'support-legend\' class=\'modal fade\' tabindex=\'-1\' role=\'dialog\' aria-labelledby=\'basicModal\' aria-hidden=\'true\'>' +
        '<div class=\'modal-dialog\'>' +
        '<div class=\'modal-content\'>' +
        '<div class=\'modal-header\'>' +
        '<button type=\'button\' class=\'close\' data-dismiss=\'modal\' aria-hidden=\'true\'>&times;</button>' +
        '<h4>' + lang_marketplace_support_legend + '</h4>' +
        '</div>' +
        '<div class=\'modal-body\'>' +
        '<i class=\'fa fa-circle theme-support theme-support-1\' style=\'margin-right: 5px;\'></i>' +
        '<h4 class=\'theme-support-type\'>' + lang_marketplace_support_1_title + '</h4>' +
        '<p>' +
        lang_marketplace_support_1_description +
        '</p>' +
        '<i class=\'fa fa-circle theme-support theme-support-2\' style=\'margin-right: 5px;\'></i>' +
        '<h4 class=\'theme-support-type\'>' + lang_marketplace_support_2_title + '</h4>' +
        '<p>' +
        lang_marketplace_support_2_description +
        '</p>' +
        '<i class=\'fa fa-circle theme-support theme-support-4\' style=\'margin-right: 5px;\'></i>' +
        '<h4 class=\'theme-support-type\'>' + lang_marketplace_support_4_title + '</h4>' +
        '<p>' +
        lang_marketplace_support_4_description +
        '</p>' +
        '<i class=\'fa fa-circle theme-support theme-support-8\' style=\'margin-right: 5px;\'></i>' +
        '<h4 class=\'theme-support-type\'>' + lang_marketplace_support_8_title + '</h4>' +
        '<p>' +
        lang_marketplace_support_8_description +
        '</p>' +
        '<i class=\'fa fa-circle theme-support theme-support-16\' style=\'margin-right: 5px;\'></i>' +
        '<h4 class=\'theme-support-type\'>' + lang_marketplace_support_16_title + '</h4>' +
        '<p>' +
        lang_marketplace_support_16_description +
        '</p>' +
        '<div class=\'modal-footer\'>' +
        '<a href=\'http://www.clearcenter.com/clearcare/landing\' target=\'_blank\'>' + lang_marketplace_learn_more + '...</a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
}
function get_placeholder(type) {
    if (type == 'svg')
        return '\
            <?xml version="1.0" encoding="UTF-8" standalone="no"?>\
            <!-- Created with Inkscape (http://www.inkscape.org/) -->\
            \
            <svg\
               xmlns:dc="http://purl.org/dc/elements/1.1/"\
               xmlns:cc="http://creativecommons.org/ns#"\
               xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"\
               xmlns:svg="http://www.w3.org/2000/svg"\
               xmlns="http://www.w3.org/2000/svg"\
               xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"\
               xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"\
               width="100%"\
               height="100%"\
               viewBox="0 0 148 86"\
               version="1.1"\
               sodipodi:docname="placeholder.svg">\
              <defs\
                 id="defs4" />\
              <g\
                 inkscape:label="Layer 1"\
                 inkscape:groupmode="layer"\
                 id="layer1"\
                 transform="translate(-229.63096,-513.00722)">\
                <g\
                   id="flowRoot2995">\
                  <path\
                     d="m 249.2425,542.68722 0,-5.12 c 0,-0.52 -0.24,-0.76 -0.72,-0.76 -0.04,0 -0.08,0 -0.12,0 -1.64,0.16 -3.32,0.36 -5.6,0.36 -2.2,0 -4.12,-1 -4.12,-6.04 l 0,-4.12 c 0,-5.07999 1.96,-6.04 4.12,-6.04 2.28,0 3.96,0.2 5.6,0.36 0.04,0 0.08,0 0.12,0 0.48,0 0.72,-0.24 0.72,-0.76 l 0,-5.12 c 0,-0.56 -0.24,-0.68 -0.88,-0.88 -1.04,-0.36 -3.08,-0.72 -5.6,-0.72 -7.35999,0 -12.32,4.00001 -12.32,13.16 l 0,4.12 c 0,9.15999 4.96001,13.16 12.32,13.16 2.52,0 4.56,-0.36 5.6,-0.72 0.64,-0.2 0.88,-0.36 0.88,-0.88"\
                     class="theme-app-logo-svg"\
                     id="path3094" />\
                  <path\
                     d="m 260.67,543.04722 0,-29.24 c 0,-0.44 -0.36,-0.8 -0.8,-0.8 l -6.04,0 c -0.44,0 -0.88,0.36 -0.88,0.8 l 0,29.24 c 0,0.44 0.44,0.88 0.88,0.88 l 6.04,0 c 0.44,0 0.8,-0.44 0.8,-0.88"\
                     class="theme-app-logo-svg"\
                     id="path3096" />\
                  <path\
                     d="m 285.33938,533.56722 0,-2.4 c 0,-6.43999 -3.24001,-10.88 -10.24001,-10.88 -6.55999,0 -10.63999,3.84001 -10.63999,10.88 l 0,2.64 c 0,7.64 5,10.48 10.39999,10.48 3.36,0 6.12001,-0.4 8.68,-1.24 0.64,-0.2 0.80001,-0.48 0.80001,-1.12 l 0,-3.6 c 0,-0.48 -0.28001,-0.68 -0.72001,-0.68 -0.04,0 -0.12,0 -0.15999,0 -1.52,0.16 -5.48001,0.32 -7.60001,0.32 -2.91999,0 -3.8,-1.32 -3.8,-3.44 l 0,-0.08 12.44,0 c 0.48,0 0.84001,-0.36 0.84001,-0.88 m -7.36001,-3.36 -5.92,0 0,-0.12 c 0,-2.39999 1.04001,-3.84 2.96001,-3.84 1.99999,0 2.95999,1.44001 2.95999,3.84 l 0,0.12"\
                     class="theme-app-logo-svg"\
                     id="path3098" />\
                  <path\
                     d="m 307.92187,543.12722 0,-14.16 c 0,-6.55999 -4.24,-8.64 -10.04,-8.64 -2.55999,0 -6,0.56 -7.32,0.96 -0.47999,0.16 -0.8,0.52 -0.8,0.96 l 0,3.88 c 0,0.48 0.32001,0.8 0.76001,0.8 l 0.12,0 c 1.87999,-0.2 4.4,-0.28 6.95999,-0.28 1.36,0 2.64,0.36001 2.64,2.32 l 0,1.16 -1.71999,0 c -6.68,0 -10.32001,1.72001 -10.32001,6.52 l 0,0.48 c 0,5.4 3.68001,7.16 6.84,7.16 2.2,0 4.20001,-0.88 5.72,-2 l 0,0.84 c 0,0.44 0.36001,0.8 0.8,0.8 l 5.56,0 c 0.44,0 0.8,-0.36 0.8,-0.8 m -7.44,-4.96 c -0.67999,0.32 -1.76,0.6 -2.72,0.6 -1.11999,0 -2.04,-0.4 -2.04,-1.76 l 0,-0.4 c 0,-1.67999 0.80001,-2.32 2.80001,-2.32 l 1.95999,0 0,3.88"\
                     class="theme-app-logo-svg"\
                     id="path3100" />\
                  <path\
                     d="m 325.61063,525.80722 0,-4.68 c 0,-0.44 -0.36001,-0.8 -0.8,-0.8 l -0.44,0 c -1.68,0 -3.12001,0.20001 -4.92001,2.08 l 0,-0.96 c 0,-0.44 -0.36,-0.8 -0.8,-0.8 l -5.76,0 c -0.43999,0 -0.8,0.36 -0.8,0.8 l 0,21.6 c 0,0.44 0.40001,0.88 0.88,0.88 l 6,0 c 0.48,0 0.8,-0.44 0.8,-0.88 l 0,-15.52 c 1.24,-0.68 2.88001,-0.92 4.60001,-0.92 l 0.56,0 c 0.39999,0 0.68,-0.4 0.68,-0.8"\
                     class="theme-app-logo-svg"\
                     id="path3102" />\
                  <path\
                     d="m 353.04937,531.12722 0,-4.12 c 0,-9.75999 -5.64,-13.2 -12.27999,-13.2 -6.64,0 -12.28001,3.44001 -12.28001,13.2 l 0,4.12 c 0,9.75999 5.64001,13.16 12.28001,13.16 6.63999,0 12.27999,-3.40001 12.27999,-13.16 m -8.24,0 c 0,4.28 -1.24,6 -4.03999,6 -2.8,0 -4.04001,-1.72 -4.04001,-6 l 0,-4.12 c 0,-4.27999 1.24001,-6.04 4.04001,-6.04 2.79999,0 4.03999,1.76001 4.03999,6.04 l 0,4.12"\
                     class="theme-app-logo-svg"\
                     id="path3104" />\
                  <path\
                     d="m 377.68875,535.12722 c 0,-3.31999 -1.4,-5.96 -5.28,-8.04 l -5.4,-2.88 c -1.72,-0.92 -2.08,-1.32 -2.08,-2.04 0,-0.84 0.52,-1.36 2,-1.36 2.88,0 7.44,0.4 9.08,0.52 0.04,0 0.04,0 0.08,0 0.44,0 0.72,-0.36 0.72,-0.76 l 0,-5 c 0,-0.44 -0.36,-0.64 -0.72,-0.76 -1.64,-0.48 -5.92,-1 -9.08,-1 -8.07999,0 -10.48,3.60001 -10.48,7.96 0,3.08 1,5.80001 4.76,8 l 5.76,3.4 c 1.48,0.88 1.88,1.32 1.88,2.12 0,1.28 -0.56,2.04 -2.52,2.04 -2.12,0 -6.44,-0.44 -8.12,-0.6 -0.04,0 -0.04,0 -0.08,0 -0.4,0 -0.76,0.28 -0.76,0.8 l 0,4.92 c 0,0.44 0.44,0.68 0.84,0.8 2.12,0.6 4.8,1.04 8.08,1.04 8.23999,0 11.32,-4.68 11.32,-9.16"\
                     class="theme-app-logo-svg"\
                     id="path3106" />\
                </g>\
                <g\
                   transform="translate(-5.7142857,-45.714286)"\
                   id="flowRoot3011">\
                  <path\
                     d="m 271.96925,643.65836 c 0,-0.056 -0.056,-0.168 -0.056,-0.28 l -7.504,-34.272 c -1.232,-5.54399 -5.43201,-6.664 -10.752,-6.664 -5.31999,0 -9.52,1.12001 -10.752,6.664 l -7.504,34.272 c 0,0.112 -0.056,0.168 -0.056,0.28 0,0.504 0.392,0.896 0.952,0.896 l 9.688,0 c 0.56,0 1.008,-0.504 1.12,-1.064 l 1.568,-7.784 9.968,0 1.568,7.784 c 0.112,0.56 0.56,1.064 1.12,1.064 l 9.744,0 c 0.56,0 0.896,-0.336 0.896,-0.896 m -14.952,-16.912 -6.72,0 2.744,-14.224 c 0.112,-0.504 0.112,-0.784 0.616,-0.784 0.504,0 0.504,0.28 0.616,0.784 l 2.744,14.224"\
                     class="theme-app-logo-svg"\
                     id="path3109" />\
                  <path\
                     d="m 309.176,616.89036 0,-0.448 c 0,-11.14399 -9.12801,-14.056 -17.472,-14.056 -3.976,0 -9.016,0.28 -11.816,0.728 -2.352,0.392 -3.248,1.00801 -3.248,3.696 l 0,36.736 c 0,0.616 0.56,1.008 1.176,1.008 l 8.96,0 c 0.616,0 1.12,-0.504 1.12,-1.12 l 0,-12.6 c 1.512,0.056 2.744,0.168 3.976,0.168 8.06399,0 17.304,-3.08001 17.304,-14.112 m -11.312,0 c 0,3.136 -2.072,4.648 -5.992,4.648 -0.336,0 -3.696,0 -3.976,-0.056 l 0,-9.52 c 0.336,0 3.584,-0.056 3.976,-0.056 3.752,0 5.992,1.28801 5.992,4.536 l 0,0.448"\
                     class="theme-app-logo-svg"\
                     id="path3111" />\
                  <path\
                     d="m 347.12912,616.89036 0,-0.448 c 0,-11.14399 -9.128,-14.056 -17.472,-14.056 -3.97599,0 -9.016,0.28 -11.816,0.728 -2.35199,0.392 -3.248,1.00801 -3.248,3.696 l 0,36.736 c 0,0.616 0.56001,1.008 1.176,1.008 l 8.96,0 c 0.616,0 1.12001,-0.504 1.12001,-1.12 l 0,-12.6 c 1.51199,0.056 2.744,0.168 3.976,0.168 8.06399,0 17.30399,-3.08001 17.30399,-14.112 m -11.312,0 c 0,3.136 -2.072,4.648 -5.99199,4.648 -0.336,0 -3.69601,0 -3.976,-0.056 l 0,-9.52 c 0.33599,0 3.584,-0.056 3.976,-0.056 3.75199,0 5.99199,1.28801 5.99199,4.536 l 0,0.448"\
                     class="theme-app-logo-svg"\
                     id="path3113" />\
                  <path\
                     d="m 380.71425,632.23436 c 0,-4.64799 -1.96001,-8.344 -7.392,-11.256 l -7.56,-4.032 c -2.408,-1.288 -2.912,-1.848 -2.912,-2.856 0,-1.176 0.728,-1.904 2.8,-1.904 4.032,0 10.416,0.56 12.712,0.728 0.056,0 0.056,0 0.112,0 0.616,0 1.008,-0.504 1.008,-1.064 l 0,-7 c 0,-0.616 -0.504,-0.896 -1.008,-1.064 -2.296,-0.672 -8.288,-1.4 -12.712,-1.4 -11.31199,0 -14.672,5.04001 -14.672,11.144 0,4.312 1.40001,8.12001 6.664,11.2 l 8.064,4.76 c 2.072,1.232 2.632,1.848 2.632,2.968 0,1.792 -0.784,2.856 -3.528,2.856 -2.968,0 -9.016,-0.616 -11.368,-0.84 -0.056,0 -0.056,0 -0.112,0 -0.56,0 -1.064,0.392 -1.064,1.12 l 0,6.888 c 0,0.616 0.616,0.952 1.176,1.12 2.968,0.84 6.72,1.456 11.312,1.456 11.53599,0 15.848,-6.552 15.848,-12.824"\
                     class="theme-app-logo-svg"\
                     id="path3115" />\
                </g>\
              </g>\
            </svg>\
    ';
}
