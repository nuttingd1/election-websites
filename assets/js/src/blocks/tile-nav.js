const { registerBlockType } = wp.blocks;
const { createElement } = wp.element;

const { createHigherOrderComponent } = wp.compose;

const { InspectorControls, URLInput } = wp.blockEditor;
const {
	PanelBody,
	PanelRow,
	SelectControl,
	TextControl,
	ExternalLink,
} = wp.components;

const PARENT_BLOCK = 'ctcl-election-website/tile-nav-section-block';
const CHILD_BLOCK = 'ctcl-election-website/tile-nav-block';

const getIconEl = ( attributes ) => {
	const { icon } = attributes;
	if ( icon ) {
		// eslint-disable-next-line no-undef
		const iconUrl = `${ blockEditorVars.baseUrl }/${ icon }.svg`;
		return createElement( 'img', {
			height: 50,
			src: iconUrl,
		} );
	}
	return null;
};

registerBlockType( PARENT_BLOCK, {
	title: 'Tile Navigation',
	icon: 'screenoptions',
	category: 'election-blocks',

	edit() {
		return createElement(
			'div',
			{
				className: 'tile-nav-section-block-editor',
			},
			createElement( wp.blockEditor.InnerBlocks, {
				allowedBlocks: [ CHILD_BLOCK ],
			} )
		);
	},

	save() {
		return createElement(
			'div',
			{
				className: 'tile-wrapper',
			},
			createElement( wp.blockEditor.InnerBlocks.Content )
		);
	},
} );

registerBlockType( CHILD_BLOCK, {
	title: 'Tile',
	icon: 'screenoptions',
	category: 'election-blocks',
	parent: [ PARENT_BLOCK ],
	attributes: {
		icon: {
			type: 'string',
		},
		label: {
			type: 'string',
			default: '',
		},
		url: {
			type: 'string',
		},
	},

	edit( props ) {
		function updateLabel( value ) {
			props.setAttributes( { label: value } );
		}

		function updateLink( url, post ) {
			props.setAttributes( { url } );
			if ( post ) {
				props.setAttributes( { label: post.title } );
			}
		}

		function updateIcon( value ) {
			props.setAttributes( { icon: value } );
		}

		const { label, icon } = props.attributes;
		const isEmpty = ! label && ! icon;

		return (
			<div>
				<InspectorControls>
					<div className="tile-nav-settings">
						<PanelBody title="Tile" initialOpen={ true }>
							<PanelRow>
								<TextControl
									label="Label"
									placeholder="Enter Label"
									onChange={ updateLabel }
									value={ props.attributes.label }
								/>
							</PanelRow>
							<PanelRow>
								<URLInput
									label="Link"
									value={ props.attributes.url }
									onChange={ updateLink }
								/>
							</PanelRow>
							<PanelRow>
								<SelectControl
									label="Icon"
									value={ props.attributes.icon }
									options={ [
										{
											value: null,
											label: 'Select an Icon',
											key: '_placeholder',
										},
										...Object.entries(
											// eslint-disable-next-line no-undef
											blockEditorVars.iconOptions
										).map( ( [ value, itemLabel ] ) => ( {
											value,
											itemLabel,
											key: value,
										} ) ),
									] }
									onChange={ updateIcon }
								/>
							</PanelRow>
						</PanelBody>
						<PanelBody title="View Page" initialOpen={ true }>
							<PanelRow>
								<ExternalLink href={ props.attributes.url }>
									{ props.attributes.url }
								</ExternalLink>
							</PanelRow>
						</PanelBody>
					</div>
				</InspectorControls>
				<div className="tile-nav-block-editor">
					<div className="tile">
						{ /* eslint-disable jsx-a11y/label-has-for */ }
						{ isEmpty ? (
							<span className="placeholder">
								Set tile values in control panel to your right.
							</span>
						) : null }
						{ ! isEmpty ? getIconEl( props.attributes ) : null }
						{ ! isEmpty ? <label>{ label }</label> : null }
						{ /* eslint-enable jsx-a11y/label-has-for */ }
					</div>
				</div>
			</div>
		);
	},

	save( props ) {
		return (
			<a className="tile" href={ props.attributes.url }>
				<div className="bounding-box" id={ props.attributes.icon } />
				<span>{ props.attributes.label }</span>
			</a>
		);
	},
} );

const withClientIdClassName = createHigherOrderComponent(
	( BlockListBlock ) => {
		return ( props ) => {
			return (
				<BlockListBlock
					{ ...props }
					className={ 'tile-nav-block-editor-wrapper' }
				/>
			);
		};
	},
	'withClientIdClassName'
);

wp.hooks.addFilter(
	'editor.BlockListBlock',
	PARENT_BLOCK,
	withClientIdClassName
);
