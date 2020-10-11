import Layout from '../../components/Layout';
import Private from '../../components/authentication/Private';
import ProfileUpdate from '../../components/ProfileUpdate';
const UserUpadte = () => {
	return (
		<Layout>
			<Private>
				<div className="container-fluid">
					<div className="row">
						<h1>update profile</h1>
						{/* <ProfileUpdate /> */}
					</div>
				</div>
			</Private>
		</Layout>
	);
};
export default UserUpadte;
