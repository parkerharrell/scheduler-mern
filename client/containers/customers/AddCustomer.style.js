const styles = theme => ({
	root: {
		minWidth: 320,
		maxWidth: 800,
		height: 'auto',
		position: 'absolute',
		top: 100,
		left: 0,
		right: 0,
		margin: 'auto',
		marginBottom: 100,
		[theme.breakpoints.down('sm')]: {
			top: '100px !important',
		},
	},
	card: {
		padding: 20,
		overflow: 'auto',
		boxShadow: 'none',
		[theme.breakpoints.down('sm')]: {
			padding: 5,
		},
	},
	cardHeader: {
		textAlign: 'center',
		fontWeight: 'bold',
		[theme.breakpoints.down('sm')]: {
			paddingBottom: 0,
		},
	},
	btnDiv: {
		textAlign: 'center'
	},
	btn: {
		marginTop: 21,
	},
	radiogroup: {
		flexDirection: 'row',
		marginLeft: -12,
    zoom: 0.8,
		marginTop: 2,
		zIndex: 1000,
		position: 'relative',
	},
	label: {
		height: 30,
		margin: 0,
		fontSize: '1.2em',
		marginRight: 15,
	},
});

export default styles;
