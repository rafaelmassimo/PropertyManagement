const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

//Fetch all properties
export async function fetchProperties() {
	try {
		//handle the case the domain is not available yet
		if (!apiDomain) {
			return [];
		}
		const response = await fetch(`${apiDomain}/properties`, { cache: 'no-store' });

		if (!response.ok) {
			throw new Error('Something went wrong fetching data');
		}

		return response.json();
	} catch (error) {
		console.log(error);
	}
}

//Fetch one property by ID
export async function fetchPropertiesById(id) {
	try {
		//handle the case the domain is not available yet
		if (!apiDomain) {
			return null;
		}
		const response = await fetch(`${apiDomain}/properties/${id}`, { cache: 'no-store' });

		if (!response.ok) {
			throw new Error('Something went wrong fetching data');
		}
		return response.json();
	} catch (error) {
		console.log(error);
		return null;
	}
}
