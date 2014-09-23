<?php

/**
 * Header handler for the theme.
 *
 * @category  Theme
 * @package   ClearOS
 * @author    ClearFoundation <developer@clearfoundation.com>
 * @copyright 2014 ClearFoundation
 * @license   http://www.gnu.org/copyleft/gpl.html GNU General Public License version 3 or later
 * @link      http://www.clearfoundation.com/docs/developer/theming/
 */

//////////////////////////////////////////////////////////////////////////////
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
///////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// P A G E  L A Y O U T
//////////////////////////////////////////////////////////////////////////////

function theme_page($page)
{
    if ($_SERVER['SERVER_PORT'] == 1501 && !preg_match('/.*hide_devel$/', $_SERVER['REQUEST_URI'])) {
        if (!preg_match('/^\/usr\/clearos/', __FILE__))
            $page['devel_alerts']['theme'] = TRUE;
    }
    if ($page['devel_app_source'] != 'Live')
        $page['devel_alerts']['app'] = TRUE;
    if ($page['devel_framework_source'] != 'Live')
        $page['devel_alerts']['framework'] = TRUE;

    if ($page['type'] == MY_Page::TYPE_CONFIGURATION)
        return _configuration_page($page);
    else if ($page['type'] == MY_Page::TYPE_WIDE_CONFIGURATION)
        return _wide_configuration_page($page);
    else if ($page['type'] == MY_Page::TYPE_REPORTS)
        return _report_page($page);
    else if ($page['type'] == MY_Page::TYPE_REPORT_OVERVIEW)
        return _report_overview_page($page);
    else if ($page['type'] == MY_Page::TYPE_SPOTLIGHT)
        return _spotlight_page($page);
    else if ($page['type'] == MY_Page::TYPE_DASHBOARD)
        return _dashboard_page($page);
    else if (($page['type'] == MY_Page::TYPE_SPLASH) || ($page['type'] == MY_Page::TYPE_SPLASH_ORGANIZATION))
        return _splash_page($page);
    else if ($page['type'] == MY_Page::TYPE_LOGIN)
        return _login_page($page);
    else if ($page['type'] == MY_Page::TYPE_WIZARD)
        return _wizard_page($page);
    else if ($page['type'] == MY_Page::TYPE_EXCEPTION)
        return _exception_page($page);
    else if ($page['type'] == MY_Page::TYPE_CONSOLE)
        return _console_page($page);
}

function theme_page_open($settings)
{
    return "<body class='" . $settings['css'] . "'>\n";
}

function theme_page_close($page)
{
    return "</body></html>\n";
}

/**
 * Returns the configuration type page.
 *
 * @param array $page page data
 *
 * @return string HTML output
 */

function _configuration_page($page)
{
    $layout = 
        _get_header($page) .
        "<div class='wrapper row-offcanvas row-offcanvas-left'>" .
        _get_left_menu($page) .
        _get_main_content($page) .
        "</div>" .
        _get_footer($page)
    ;

    return $layout;
}

/**
 * Returns the wide configuration page.
 *
 * @param array $page page data   
 *
 * @return string HTML output
 */   

function _wide_configuration_page($page)
{
    $layout = 
        _get_header($page) .
        "<div class='wrapper row-offcanvas row-offcanvas-left'>" .
        _get_left_menu($page) .
        _get_main_content($page) .
        "</div>" .
        _get_footer($page)
    ;

    return $layout;
}

/**
 * Returns the report page.
 *
 * @param array $page page data   
 *
 * @return string HTML output
 */   

function _report_page($page)
{
    $layout = 
        _get_header($page) .
        "<div class='wrapper row-offcanvas row-offcanvas-left'>" .
        _get_left_menu($page) .
        "</div>" .
        _get_footer($page)
    ;
    return $layout;
    $menus = _get_left_menu($page);

    return "
<!-- Body -->
<body>
" . $page['devel_message'] . "

<!-- Page Container -->
<div id='theme-page-container'>
    " .
    _get_banner($page, $menus) .
    "
    <!-- Main Content Container -->
    <div id='theme-main-content-container'>
        <div class='theme-main-content-top'>
            <div class='theme-content-border-top'></div>
            <div class='theme-content-border-left'></div>
            <div class='theme-content-border-right'></div>
        </div>
        <div class='theme-core-content'>
        " .
            _get_left_menu($menus) .
        "
            <!-- Content -->
            <div id='theme-content-container'>
                <div id='theme-help-box-container'>
                    <div class='theme-help-box'>
                    " . $page['page_help'] . "
                    </div>
                </div>
                <div id='theme-sidebar-container'>
                    <div class='theme-sidebar-report-top'>
                    " . $page['page_report_helper'] . "
                    </div>
                    $report
                    <div class='theme-sidebar-bottom'></div>
                </div>
                <div id='theme-content-left'>
                    " . _get_message() . "
                    " . $page['page_report_chart'] . "
                </div>
                <div>
                    " . $page['page_report_table'] . "
                </div>
            </div>
        </div>
        " .
        _get_footer($page) .
        "
    </div>
</div>
</body>
</html>
";
}

