
var left_side_width = 250; //Sidebar width in pixels

$(function() {
    'use strict';

    //Enable sidebar toggle
    $("[data-toggle='offcanvas']").click(function(e) {
        e.preventDefault();

        //If window is small enough, enable sidebar push menu
        if ($(window).width() <= 992) {
            $('.row-offcanvas').toggleClass('active');
            $('.left-side').removeClass("collapse-left");
            $(".right-side").removeClass("strech");
            $('.row-offcanvas').toggleClass("relative");
        } else {
            //Else, enable content streching
            if ($('.left-side').hasClass('collapse-left')) {
                $('.left-side').toggleClass("collapse-left");
                $(".right-side").toggleClass("strech").animate({'margin-left':'250px'});
            } else {
                $('.left-side').toggleClass("collapse-left");
                $(".right-side").toggleClass("strech").animate({'margin-left':'50px'});
            }
        }
    });

    /* 
     * Make sure that the sidebar is streched full height
     * ---------------------------------------------
     * We are gonna assign a min-height value every time the
     * wrapper gets resized and upon page load. We will use
     * Ben Alman's method for detecting the resize event.
     * 
     **/
    function _fix() {
        //Get window height and the wrapper height
        var height = $(window).height() - $("body > .header").height();
        $(".wrapper").css("min-height", height + "px");
        var content = $(".wrapper").height();
        //If the wrapper height is greater than the window
        if (content > height)
            //then set sidebar height to the wrapper
            $(".left-side, html, body").css("min-height", content + "px");
        else {
            //Otherwise, set the sidebar to the height of the window
            $(".left-side, html, body").css("min-height", height + "px");
        }
    }
    //Fire upon load
    _fix();
    //Fire when wrapper is resized
    $(".wrapper").resize(function() {
        _fix();
        fix_sidebar();
    });

    //Fix the fixed layout sidebar scroll bug
    fix_sidebar();

    $.fn.navmenu = function() {

        return this.each(function() {
            var btn = $(this).children("a").first();
            var menu = $(this).children(".treeview-menu").first();
            var isActive = $(this).hasClass('active');

            //initialize already active menus
            if (isActive) {
                menu.show();
            }
            //Slide open or close the menu on link click
            btn.click(function(e) {
                e.preventDefault();
                if (isActive) {
                    //Slide up to close menu
                    menu.slideUp();
                    isActive = false;
                    btn.parent("li").removeClass("active");
                } else {
                    //Slide down to open menu
                    menu.slideDown();
                    isActive = true;
                    btn.parent("li").addClass("active");
                }
            });

        });

    };

}(jQuery));

function fix_sidebar() {
    //Make sure the body tag has the .fixed class
    if (!$("body").hasClass("fixed")) {
        return;
    }

    //Add slimscroll
    $(".sidebar").slimscroll({
        height: ($(window).height() - $(".header").height()) + "px",
        color: "rgba(0,0,0,0.2)"
    });
}
function change_layout() {
    $("body").toggleClass("fixed");
    fix_sidebar();
}

$(document).ready(function() {

    $('.theme-navbar-category').tooltip({container: 'body'});

    $(".my-colorpicker").colorpicker();

    var menu_category = $('input[name=options]:checked', '#category-select').attr('id');
    $('.' + menu_category).show();
    $('#' + menu_category).parent().addClass('active');
    $(".sidebar .treeview").navmenu();
    $('#category-select input:radio').change(function (e) {
        menu_category = $('input[name=options]:checked', '#category-select').attr('id');
        $('.treeview').hide();
        $('.' + menu_category).removeClass('active');
        $('.' + menu_category).show();
        $(".sidebar .treeview").navmenu();
        // Hacks below keep style the same even though we're hiding li elements
        $('.' + menu_category).filter(':first').css('border-top', '1px solid #dbdbdb');
        $('.' + menu_category + ' a').filter(':first').css('border-top', '1px solid #fff');
    });
    $('#category-select label.btn').click(function (e) {
        menu_category = $('input[name=options]:checked', '#category-select').attr('id');
        // If user clicked on button that was already selected, toggle the sliders
        if (menu_category == $(this).children('input[type=\'radio\']:first').attr('id')) {
            if ($('.sidebar-menu').hasClass('all-active')) {
                var menu = $('.treeview-menu');
                menu.slideUp();
                $('.sidebar-menu').removeClass('all-active');
                $('.' + menu_category).removeClass('active');
            } else {
                var menu = $('.treeview-menu');
                menu.slideDown();
                $('.sidebar-menu').addClass('all-active');
            }
        }
    });

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

function theme_clearos_dialog_box(id, title, message, options)
{
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_WARNING,
        title: title,
        buttons: [{
            label: 'Close',
            action: function() {
                if (options.reload_on_close)
                    window.location.reload();
                else if (options.redirect_on_close)
                    window.location = options.redirect_on_close;
            }
        }],
        message: message
    });
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
        <div class="alert ' + box_class + '"' + id + '> \
            <i class="' + icon_class + '"></i> \
            <strong style="padding-right: 10px;">' + title + '</strong>' + message + ' \
        </div> \
    ';
}

