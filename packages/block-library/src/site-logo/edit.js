/**
 * WordPress dependencies
 */
import {
	useEntityProp,
	__experimentalUseEntitySaving,
} from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { ImageEdit, composed } from '../image/edit';

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

function LogoEditWithEntity( props ) {
	const [ logo, setLogo ] = useEntityProp( 'root', 'site', 'sitelogo' );
	const [ isDirty, , save ] = __experimentalUseEntitySaving(
		'root',
		'site',
		'sitelogo'
	);
	const url = useSelect(
		( select ) => {
			const mediaItem = select( 'core' ).getEntityRecord( 'root', 'media', logo );
			return mediaItem && mediaItem.source_url;
		}, [ logo ] );

	if ( isDirty ) {
		save();
	}

	return (
		<LogoEdit mediaHandler={ onSelectLogo( props.setAttributes, setLogo ) } { ...props } attributes={ { ...props.attributes, id: logo, url } } />
	);
}
class LogoEdit extends ImageEdit {
	constructor( props ) {
		super( props );
		this.onSelectImage = this.onSelectImage.bind( this );
	}

	onSelectImage( media ) {
		super.onSelectImage( media );
		this.props.mediaHandler( media );
	}
}
export default composed( LogoEditWithEntity );