/**
 * Returns the configuration type page.
 *
 * @param array $page page data
 *
 * @return string HTML output
 */

function _report_overview_page($page)
{
    echo "todo - report overview";
}

/**
 * Returns the dashboard page.
 *
 * @param array $page page data   
 *
 * @return string HTML output
 */   

function _dashboard_page($page)
{
    $layout = 
        _get_header($page) .
        "<div class='wrapper row-offcanvas row-offcanvas-left'>" .
        _get_left_menu($page) .
        _get_main_content($page) .
        "</div>" .
        _get_footer($page)
    ;

    return $layout;
}

/**
 * Returns the spotlight page.
 *
 * @param array $page page data   
 *
 * @return string HTML output
 */   

function _spotlight_page($page)
{
    $layout = 
        _get_header($page) .
        "<div class='wrapper row-offcanvas row-offcanvas-left'>" .
        _get_left_menu($page) .
        _get_main_content($page) .
        "</div>" .
        _get_footer($page)
    ;

    return $layout;
}

/**
 * Returns the login type page.
 *
 * @param array $page page data   
 *
 * @return string HTML output
 */   

function _login_page($page)
{
    return "
<!-- Page Container -->
<div class='theme-login-container'>
    <div class='theme-login-logo'></div>
    " . $page['app_view'] . "
</div>
";
}

/**
 * Returns the splash page.
 *
 * @param array $page page data   
 *
 * @return string HTML output
 */   

function _splash_page($page)
{
    $org_css = preg_replace('/\/core\/.*/', '', realpath(__FILE__)) . '/css/theme-organization.css';

    if (!preg_match('/Community/', $page['os_name']) && ($page['type'] == MY_Page::TYPE_SPLASH_ORGANIZATION) && file_exists($org_css))
        $class = 'theme-splash-organization-logo';
    else
        $class = 'theme-splash-logo';

    return "
        <!-- Body -->
        <body>

        <!-- Page Container -->
        <div class='theme-page-splash-container'>
            <div class='$class'></div>
            <div class='theme-content-splash-container'>
                " . _get_message() . "
                " . $page['app_view'] . "
            </div>
        </div>
        </body>
        </html>
    ";

}

/**
 * Returns the exception page.
 *
 * @param array $page page data   
 *
 * @return string HTML output
 */   

function _exception_page($page)
{
    $layout = 
        _get_header($page) .
        "<div class='wrapper row-offcanvas row-offcanvas-left'>" .
        _get_left_menu($page) .
        _get_main_content($page) .
        "</div>" .
        _get_footer($page)
    ;

    return $layout;
}

/**
 * Returns the wizard page.
 *
 * @param array $page page data   
 *
 * @return string HTML output
 */   

function _wizard_page($page)
{
    $layout = _get_header($page);
    $layout .= "<div class='wrapper row-offcanvas row-offcanvas-left'>";
    $layout .= _get_wizard_menu($page);
    $layout .= "
            <aside class='right-side'>
                <section class='content-header clearfix'>
                    " . _get_content_header() . "
                    <h1 class='theme-breadcrumb'>" . $page['title'] . "</h1>" . (isset($page['breadcrumb_links']) ? _get_breadcrumb_links($page['breadcrumb_links']) : "") . "
                </section>
    ";
    $layout .= "<section class='content clearfix'>";
    // For Wizard pages with help boxes, split page up into 8/4 col
    if ($page['page_inline_help'])
        $layout .= "<div class='col-lg-8 theme-content'>";
    else
        $layout .= "<div class='col-lg-12 theme-content'>";

    // Add intro, as req'd
    if ($page['page_wizard_intro']) {
        $layout .= theme_box_open($page['page_wizard_name']);
        $layout .= $page['page_wizard_intro'];
        $layout .= theme_box_close();
    }

    // Messages and page view
    $layout .= _get_message() . $page['app_view'];

    // Add inline help
    if ($page['page_inline_help']) {
        // Close of 8 column main view
        $layout .= "</div>";
        $layout .= "<div class='col-lg-4 theme-inline-help'>";
        $layout .= $page['page_inline_help'];
        $layout .= "</div>";
    } else {
        $layout .= "</div>";
    }
    // Close out section
    $layout .= "
                </section>
            </aside>
    ";
    $layout .= "</div>";
    $layout .= _get_footer($page);

    return $layout;
}

