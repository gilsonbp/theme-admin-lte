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

function theme_page_javascript($custom_settings)
{
    $theme_url = clearos_theme_url('AdminLTE');

    // The version is used to avoid upgrade/caching issues.  Bump when required.
    $version = '7.0.0';

    // FIXME: review all of these
    return "

<script type='text/javascript' src='$theme_url/js/jquery.min.js'></script>
<script type='text/javascript' src='$theme_url/js/jquery.cookie.js'></script>
<script type='text/javascript' src='$theme_url/js/jquery-ui-1.10.4.min.js'></script>
<script type='text/javascript' src='$theme_url/js/bootstrap.min.js'></script>
<script type='text/javascript' src='$theme_url/js/lightbox.min.js'></script>
<script type='text/javascript' src='$theme_url/js/jquery.dotdotdot.min.js'></script>
<script type='text/javascript' src='$theme_url/js/plugins/bootstrap-dialog/bootstrap-dialog.min.js'></script>
<script type='text/javascript' src='$theme_url/js/plugins/metisMenu/jquery.metisMenu.js'></script>
<script type='text/javascript' src='$theme_url/js/plugins/colorpicker/bootstrap-colorpicker.min.js'></script>
<script type='text/javascript' src='$theme_url/js/plugins/datatables/jquery.dataTables.js'></script>
<script type='text/javascript' src='$theme_url/js/plugins/sparkline/jquery.sparkline.min.js'></script>
<script type='text/javascript' src='$theme_url/js/plugins/flot/jquery.flot.min.js'></script>
<script type='text/javascript' src='$theme_url/js/plugins/flot/jquery.flot.resize.min.js'></script>
<script type='text/javascript' src='$theme_url/js/plugins/flot/jquery.flot.pie.min.js'></script>
<script type='text/javascript' src='$theme_url/js/plugins/flot/jquery.flot.categories.min.js'></script>
<script type='text/javascript' src='$theme_url/js/nav-menu-" . $custom_settings['menu'] . ".js'></script>

<!-- Review with Pete -->
<script type='text/javascript' src='/themes/default/js/jqplot/jquery.jqplot.min.js?v=6.5.0'></script>
<script type='text/javascript' src='/themes/default/js/jqplot/plugins/jqplot.json2.min.js?v=6.5.0'></script>
<script type='text/javascript' src='/themes/default/js/jqplot/plugins/jqplot.barRenderer.min.js?v=6.5.0'></script>
<script type='text/javascript' src='/themes/default/js/jqplot/plugins/jqplot.pieRenderer.min.js?v=6.5.0'></script>
<script type='text/javascript' src='/themes/default/js/jqplot/plugins/jqplot.dateAxisRenderer.min.js?v=6.5.0'></script>
<script type='text/javascript' src='/themes/default/js/jqplot/plugins/jqplot.categoryAxisRenderer.min.js?v=6.5.0'></script>
<script type='text/javascript' src='/themes/default/js/jqplot/plugins/jqplot.canvasAxisLabelRenderer.min.js?v=6.5.0'></script>
<script type='text/javascript' src='/themes/default/js/jqplot/plugins/jqplot.canvasAxisTickRenderer.min.js?v=6.5.0'></script>
<script type='text/javascript' src='/themes/default/js/jqplot/plugins/jqplot.canvasTextRenderer.min.js?v=6.5.0'></script>
<script type='text/javascript' src='/themes/default/js/jqplot/plugins/jqplot.pointLabels.min.js?v=6.5.0'></script>
<script type='text/javascript' src='/themes/default/js/jqplot/plugins/jqplot.highlighter.min.js?v=6.5.0'></script>

<!--[if IE 7]>

<h1>Your browser is out of date, please update your browser by going to www.microsoft.com/download</h1>

<![endif]-->

<!-- Custom Javascript -->
<script type='text/javascript' src='$theme_url/js/theme.js?v=$version'></script>

";
}
