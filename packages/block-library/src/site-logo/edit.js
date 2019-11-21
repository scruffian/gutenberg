/**
 * WordPress dependencies
 */
import {
	useEntityProp,
	__experimentalUseEntitySaving,
} from '@wordpress/core-data';

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

	if ( isDirty ) {
		save();
	}

	return (
		<LogoEdit mediaHandler={ onSelectLogo( props.setAttributes, setLogo ) } logo={ logo } { ...props } />
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
