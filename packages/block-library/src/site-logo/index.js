/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

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
		id: {
			type: 'string',
		},
		url: {
			type: 'string',
		},
		align: {
			type: 'string',
		},
	},
};
