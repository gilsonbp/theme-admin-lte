<?php

/**
 * Default scripts for the theme.
 *
 * These scripts are added just before the closing </body> tag.
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

/**
 * Returns additional <head> data required for the theme.
 *
 * @return string HTML output
 */

function theme_page_javascript()
{
    $theme_url = clearos_theme_url('AdminLTE');

    // The version is used to avoid upgrade/caching issues.  Bump when required.
    $version = '7.0.0';

    // FIXME: review all of these
    return "

<script type='text/javascript' src='$theme_url/js/jquery.min.js'></script>
<script type='text/javascript' src='$theme_url/js/jquery.cookie.js'></script>
<script type='text/javascript' src='$theme_url/js/jquery-ui-1.10.4.min.js'></script>
<script type='text/javascript' src='$theme_url/js/plugins/bootstrap-dialog/bootstrap-dialog.min.js'></script>
<script type='text/javascript' src='$theme_url/js/plugins/datatables/jquery.dataTables.js'></script>
<script type='text/javascript' src='$theme_url/js/plugins/sparkline/jquery.sparkline.min.js'></script>

<!--[if IE 7]>

<h1>Your browser is out of date, please update your browser by going to www.microsoft.com/download</h1>

<![endif]-->

<!-- MAIN APP JS FILE -->
<script src='$theme_url/js/AdminLTE/app.js'></script>

<!-- Custom Javascript -->
<script type='text/javascript' src='$theme_url/js/theme.js?v=$version'></script>

";
}