/**
 * Returns the console page.
 *
 * @param array $page page data   
 *
 * @return string HTML output
 */   

function _console_page($page)
{
    echo "todo - console";
}

//////////////////////////////////////////////////////////////////////////////
// L A Y O U T  H E L P E R S
//////////////////////////////////////////////////////////////////////////////

function _get_message()
{
    $framework =& get_instance();

    if (! $framework->session->userdata('message_text'))
        return;

    $message = $framework->session->userdata('message_text');
    $type =  $framework->session->userdata('message_code');
    $title = $framework->session->userdata('message_title');

    $framework->session->unset_userdata('message_text');
    $framework->session->unset_userdata('message_code');
    $framework->session->unset_userdata('message_title');

    return theme_infobox($type, $title, $message);
}

/**
 * Returns main content.
 * 
 * @param array $page page data
 *
 * @return string menu HTML output
 */

function _get_main_content($page)
{
    if ($page['page_report']) {
        $report = "
            <div>
            " . $page['page_report'] . "
            </div>
        ";
    } else {
        $report = '';
    }

    if ($page['type'] == MY_Page::TYPE_DASHBOARD || $page['type'] == MY_Page::TYPE_EXCEPTION || $page['type'] == MY_Page::TYPE_SPOTLIGHT || $page['type'] == MY_Page::TYPE_WIZARD)
        return "
            <aside class='right-side'>
                <section class='content-header clearfix'>
                    " . _get_content_header() . "
                    <h1 class='theme-breadcrumb'>" . $page['title'] . "</h1>" . (isset($page['breadcrumb_links']) ? _get_breadcrumb_links($page['breadcrumb_links']) : "") . "
                </section>
                <section class='content clearfix'>
                    <div class='col-lg-12 theme-content'>
                " . _get_message() . "
                " . $page['app_view'] . "
                    </div>
                </section>
            </aside>
        ";
    else 
        return "
            <aside class='right-side'>
                <section class='content-header clearfix'>
                    " . _get_content_header() . "
                    <h1 class='theme-breadcrumb'>" . $page['title'] . "</h1>" . (isset($page['breadcrumb_links']) ? _get_breadcrumb_links($page['breadcrumb_links']) : "") . "
                </section>
                <section class='content clearfix'>
                    <div class='col-lg-8 theme-content'>
                " . _get_message() . "
                " . $page['app_view'] . "
                    </div>
                    <div class='col-lg-4'>
                        <div id='theme-sidebar-container'>
                            <div class='theme-sidebar-top box'>
                            " . $page['page_summary'] . "
                            </div>
                            $report
                        </div>" .
                        (isset($page['page_report_helper']) ? "
                        <div class='theme-sidebar-report-top'>
                        " . $page['page_report_helper'] . "
                        </div>
                        $report
                        <div class='theme-sidebar-bottom'></div>" : "") . "
                    </div>
                </section>
            </aside>
        ";
}

/**
 * Returns the header.
 *
 * @param array $page page data
 *
 * @return string banner HTML
 */

function _get_header($page, $menus = array())
{
    $theme_url = clearos_theme_url('AdminLTE');

    $my_account = '';
    $framework =& get_instance();

    if (! isset($framework->session->userdata['wizard'])) {
        foreach ($page['menus'] as $route => $details) {
            if ($details['category'] == lang('base_category_my_account')) {
                $my_account .= "<div class='theme-banner-my-account-links'><a href='$route'>" . $details['title'] . "</a></div>\n";
            }
        }
    }

    if (isset($page['devel_alerts']) && count($page['devel_alerts']) > 0) {
        $alert_text = "
                        <ul class='dropdown-menu'>
                            <li class='header'>You have " . count($page['devel_alerts']) . " notification" . (count($page['devel_alerts']) >  1 ? "s" : "") . "</li>
        ";
        if (isset($page['devel_alerts']['framework']))
            $alert_text .= "
                <li>
                    <div>
                        <ul class='menu'>
                            <li>
                                <a href='#'><i class='fa fa-gears warning'></i>Framework is in development mode</a>
                            </li>
                        </ul>
                    </div>
                </li>
            ";
        if (isset($page['devel_alerts']['app']))
            $alert_text .= "
                <li>
                    <div>
                        <ul class='menu'>
                            <li>
                                <a href='#'><i class='fa fa-cubes warning'></i>This app is using development code</a>
                            </li>
                        </ul>
                    </div>
                </li>
            ";
        if (isset($page['devel_alerts']['theme']))
            $alert_text .= "
                <li>
                    <div>
                        <ul class='menu'>
                            <li>
                                <a href='#'><i class='fa fa-image warning'></i>Theme is in development mode</a>
                            </li>
                        </ul>
                    </div>
                </li>
            ";
        $alert_text .= "</ul>";
        $devel_alerts = "
                <li class='dropdown notifications-menu'>
                    <a href='#' class='dropdown-toggle' data-toggle='dropdown'>
                        <i class='fa fa-warning'></i>
                        <span class='label label-warning'>" . count($page['devel_alerts']) . "</span>
                    </a>
                    $alert_text
                </li>
        ";
    }
    return "
            <header class='header'>
                <a href='/app/dashboard' class='logo'>
                    ClearOS
                </a>
                <nav class='navbar navbar-static-top' role='navigation'>
                    <a href='#' class='navbar-btn sidebar-toggle visible-xs visible-sm' data-toggle='offcanvas' role='button'>
                        <span class='sr-only'>Toggle navigation</span>
                        <span class='icon-bar'></span>
                        <span class='icon-bar'></span>
                        <span class='icon-bar'></span>
                    </a>
                    " . (! isset($framework->session->userdata['wizard']) ? "
                    <div class='theme-top-navbar'>
                        <a href='/app/dashboard'><div class='theme-dashboard'>" . lang('base_dashboard') . "</div></a>
                        <a href='#'><div class='theme-support'>" . lang('base_support') . "</div></a>
                        <a href='/app/marketplace'><div class='theme-marketplace'>" . lang('base_marketplace') . "</div></a>
                    " : "") . "
                    </div>
                    <div class='navbar-right'>
                        <ul class='nav navbar-nav'>
                            $devel_alerts
                            <!-- User Account: style can be found in dropdown.less -->
                            <li class='dropdown user user-menu'>
                                <a href='#' class='dropdown-toggle' data-toggle='dropdown'>
                                    <i class='glyphicon glyphicon-user'></i>
                                    <span>" . $page['username'] . " <i class='caret'></i></span>
                                </a>
                                <ul class='dropdown-menu'>
                                    <!-- User image -->
                                    <li class='user-header bg-light-blue'>
                                        <img src='https://www.gravatar.com/avatar/' class='img-circle' alt='User Image'>
                                        <p>
                                            " . $page['username'] . "
                                            <small>Member since Nov. 2012</small>
                                        </p>
                                    </li>
                                    <!-- Menu Body -->
                                    <li class='user-body'>
                                        $my_account
                                    </li>
                                    <!-- Menu Footer-->
                                    <li class='user-footer'>
                                        <div class='pull-left'>
                                            <a href='#' class='btn btn-default btn-flat'>Profile</a>
                                        </div>
                                        <div class='pull-right'>
                                            <a href='/app/base/session/logout' class='btn btn-default btn-flat'>Sign out</a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
    ";
}

/**
 * Returns content header
 * 
 * @return string menu HTML output
 */

function _get_content_header()
{
    // TODO
    return "";
}

/**
 * Returns footer
 * 
 * @param array $page page data
 *
 * @return string menu HTML output
 */

function _get_footer($page) 
{
    return "
    <!-- Footer -->
    <div id='theme-footer-container'>
      <section id='copyright' class='theme-copyright'>
        <div><p>Web Theme Copyright © 2010 - 2014 ClearCenter</p></div>
      </section>
    </div>
    ";
}

/**
 * Returns wizard left panel menu
 * 
 * @param array $page page data
 *
 * @return string menu HTML output
 */

function _get_wizard_menu($page)
{
    $menu_data = $page['wizard_menu'];
    $current_subcategory = NULL;

    foreach ($menu_data as $step_no => $menu) {
        // Determine sub-category icon to use
        if ($menu['subcategory'] == lang('base_network'))
            $sub_class = 'fa fa-fire';
        else if ($menu['subcategory'] == lang('base_registration'))
            $sub_class = 'fa fa-pencil';
        else if ($menu['subcategory'] == lang('base_configuration'))
            $sub_class = 'fa fa-gear';
        else if ($menu['subcategory'] == lang('base_marketplace'))
            $sub_class = 'fa fa-cloud-download';
        else if ($menu['subcategory'] == lang('base_finish'))
            $sub_class = 'fa fa-tasks';
        else
            $sub_class = 'fa fa-angle-double-right';

        $disabled = ''; 
        if ($step_no > $page['wizard_current'])
            $disabled = 'theme-link-disabled'; 
        $active = ''; 
        if ($step_no == $page['wizard_current'])
            $active = 'active'; 

        if ($current_subcategory == NULL) {
            $current_subcategory = $menu['subcategory'];
            $steps .= "<li class='treeview" . ($step_no <= $page['wizard_current'] ? " active" : "") . "'>\n";
            $steps .= "\t<a href='#'><i class='$sub_class'></i><span>" . $menu['subcategory'] . "</span></a>\n";
            $steps .= "\t<ul class='treeview-menu'>\n";
            $steps .= "\t\t<li class='$disabled $active'><a href='" . ($disabled != '' ? '#' : $menu['nav']) . "'>" . $menu['title'] . "</a></li>\n";
        } else if ($current_subcategory == $menu['subcategory']) {
            $steps .= "\t\t<li class='$disabled $active'><a href='" . ($disabled != '' ? '#' : $menu['nav']) . "'>" . $menu['title'] . "</a></li>\n";
        } else if ($current_subcategory != $menu['subcategory']) {
            $current_subcategory = $menu['subcategory'];
            $steps .= "\t</ul>\n";
            $steps .= "</li>\n";
            $steps .= "<li class='treeview" . ($step_no <= $page['wizard_current'] ? " active" : "") . "'>\n";
            $steps .= "\t<a href='#'><i class='$sub_class'></i><span>" . $menu['subcategory'] . "</span></a>\n";
            $steps .= "\t<ul class='treeview-menu'>\n";
            $steps .= "\t\t<li class='$disabled $active'><a href='" . ($disabled != '' ? '#' : $menu['nav']) . "'>" . $menu['title'] . "</a></li>\n";
        }
    }

    // Close out open HTML tags
    //-------------------------

    $steps .= "\t\t</ul>\n";
    $steps .= "</li>\n";

    return "
<aside class='left-side sidebar-offcanvas'>
    <section class='sidebar'>
        <ul class='sidebar-menu'>
            $steps
        </ul>
    </section>
</aside>
";
}

/**
 * Returns left panel menu
 * 
 * @param array $page page data
 *
 * @return string menu HTML output
 */

function _get_left_menu($page)
{
    if ($page['theme_AdminLTE']['menu'] == 1)
        return _get_left_menu_1($page);
    else
        return _get_left_menu_2($page);
}

/**
 * Returns left panel menu
 * 
 * @param array $page page data
 *
 * @return string menu HTML output
 */

function _get_left_menu_1($page)
{
    $menu_data = $page['menus'];
    $spotlights = '';

    foreach ($menu_data as $url => $page_meta) {

        // Spotlight pages (read: Dashboard and Marketplace)
        //--------------------------------------------------

        if (lang('base_category_cloud') == $page_meta['category'])
            $category_id = 'cloud';
        else if (lang('base_category_network') == $page_meta['category'])
            $category_id = 'network';
        else if (lang('base_category_gateway') == $page_meta['category'])
            $category_id = 'gateway';
        else if (lang('base_category_server') == $page_meta['category'])
            $category_id = 'server';
        else if (lang('base_category_system') == $page_meta['category'])
            $category_id = 'system';
        else if (lang('base_category_reports') == $page_meta['category'])
            $category_id = 'report';
        else
            $category_id = 'unknown';

        if ($page_meta['category'] === lang('base_category_spotlight')) {
            $spotlights .= "\t\t<li"  . ($url == $current_basename ? " class='active'" : "") . ">\n";
            $spotlights .= "\t\t\t<a href='" . $url . "' title='" . $page_meta['title'] . "'><i class='fa fa-laptop'></i>\n";
            $spotlights .= "\t\t\t<span class='title'> " . $page_meta['title'] . " </span>" . ($url == $current_base ? "<span class='selected'></span>" : "") . "\n";
            $spotlights .= "\t\t\t</a>\n";
            $spotlights .= "\t\t</li>\n";
            continue;
        }
        if ($page_meta['category'] === lang('base_category_my_account')) {
            continue;
        }

        // Close out menus on transitions
        //-------------------------------

        $new_category = ($page_meta['category'] == $current_category) ? FALSE : TRUE;
        $new_subcategory = ($page_meta['subcategory'] == $current_subcategory) ? FALSE : TRUE;

        if (empty($main_apps)) {
            // do nothing
        } else if ($new_category && $new_subcategory) {
            // Close out subcategory and category
            $main_apps .= "\t\t\t\t\t</ul>\n";
            $main_apps .= "\t\t\t\t</li>\n";
        } else if ($new_subcategory) {
            $main_apps .= "\t\t\t\t\t</ul>\n";
            $main_apps .= "\t\t\t\t</li>\n";
        }

        if ($page_meta['category'] != $current_category)
            $current_category = $page_meta['category'];
        
        // Subcategory transition
        //-----------------------

        if ($current_subcategory != $page_meta['subcategory']) {
            $current_subcategory = $page_meta['subcategory'];

            $main_apps .= "\t\t\t\t<li class='theme-hidden category-" . $category_id . " treeview" . ($page['current_subcategory'] == $page_meta['subcategory'] ? " active" : "") . "'>\n";
            $main_apps .= "\t\t\t\t\t<a href='#'><i class='fa fa-angle-double-right'></i>" . $page_meta['subcategory'] . "</a>\n";
            $main_apps .= "\t\t\t\t\t<ul class='treeview-menu'" . ($page['current_subcategory'] == $page_meta['subcategory'] ? " style='display: block;'" : "") . ">\n";
        }

        // App page
        //---------

        $main_apps .= "\t\t\t\t\t\t<li" . (basename($url) == $page['current_basename'] ? " class='active'" : "") . "><a href='" . $url . "'>" . $page_meta['title'] . "</a></li>\n";
    }

    // Close out open HTML tags
    //-------------------------

    $main_apps .= "\t\t\t\t</ul>\n";
    $main_apps .= "\t\t\t</li>\n";

    // Select radio button for category
    $active_category = array(
        'cloud' => '',
        'network' => '',
        'gateway' => '',
        'server' => '',
        'system' => '',
        'report' => ''
    );
    if (lang('base_category_cloud') == $page['current_category'])
        $active_category['cloud'] = ' checked';
    else if (lang('base_category_network') == $page['current_category'])
        $active_category['network'] = ' checked';
    else if (lang('base_category_gateway') == $page['current_category'])
        $active_category['gateway'] = ' checked';
    else if (lang('base_category_server') == $page['current_category'])
        $active_category['server'] = ' checked';
    else if (lang('base_category_system') == $page['current_category'])
        $active_category['system'] = ' checked';
    else if (lang('base_category_reports') == $page['current_category'])
        $active_category['report'] = ' checked';

    // If we're on a spotlight page (dashboard etc.) pick one
    if (!array_filter($active_category))
        $active_category['cloud'] = ' checked';
    return "
<aside class='left-side sidebar-offcanvas'>
    <section class='sidebar'>
<!--        <form action='#' method='get' class='sidebar-form'>
            <div class='input-group'>
                <input type='text' name='q' class='form-control' placeholder='Search...'>
                <span class='input-group-btn'>
                    <button type='submit' name='seach' id='search-btn' class='btn btn-flat'><i class='fa fa-search'></i></button>
                </span>
            </div>
        </form>
-->
        <form action='#' method='get' id='category-select'>
            <div class='btn-toolbar' style='margin: 9px 8px;'> <!-- TODO move to css -->
                <div class='btn-group' data-toggle='buttons'>
                    <label class='btn btn-default'>
                        <input type='radio' name='options' id='category-cloud'" . $active_category['cloud'] . "><i class='fa fa-cloud theme-navbar-category' data-placement='top' title='" . lang('base_category_cloud') . "'></i>
                    </label>
                    <label class='btn btn-default'>
                        <input type='radio' name='options' id='category-network'" . $active_category['network'] . "><i class='fa fa-fire theme-navbar-category' data-placement='top' title='" . lang('base_category_network') . "'></i>
                    </label>
                    <label class='btn btn-default'>
                        <input type='radio' name='options' id='category-gateway'" . $active_category['gateway'] . "><i class='fa fa-shield theme-navbar-category' data-placement='top' title='" . lang('base_category_gateway') . "'></i>
                    </label>
                    <label class='btn btn-default'>
                        <input type='radio' name='options' id='category-server'" . $active_category['server'] . "><i class='fa fa-hdd-o theme-navbar-category' data-placement='top' title='" . lang('base_category_server') . "'></i>
                    </label>
                    <label class='btn btn-default'>
                        <input type='radio' name='options' id='category-system'" . $active_category['system'] . "><i class='fa fa-wrench theme-navbar-category' data-placement='top' title='" . lang('base_category_system') . "'></i>
                    </label>
                    <label class='btn btn-default'>
                        <input type='radio' name='options' id='category-report'" . $active_category['report'] . "><i class='fa fa-bar-chart-o theme-navbar-category' data-placement='top' title='" . lang('base_category_reports') . "'></i>
                    </label>
                </div>
            </div>
        </form>
        <ul class='sidebar-menu'>
$main_apps
        </ul>
    </section>
</aside>
";
}

/**
 * Returns left panel menu
 * 
 * @param array $page page data
 *
 * @return string menu HTML output
 */

function _get_left_menu_2($page)
{
    $menu_data = $page['menus'];
    $main_apps = '';
    $spotlights = '';

    foreach ($menu_data as $url => $page_meta) {

        if ($page_meta['category'] === lang('base_category_my_account')) {
            continue;
        }

        $icon = 'fa fa-cloud';
        if (preg_match('/.*dashboard.*/', $url))
            $icon = 'fa fa-dashboard';
        else if (preg_match('/.*marketplace.*/', $url))
            $icon = 'fa fa-cloud-download';
        else if (lang('base_category_cloud') == $page_meta['category'])
            $icon = 'fa fa-cloud';
        else if (lang('base_category_network') == $page_meta['category'])
            $icon = 'fa fa-fire';
        else if (lang('base_category_gateway') == $page_meta['category'])
            $icon = 'fa fa-shield';
        else if (lang('base_category_server') == $page_meta['category'])
            $icon = 'fa fa-hdd-o';
        else if (lang('base_category_system') == $page_meta['category'])
            $icon = 'fa fa-gear';
        else if (lang('base_category_reports') == $page_meta['category'])
            $icon = 'fa fa-bar-chart-o';
        else if (lang('base_marketplace') == $page_meta['category'])
            $icon = 'fa fa-cloud-download';

        // Spotlight pages (read: Dashboard and Marketplace)
        //--------------------------------------------------

        if ($page_meta['category'] === lang('base_category_spotlight')) {
            $spotlights .= "\t\t<li>\n";
            $spotlights .= "\t\t\t<a href='" . $url . "' title='" . $page_meta['title'] . "'><i class='$icon'></i>\n";
            $spotlights .= "\t\t\t<span class='menu-item'> " . $page_meta['title'] . " </span>\n";
            $spotlights .= "\t\t\t</a>\n";
            $spotlights .= "\t\t</li>\n";
            continue;
        }
        // Close out menus on transitions
        //-------------------------------

        $new_category = ($page_meta['category'] == $current_category) ? FALSE : TRUE;
        $new_subcategory = ($page_meta['subcategory'] == $current_subcategory) ? FALSE : TRUE;

        if (empty($main_apps)) {
            // do nothing
        } else if ($new_category && $new_subcategory) {
            // Close out subcategory and category
            $main_apps .= "\t\t\t\t\t</ul>\n";
            $main_apps .= "\t\t\t\t</li>\n";
            $main_apps .= "\t\t\t</ul>\n";
            $main_apps .= "\t\t</li>\n";
        } else if ($new_subcategory) {
            $main_apps .= "\t\t\t\t\t</ul>\n";
            $main_apps .= "\t\t\t\t</li>\n";
        }

        if ($page_meta['category'] != $current_category) {
            $current_category = $page_meta['category'];
            $main_apps .= "\t\t<li class='"  . ($page_meta['category'] == $page['current_category'] ? " active" : "") . "'>\n";
            $main_apps .= "\t\t\t<a href='#'><i class='$icon'></i>\n";
            $main_apps .= "\t\t\t\t<span class='menu-item'> " . $page_meta['category'] . " </span><span class='fa arrow'></span>\n";
            $main_apps .= "\t\t\t</a>\n";
            $main_apps .= "\t\t\t<ul class='nav nav-second-level'>\n";
        }
        
        // Subcategory transition
        //-----------------------

        if ($current_subcategory != $page_meta['subcategory']) {
            $current_subcategory = $page_meta['subcategory'];

            $main_apps .= "\t\t\t\t<li class='"  . ($page_meta['subcategory'] == $page['current_subcategory'] ? " active" : "") . "'>\n";
            $main_apps .= "\t\t\t\t\t<a href='#'><span class='menu-item'>" . $page_meta['subcategory'] . "</span><span class='fa arrow'></span></a>\n";
            $main_apps .= "\t\t\t\t\t<ul class='nav nav-third-level'>\n";
        }

        // App page
        //---------

        $main_apps .= "\t\t\t\t\t\t<li><a href='" . $url . "'>" . htmlspecialchars($page_meta['title']) . " </a></li>\n";
    }

    // Close out open HTML tags
    //-------------------------

    $main_apps .= "\t\t\t\t\t\t</ul>\n";
    $main_apps .= "\t\t\t\t\t</li>\n";
    $main_apps .= "\t\t\t\t</ul>\n";
    $main_apps .= "\t\t\t</li>\n";

    return "
        <aside class='left-side sidebar-offcanvas'>
            <div class='navbar-default navbar-static-side' role='navigation'>
                <div class='sidebar-collapse'>
                    <ul class='nav' id='side-menu'>
                        $spotlights
                        $main_apps
                    </ul>
                </div>
            </div>
        </aside>
    ";
}

/**
 * Returns links related to page
 * 
 * @param array $links link data
 *
 * @return string menu HTML output
 */

function _get_breadcrumb_links($links)
{
    $link_html;
    $button_grp = '';

    // Use buttons, images/icons or font
    foreach ($links as $type => $link) {
        $text_right = (isset($link['display_tag']) && $link['display_tag']) ? "<span style='padding: 5px'>" . $link['tag'] . "</span>" : '';
        $text_left = '';
        if (isset($link['tag_position']) && $link['tag_position'] == 'left') {
            $text_left = $text_right;
            $text_right = '';
        }
        $button_class = '';
        if (isset($link['button']) && $link['button']) {
            $button_grp = 'btn-group';
            if ($link['button'] === 'high')
                $button_class = 'btn btn-primary';
            else if ($link['button'] === 'low')
                $button_class = 'btn btn-secondary';
            else
                $button_class = 'btn';
        }
        $id = 'bcrumb-' . rand(0 , 100);
        if (isset($link['id']))
            $id = $link['id'];

        $icon = 'fa fa-question';
        if ($type == 'settings')
            $icon = 'fa fa-gear';
        else if ($type == 'delete')
            $icon = 'fa fa-trash-o';
        else if ($type == 'checkout')
            $icon = 'fa fa-cloud-download';
        else if ($type == 'marketplace')
            $icon = 'fa fa-th-list';
        else if ($type == 'wizard')
            $icon = 'fa fa-magic';
        else if ($type == 'cancel')
            $icon = 'fa fa-ban';
        else if ($type == 'qsf')
            $icon = 'fa fa-file-code-o';
        else if ($type == 'wizard_next')
            $icon = 'fa fa-arrow-circle-right';
        else if ($type == 'wizard_previous')
            $icon = 'fa fa-arrow-circle-left';

        $link_html .= "<a href='" . $link['url'] . "' id='$id' class='$button_class " . (isset($link['class']) ? $link['class'] : "") . "'>
            $text_left<i class='$icon' title='" . $link['tag'] . "'></i>$text_right</a>";
        
    }
    return "<span class='theme-breadcrumb-links $button_grp'>" . $link_html . "</span>";
};
