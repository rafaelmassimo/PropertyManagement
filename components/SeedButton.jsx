'use client'
import { toast } from "react-toastify";

const SeedButton = ({property}) => {

    const handleSeedClick = async () => {

        const data = {
            recipient: property.owner,
			property: property._id,
        }
        try {
            const res = await fetch('/api/seed', {
                method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
            });
            if (res.status === 200) {
                toast.success('Seed Messages Success');
            }
        } catch (error) {
            console.log(error);
            toast.error('Seed Messages Failed');
        }
    }
	return (
		<div>
			<button
				onClick={handleSeedClick}
				className="mt-4 bg-sky-500 text-white py-1 px-3 rounded-md"
			>
				Seed Messages
			</button>
		</div>
	);
};

export default SeedButton;