function theme_clearos_is_authenticated()
{

    data_payload = 'ci_csrf_token=' + $.cookie('ci_csrf_token');
    if ($('#sdn_username').val() != undefined)
        data_payload += '&username=' + $('#sdn_username').val();
    $('#sdn-login-dialog-message-bar').html('');
    if (auth_options.action_type == 'login') {
        if ($('#sdn_password').val() == '') {
            $('#sdn-login-dialog-message-bar').html(theme_clearos_info_box('warning', lang_warning, lang_sdn_password_invalid));
            $('#sdn-login-dialog-message-bar').show(200);
            $('.autofocus').focus();
            return;
        } else {
            data_payload += '&password=' + $('#sdn_password').val();
        }
    } else if (auth_options.action_type == 'lost_password') {
        if ($('#sdn_email').val() == '') {
            $('#sdn-login-dialog-message-bar').html(theme_clearos_info_box('warning', lang_warning, lang_sdn_email_invalid));
            $('#sdn-login-dialog-message-bar').show(200);
            $('.autofocus').focus();
            return;
        } else {
            data_payload += '&email=' + $('#sdn_email').val();
        }
    }

    // Translations
    //-------------

    lang_warning = '<?php echo lang("base_warning"); ?>';

    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: data_payload,
        url: '/app/marketplace/ajax/is_authenticated',
        success: function(data) {
            if (data.code == 0 && data.authorized) {
                // Might have pages where account is displayed (eg. Marketplace)
                $('#display_sdn_username').html(data.sdn_username);
                // Only case where authorized is true.
                $('#sdn-login-dialog').modal('hide');
                // If we're logged in and there is a 'check_sdn_edit' function defined on page, check to see if we need to get settings
                if (window.check_sdn_edit)
                    check_sdn_edit();
                if (auth_options.action_type == 'login' && auth_options.reload_after_auth)
                    window.location.reload();
            } else if (data.code == 0 && !data.authorized) {

                // Open dialog
                $('#sdn-login-dialog').modal();
                // If user closes modal box, redirect to non-edit mode
                $('#sdn-login-dialog').on('hidden.bs.modal', function() {
                    if (!my_location.default_controller)
                        return;
                    window.location = '/app/' + my_location.basename;
                });

                // If email was submitted...reset was a success...
                if (data.email != undefined) {
                    $('#sdn-login-dialog-message-bar').html(
                        theme_clearos_info_box('info', lang_success + '!', lang_sdn_password_reset + ': <span style="font-weight: bold">' + data.email + '</span>')
                    );
                    $('#sdn-login-dialog-message-bar').show(200);
                    $('#sdn_password_group').show();
                    $('#sdn_lost_password_group').hide();
                    $('.autofocus').focus();
                    $('#sdn_login_action').text(lang_login);
                    return;
                }
                
                // Marketplace 1.1 sends back array of admins
                $.each(data.sdn_admins, function(key, value) {   
                    $('#sdn_username')
                    .append($('<option>', { value : value })
                    .text(value)); 
                });

            } else if (data.code == 10) {
                // Code 10 is an invalid email
                $('#sdn-login-dialog-message-bar').html(theme_clearos_info_box('warning', lang_warning, lang_sdn_email_invalid));
                $('#sdn-login-dialog-message-bar').show(200);
            } else if (data.code == 11) {
                // Code 11 is an email mismatch for lost password
                $('#sdn-login-dialog-message-bar').html(theme_clearos_info_box('warning', lang_warning, lang_sdn_email_mismatch));
                $('#sdn-login-dialog-message-bar').show(200);
            } else if (data.code > 0) {
                $('#sdn-login-dialog-message-bar').html(theme_clearos_info_box('warning', lang_warning, lang_sdn_password_invalid));
                $('#sdn-login-dialog-message-bar').show(200);
            } else if (data.code < 0) {
                $('#sdn-login-dialog-message-bar').html(theme_clearos_info_box('warning', lang_warning, data.errmsg));
                $('#sdn-login-dialog-message-bar').show(200);
                return;
            }
            $('.autofocus').focus();
        },
        error: function(xhr, text, err) {
            // Don't display any errors if ajax request was aborted due to page redirect/reload
            if (xhr['abort'] == undefined)
                theme_clearos_dialog_box('some-error', lang_warning, xhr.responseText.toString());
            $('#sidebar_setting_status').html('---');
        }
    });
}

