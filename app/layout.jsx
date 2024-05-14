import "@/assets/styles/globals.css"

export const metadata = {
	title: 'PropertyPulse | Find the Perfect Rental',
	description: "Find your next rental property with PropertyPulse. Search for apartments, houses, condos, and more. List your property for free.",
	keywords: "rental, property, apartment, house, condo, real estate, property management, property manager, landlord, tenant, rent, lease, propertypulse, property pulse",
};

const MainLayout = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<div>{children}</div>
			</body>
		</html>
	);
};

export default MainLayout;
