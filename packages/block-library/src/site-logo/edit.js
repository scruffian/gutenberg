/**
 * WordPress dependencies
 */
import {
	useEntityProp,
	__experimentalUseEntitySaving,
} from '@wordpress/core-data';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { MediaPlaceholder, RichText } from '@wordpress/block-editor';

function onSelectLogo( setAttributes, setLogo, save ) {
	return ( media ) => {
		if ( ! media || ! media.url ) {
			setAttributes( { url: undefined, id: undefined } );
			return;
		}

		setAttributes( {
			url: media.url,
			id: media.id,
		} );

		setLogo( media.id.toString() );
		save();
	};
}

export default function SiteTitleEdit( { setAttributes } ) {
	const [ logo, setLogo ] = useEntityProp( 'root', 'site', 'sitelogo' );
	const [ isDirty, isSaving, save ] = __experimentalUseEntitySaving(
		'root',
		'site',
		'sitelogo'
	);

	const onSelectMedia = onSelectLogo( setAttributes, setLogo, save );

	return (
		<>
			<Button
				isPrimary
				className="wp-block-site-title__save-button"
				disabled={ ! isDirty || ! logo }
				isBusy={ isSaving }
				onClick={ save }
			>
				{ __( 'Update' ) }
			</Button>
			<MediaPlaceholder
				onSelect={ onSelectMedia }
			/>
			<RichText
				tagName="h1"
				placeholder={ __( 'Site Logo' ) }
				value={ logo }
				onChange={ setLogo }
				allowedFormats={ [] }
			/>
		</>
	);
}
