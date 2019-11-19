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
	return sprintf( '<h1>%s</h1>', get_bloginfo( 'name' ) );
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