function theme_clearos_on_page_ready(my_location)
{
//    internet_connection = true;
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
                  <a href="/app/' + my_location.basename + '" class="btn btn-sm btn-link theme-anchor-cancel">' + lang_cancel + '</a> \
                </div> \
              </div> \
            </div> \
          </div> \
        </div> \
    ');

    $('#sdn_login_action').click(function (e) {
        auth_options.action_type = 'login';

        if ($('#sdn_lost_password_group').is(':visible'))
            auth_options.action_type = 'lost_password';
        theme_clearos_is_authenticated();
    });

    $('#sdn_forgot_password').click(function (e) {
        e.preventDefault();
        $('#sdn-login-dialog-message-bar').html('');
        $('#sdn_password_group').hide();
        $('#sdn_lost_password_group').show();
        $('.autofocus').focus();
        $('#sdn_login_action').text($('#sdn_login_action').text() == lang_login ? lang_reset_password_and_send : lang_login);
    });
/*

                  <div id="sdn_lost_password_group" class="theme-hidden"> \
                    <div style="float: left; width: 120px; text-align: right; padding-top: 5px;">' + lang_sdn_email + '</div> \
                    <div style="float: left; width: 120px; margin-left: 10px;"> \
                      <input id="sdn_email" type="text" style="width: 120px" name="sdn_email" value="" class="autofocus" /> \
                    </div> \
                  </div> \
                    <div> \
                      <a href="#" id="sdn_forgot_password" style="font-size: 9px;">' + lang_forgot_password + '</a> \
                    </div> \

        buttons: {
            'authenticate': {
                text: lang_authenticate,
                click: function() {
                    auth_options.action_type = 'login';

                    if ($('#sdn_lost_password_group').is(':visible'))
                        auth_options.action_type = 'lost_password';
                    theme_clearos_is_authenticated();
                }
            },
            'close': {
                text: lang_close,
                click: function() {
                    // Go back to basename
                    $(this).dialog('close');
                    // If not at default controller, reload page
                    if (!my_location.default_controller)
                        return;
                    window.location = 'https://' + document.location.host + '/app/' + my_location.basename;
                }
            }
        }
    });

    $('input#sdn_password').keyup(function(event) {
        if (event.keyCode == 13) {
            auth_options.action_type = 'login';
            theme_clearos_is_authenticated();
        }
    });

    $('input#sdn_email').keyup(function(event) {
        if (event.keyCode == 13) {
            auth_options.action_type = 'lost_password';
            theme_clearos_is_authenticated();
        }
    });


    $('#theme-banner-my-account-nav').click(function (e) {
        e.preventDefault();
        if (!$('#theme-banner-my-account-container').is(':visible')) {
            $('#theme-banner-my-account-container').show('slide', {direction: 'right'}, 500);
        } else {
            $('#theme-banner-my-account-container').hide('slide', {direction: 'right'}, 500);
        }
    });

    $('#theme-banner-my-account-container').mouseleave(function (e) {
        setTimeout(function() {$('#theme-banner-my-account-container').hide('slide', {direction: 'right'}, 500)}, 1000);
    });
*/
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
                            '<a href=\'#\' data-toggle=\'modal\' data-target=\'#support-legend\'>' +
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
                            '</div>'
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
                    comp_apps += '<div class=\'row\'><div class=\'col-lg-8\'><a href=\'/app/marketplace/view/' +
                        json.complementary_apps[index].basename + '\'>' +
                        json.complementary_apps[index].name + '</a></div>\n';
                    comp_apps += '<div class=\'col-lg-4\'>';
                    for (var counter = 5 ; counter > Math.round(json.complementary_apps[index].rating); counter--)
                        comp_apps += '<i class=\'fa fa-star-o\'></i>';
                    for (var counter = 0 ; counter < Math.round(json.complementary_apps[index].rating); counter++)
                        comp_apps += '<i class=\'fa fa-star theme-star\'></i>';
                    comp_apps += '</div></div>';
                }
                $('#sidebar-recommended-apps').html(comp_apps);
            }
        },
        error: function (xhr, text_status, error_thrown) {
            // FIXME: Firebug issue?
            //if (xhr['abort'] == undefined)
            //    $('#sidebar_additional_info').html(xhr.responseText.toString());
        }
    });
}

function c_row(field, value) {
    // TODO style should be in CSS
    return '<div class=\'row\'>' +
                '<div class=\'col-lg-6\'>' + field + '</div>' +
                '<div class=\'col-lg-6\'>' + value + '</div>' +
           '</div>'
    ;
}
