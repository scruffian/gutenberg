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
	if ( gutenberg_is_experiment_enabled( 'gutenberg-full-site-editing' ) ) {
		register_block_type(
			'core/site-logo',
			array(
				'render_callback' => 'render_block_core_site_logo',
			)
		);
		add_filter( 'pre_set_theme_mod_custom_logo', 'sync_site_logo_to_theme_mod' );
		add_filter( 'theme_mod_custom_logo', 'override_custom_logo_theme_mod' );
	}
}
add_action( 'init', 'register_block_core_site_logo' );

function override_custom_logo_theme_mod( $custom_logo ) {
	$sitelogo = get_option( 'sitelogo' );
	
	return false === $sitelogo ? $custom_logo : $sitelogo; 
}

function sync_site_logo_to_theme_mod( $custom_logo ) {
	if ( $custom_logo ) {
		update_option( 'sitelogo', $custom_logo );
	}
	return $custom_logo;
}

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
