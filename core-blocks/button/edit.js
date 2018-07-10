/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Component,
	Fragment,
} from '@wordpress/element';
import { compose } from '@wordpress/compose';
import {
	Dashicon,
	IconButton,
	withFallbackStyles,
} from '@wordpress/components';
import {
	URLInput,
	RichText,
	BlockControls,
	BlockAlignmentToolbar,
	InspectorControls,
	ContrastChecker,
	withColors,
	PanelColorSettings,
} from '@wordpress/editor';

/**
 * Internal dependencies
 */
import './editor.scss';

const { getComputedStyle } = window;

const FallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { textColor, backgroundColor } = ownProps;
	const backgroundColorValue = backgroundColor && backgroundColor.value;
	const textColorValue = textColor && textColor.value;
	//avoid the use of querySelector if textColor color is known and verify if node is available.
	const textNode = ! textColorValue && node ? node.querySelector( '[contenteditable="true"]' ) : null;
	return {
		fallbackBackgroundColor: backgroundColorValue || ! node ? undefined : getComputedStyle( node ).backgroundColor,
		fallbackTextColor: textColorValue || ! textNode ? undefined : getComputedStyle( textNode ).color,
	};
} );

class ButtonEdit extends Component {
	constructor() {
		super( ...arguments );
		this.nodeRef = null;
		this.bindRef = this.bindRef.bind( this );
		this.updateAlignment = this.updateAlignment.bind( this );
	}

	updateAlignment( nextAlign ) {
		this.props.setAttributes( { align: nextAlign } );
	}

	bindRef( node ) {
		if ( ! node ) {
			return;
		}
		this.nodeRef = node;
	}

	render() {
		const {
			attributes,
			backgroundColor,
			textColor,
			setBackgroundColor,
			setTextColor,
			fallbackBackgroundColor,
			fallbackTextColor,
			setAttributes,
			isSelected,
			className,
		} = this.props;

		const {
			text,
			url,
			title,
			align,
		} = attributes;

		return (
			<Fragment>
				<BlockControls>
					<BlockAlignmentToolbar value={ align } onChange={ this.updateAlignment } />
				</BlockControls>
				<span className={ className } title={ title } ref={ this.bindRef }>
					<RichText
						tagName="span"
						placeholder={ __( 'Add text…' ) }
						value={ text }
						onChange={ ( value ) => setAttributes( { text: value } ) }
						formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
						className={ classnames(
							'wp-block-button__link', {
								'has-background': backgroundColor.value,
								[ backgroundColor.class ]: backgroundColor.class,
								'has-text-color': textColor.value,
								[ textColor.class ]: textColor.class,
							}
						) }
						style={ {
							backgroundColor: backgroundColor.value,
							color: textColor.value,
						} }
						keepPlaceholderOnFocus
					/>
					<InspectorControls>
						<PanelColorSettings
							title={ __( 'Color Settings' ) }
							colorSettings={ [
								{
									value: backgroundColor.value,
									onChange: setBackgroundColor,
									label: __( 'Background Color' ),
									// translators: %s: The name of the color e.g: "vivid red" or color hex code if name is not available e.g: "#f00".
									colorIndicatorAriaLabel: __( '(current background color: %s)' ),
								},
								{
									value: textColor.value,
									onChange: setTextColor,
									label: __( 'Text Color' ),
									// translators: %s: The name of the color e.g: "vivid red" or color hex code if name is not available e.g: "#f00".
									colorIndicatorAriaLabel: __( '(current text color: %s)' ),
								},
							] }
						>
							<ContrastChecker
								{ ...{
									isLargeText: true,
									textColor: textColor.value,
									backgroundColor: backgroundColor.value,
									fallbackBackgroundColor,
									fallbackTextColor,
								} }
							/>
						</PanelColorSettings>
					</InspectorControls>
				</span>
				{ isSelected && (
					<form
						className="core-blocks-button__inline-link"
						onSubmit={ ( event ) => event.preventDefault() }>
						<Dashicon icon="admin-links" />
						<URLInput
							value={ url }
							onChange={ ( value ) => setAttributes( { url: value } ) }
						/>
						<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
					</form>
				) }
			</Fragment>
		);
	}
}

export default compose( [
	withColors( 'backgroundColor', { textColor: 'color' } ),
	FallbackStyles,
] )( ButtonEdit );
