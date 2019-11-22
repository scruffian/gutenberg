/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { MediaPlaceholderSlot } from '@wordpress/block-editor';

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

const MediaPlaceholderAddLogoButton = () => {
	return (
		<MediaPlaceholderSlot>
			{ ( props ) => {
				if ( props.name !== name ) {
					return null;
				}

				return (
					<Button
						isLarge
						href="https://test.com"
					>
						{ __( 'Create A Logo' ) }
					</Button>
				);
			} }
		</MediaPlaceholderSlot>
	);
};

const registerPlugin = wp.plugins.registerPlugin;
registerPlugin( 'media-placeholder-add-logo-button', { render: MediaPlaceholderAddLogoButton } );
