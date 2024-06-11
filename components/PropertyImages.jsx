import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';

const PropertyImages = ({ images }) => {
	return (
		// 1. we need to wrap the images in a Gallery component
		<Gallery>
			<section className="bg-blue-500  p-4">
				<div className="container mx-auto">
					{images.length === 1 ? (
						// 2. we need to wrap each image in an Item component
						<Item original={images[0]} thumbnail={images[0]} width="1024" height="768">
							{/* 3. we need to call the function inside the Item component */}
							{({ ref, open }) => (
								<Image
									// 4. we need to pass the ref and onClick open function
									ref={ref}
									onClick={open}
									src={images[0]}
									alt=""
									className="object-cover h-[400px] mx-auto rounded-xl"
									width={1800}
									height={400}
									priority={true}
								/>
							)}
						</Item>
					) : (
						<div className="grid grid-cols-2 gap-4">
							{images.map((image, index) => (
								<div
									key={index}
									className={`
                    ${images.length === 3 && index === 2 ? 'col-span-2' : 'col-span-1'}
                    `}
								>
									<Item original={image} thumbnail={image} width="1000" height="600" >
										{({ ref, open }) => (
											<Image
												ref={ref}
												onClick={open}
												src={image}
												alt=""
												className="object-cover h-[400px] w-full rounded-xl cursor-zoom-in"
												width={0}
												height={0}
												sizes="100vw"
												priority={true}
												cursor="pointer"
											/>
										)}
									</Item>
								</div>
							))}
						</div>
					)}
				</div>
			</section>
		</Gallery>
	);
};

export default PropertyImages;
