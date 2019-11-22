/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';

/**
 * Internal dependencies
 */

const { Fill, Slot } = createSlotFill( 'MediaPlaceholder' );

const MediaPlaceholderFill = ( { children } ) => {
	return (
		<Fill>
			{ children }
		</Fill>
	);
};

const MediaPlaceholderSlot = MediaPlaceholderFill;

MediaPlaceholderSlot.Slot = Slot;

export default MediaPlaceholderSlot;
