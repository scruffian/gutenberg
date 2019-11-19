/**
 * WordPress dependencies
 */
import {
	useEntityProp,
	__experimentalUseEntitySaving,
} from '@wordpress/core-data';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

export default function SiteTitleEdit() {
	const [ logo, setLogo ] = useEntityProp( 'root', 'site', 'sitelogo' );
	const [ isDirty, isSaving, save ] = __experimentalUseEntitySaving(
		'root',
		'site',
		'sitelogo'
	);
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
