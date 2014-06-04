<?php

// General package information
//----------------------------

$package['name'] = 'theme-AdminLTE';
$package['title'] = 'AdminLTE';
$package['description'] = 'AdminLTE theme';

$package['version'] = '1.0';
$package['release'] = '0.0';

$package['vendor'] = 'ClearFoundation';
$package['packager'] = 'ClearFoundation';
$package['license'] = 'Copyright ClearFoundation 2014.  All rights reserved.';
$package['credits'] = array(
    0 => array(
        'contact' => 'Abdullah Almsaeed',
        'url' => 'http://almsaeedstudio.com/'
    )
);
    
$package['settings'] = array(
    'menu' => array(
        'lang_tag' => 'base_menu',
        'type' => 'dropdown',
        'options' => array(
            1 => 'Type 1',
            2 => 'Type 2',
        ),
        'required' => TRUE,
        'default' => 0,
    ),
    'css' => array(
        'lang_tag' => 'base_css_style',
        'type' => 'dropdown',
        'options' => array(
            'skin-blue' => 'Blue',
            'skin-black' => 'Black',
        ),
        'required' => TRUE,
        'default' => 'blue',
    ),
    'color_1' => array(
        'lang_tag' => 'base_color_primary',
        'type' => 'color',
        'required' => FALSE,
        'default' => NULL,
    ),
    'color_2' => array(
        'lang_tag' => 'base_color_secondary',
        'type' => 'color',
        'required' => FALSE,
        'default' => NULL,
    ),
    'color_3' => array(
        'lang_tag' => 'base_color_tertiary',
        'type' => 'color',
        'required' => FALSE,
        'default' => NULL,
    ),
);

// vim: ts=4 syntax=php
