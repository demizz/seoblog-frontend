import { APP_NAME } from '../config';
import Link from 'next/link';
import Router from 'next/router';
import { signout, isAuth } from '../RequestApi/authRequest';
import { useState } from 'react';
import Search from '../components/Search';
import { API } from '../config.js';
import NProgress from 'nprogress';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap';
Router.onRouteChangeStart = (url) => NProgress.start();

Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();
const Header = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);
	const imageSource =
		isAuth() && isAuth().photo
			? `${API}/users/photo/${isAuth().username}`
			: `/static/images/default.jpg`;
	return (
		<React.Fragment>
			<Navbar id="Navbar" color="light" light expand="md">
				<Link href="/" style={{ color: 'black', fontWeight: 'bold' }}>
					<a>{APP_NAME}</a>
				</Link>

				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="ml-auto" navbar>
						{/* <React.Fragment>
							<NavItem>
								<Link href="/blogs">
									<NavLink style={{ cursor: 'pointer' }}>blogs</NavLink>
								</Link>
							</NavItem>
						</React.Fragment> */}
						{!isAuth() && (
							<React.Fragment>
								<NavItem>
									<Link href="/register">
										<NavLink style={{ cursor: 'pointer' }}>Register</NavLink>
									</Link>
								</NavItem>

								<NavItem>
									<Link href="/login">
										<NavLink style={{ cursor: 'pointer' }}>Login</NavLink>
									</Link>
								</NavItem>
							</React.Fragment>
						)}

						{isAuth() && isAuth().role === 1 && (
							<NavItem>
								<Link href="/admin">
									<NavLink style={{ cursor: 'pointer' }}>
										{`${isAuth().name} is Dashboard`}
									</NavLink>
								</Link>
							</NavItem>
						)}
						{isAuth() && isAuth().role !== 1 && (
							<NavItem>
								<Link href="/user">
									<NavLink style={{ cursor: 'pointer' }}>
										{`${isAuth().name.toString()} is Dashboard`}
									</NavLink>
								</Link>
							</NavItem>
						)}
						{isAuth() && (
							<NavItem>
								<Link href={`/profile/${isAuth().username}`}>
									<NavLink>
										<img
											style={{
												cursor: 'pointer',
												maxHeight: '30px',
												maxWidth: '30px',
												borderRadius: '50%',
											}}
											src={imageSource}
											alt={isAuth().name}
											className="user-pic"
										/>
									</NavLink>
								</Link>
							</NavItem>
						)}
						{isAuth() && (
							<NavItem>
								<NavLink
									style={{ cursor: 'pointer' }}
									onClick={() => signout(() => Router.replace('/login'))}
								>
									Logout
								</NavLink>
							</NavItem>
						)}
						{/* {isAuth() && isAuth().role !== 1 && (
							<NavItem>
								<Link href="/user/blog/create">
									<NavLink
										className="btn btn-primary text-white"
										style={{ cursor: 'pointer' }}
									>
										Create new Blog
									</NavLink>
								</Link>
							</NavItem>
						)} */}
					</Nav>
				</Collapse>
			</Navbar>
			<Search />
		</React.Fragment>
	);
};

export default Header;
