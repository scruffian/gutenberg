<?php
/**
 * Server-side rendering of the `core/site-logo` block.
 *
 * @package WordPress
 */

/**
 * Renders the `core/site-logo` block on the server.
 *
 * @return string The render.
 */
function render_block_core_site_logo() {
	$site_logo = wp_get_attachment_image_src( get_option( 'sitelogo' ), 'thumbnail' );
	return '<img src="' . $site_logo[0] . '"
		width="'. $site_logo[1] .'"
		height="'. $site_logo[2] . '" />';
}

/**
 * Registers the `core/site-logo` block on the server.
 */
function register_block_core_site_logo() {
	register_block_type(
		'core/site-logo',
		array(
			'render_callback' => 'render_block_core_site_logo',
		)
	);
}
add_action( 'init', 'register_block_core_site_logo' );

function register_block_core_site_logo_setting() {
	register_setting(
		'general',
		'sitelogo',
		array(
			'show_in_rest' => array(
				'name' => 'sitelogo',
			),
			'type'         => 'string',
			'description'  => __( 'Site logo.' ),
		)
	);
}

add_action( 'rest_api_init', 'register_block_core_site_logo_setting', 10 );
