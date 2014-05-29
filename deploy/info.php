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
            0 => 'Type 1',
            1 => 'Type 2',
        ),
        'default' => 0,
    ),
);

// vim: ts=4 syntax=php
