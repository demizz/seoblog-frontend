export default () => {
	return (
		<footer
			style={{
				position: 'fixed',
				bottom: 0,
				left: 0,
				background: 'grey',
				height: '50px',
				width: '100%',
			}}
		>
			&copy; {new Date().getFullYear()}
		</footer>
	);
};
