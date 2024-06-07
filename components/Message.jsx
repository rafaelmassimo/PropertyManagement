'use client';

import { useGlobalContext } from '@/context/GlobalContext';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Message = ({ message }) => {
	const [isRead, setIsRead] = useState(message.read);
	const [isDeleted, setIsDeleted] = useState(false);

	const { setUnreadCount } = useGlobalContext();

	const handleReadCLick = async () => {
		try {
			const res = await fetch(`/api/messages/${message._id}`, {
				method: 'PUT',
				cache: 'no-cache',
			});
			if (res.status === 200) {
				const { read } = await res.json();

				setIsRead(read);
				setUnreadCount((prev) => (read ? prev - 1 : prev + 1)); // Here you can increase or decrease the count of unread messages globally

				if (read) {
					toast.success('Marked as Read');
				} else {
					toast.success('Marked as New');
				}
			}
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong');
		}
	};

	const handleDeleteClick = async () => {
		try {
			const res = await fetch(`/api/messages/${message._id}`, {
				method: 'DELETE',
				cache: 'no-cache',
			});

			if (res.status === 200) {
				setIsDeleted(true);
				setUnreadCount((prev) => prev - 1); // Here you can increase the count of unread messages globally

				toast.success('Message Deleted');
			}
		} catch (error) {
			console.log(error);
			toast.error('Message was not deleted');
		}
	};
	// To make the message disappear after it is deleted, because is not going to render anymore this message in the page
	if (isDeleted) {
		return null;
	}

	return (
		<div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
			{!isRead && (
				<div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md">
					New
				</div>
			)}
			<h2 className="text-xl mb-4">
				<span className="font-bold">Property Inquiry:</span>
				{message.property.name}
			</h2>
			<p className="text-gray-700">{message.body}</p>

			<ul className="mt-4">
				<li>
					<strong>Name:</strong> {message.sender.username}
				</li>

				<li>
					<strong>Reply Email:</strong>
					<a href={`mailto:${message.email}`} className="text-blue-500">
						{' '}
						{message.email}
					</a>
				</li>
				<li>
					<strong>Reply Phone:</strong>
					<a href={`tel:${message.phone}`} className="text-blue-500">
						{' '}
						{message.phone}
					</a>
				</li>
				<li>
					<strong>Received:</strong> {new Date(message.createdAt).toLocaleString()}
				</li>
			</ul>
			<button
				onClick={handleReadCLick}
				className={`mt-4 mr-3 ${
					isRead ? 'bg-gray-300' : 'bg-blue-500 text-white'
				} py-1 px-3 rounded-md`}
			>
				{isRead ? 'Mark as New' : 'Mark as Read'}
			</button>
			<button
				onClick={handleDeleteClick}
				className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
			>
				Delete
			</button>
		</div>
	);
};

export default Message;
