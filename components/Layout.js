import Header from './Header';
import Footer from './Footer';
const Layout = ({ children }) => {
	return (
		<React.Fragment>
			<Header />

			{children}
			
		</React.Fragment>
	);
};
export default Layout;
