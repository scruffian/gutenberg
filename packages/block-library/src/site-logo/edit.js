/**
 * WordPress dependencies
 */
import {
	useEntityProp,
	__experimentalUseEntitySaving,
} from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';
import { MediaPlaceholder, RichText } from '@wordpress/block-editor';

function onSelectLogo( setAttributes, setLogo ) {
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
	};
}

export default function SiteTitleEdit( { setAttributes } ) {
	const [ logo, setLogo ] = useEntityProp( 'root', 'site', 'sitelogo' );
	const [ isDirty, , save ] = __experimentalUseEntitySaving(
		'root',
		'site',
		'sitelogo'
	);

	if ( isDirty ) {
		save();
	}

	const onSelectMedia = onSelectLogo( setAttributes, setLogo );

	return (
		<>
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
