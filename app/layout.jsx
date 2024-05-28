import '@/assets/styles/globals.css';
import AuthProvider from '@/components/AuthProvider';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
	title: 'PropertyPulse | Find the Perfect Rental',
	description:
		'Find your next rental property with PropertyPulse. Search for apartments, houses, condos, and more. List your property for free.',
	keywords:
		'rental, property, apartment, house, condo, real estate, property management, property manager, landlord, tenant, rent, lease, propertypulse, property pulse',
};

const MainLayout = ({ children }) => {
	return (
		<AuthProvider>
			<html lang="en">
				<body>
					<Navbar />
					<main>{children}</main>
					<Footer />
					<ToastContainer />
				</body>
			</html>
		</AuthProvider>
	);
};

export default MainLayout;
