/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import icon from './icon';
import edit from './edit';

const { name } = metadata;
export { metadata, name };

export const settings = {
	title: __( 'Site Logo' ),
	description: __( 'Show a site logo' ),
	icon,
	edit,
	attributes: {
		align: {
			type: 'string',
		},
	},
};

function replaceMediaPlaceholder( MediaPlaceholder ) {
	return function( props ) {
		const addLogo = ( <Button href="https://looka.com">Add Logo</Button> );
		return (
			<div>
				<MediaPlaceholder { ...props } />
				{ props.name === name ? addLogo : null }
			</div>
		);
	};
}

wp.hooks.addFilter(
	'editor.MediaPlaceholder',
	'my-plugin/replace-media-placeholder',
	replaceMediaPlaceholder
);
