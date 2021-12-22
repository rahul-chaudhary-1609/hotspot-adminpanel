import axios from 'axios';
import qs from 'qs';

 export const baseURL = `http://3.228.159.69/admin/`;

 export const baseURLWeb = `http://3.228.159.69/website/`;

// export const baseURL = `https://api.togohotspot.com/admin/`;

// export const baseURLWeb = `https://api.togohotspot.com/website/`;

// export const baseURL = `http://localhost:5000/admin/`;

// export const baseURLWeb = `http://localhost:5000/website/`;

// export const baseURL = `http://192.168.28.5:5000/admin/`;

// export const baseURLWeb = `http://192.168.28.5:5000/website/`;

// export const api2 = axios.create({
//     baseURL: `http://3.236.82.67:9001`
// })


export const login = (data) => {
	return new Promise(async (resolve, reject) => {
		console.log('signInApi');
		try {
			//console.log(oldPassword, newPassword);
			const response = await fetch(`${baseURL}login`, {
				body: qs.stringify(data),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded',
				},

				method: 'POST',
			}).then((res) => res.json());
			// const response = await api.post('login', data);

			console.log(response);

			if (response.success) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const forgetPassword = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			//console.log(oldPassword, newPassword);
			const response = await fetch(`${baseURL}forgotPassword`, {
				body: qs.stringify(data),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded',
				},

				method: 'POST',
			}).then((res) => res.json());
			if (response.success) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const resetPassword = (data) => {
	return new Promise(async (resolve, reject) => {
		console.log('signInApi');
		try {
			//console.log(oldPassword, newPassword);
			const response = await fetch(`${baseURL}resetPassword`, {
				body: qs.stringify(data),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded',
				},

				method: 'POST',
			}).then((res) => res.json());
			// const response = await api.post('login', data);

			console.log(response);

			if (response.success) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getCustomerLists = (token, seachString, pageNumber, pageSize) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				`${baseURL}listCustomers?searchKey=${seachString}&page=${pageNumber}&page_size=${pageSize}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: token,
					},
				}
			).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getCustomerById = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}viewCustomerProfile/${id}`, {
				headers: {
					Accept: 'application/json',
					Authorization: token,
				},
			}).then((res) => res.json());
			console.log(response);
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const changeCustomerStatus = (token, id, data) => {
	let newData = { status: data };
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}changeCustomerStatus/${id}`, {
				body: qs.stringify(newData),
				// body:{status: data},
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: token,
				},
				method: 'PUT',
			}).then((res) => res.json());
			console.log(response);
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

// export const deleteCustomer = (token, id, data) => {
// 	let newData = { reason: data };
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			const response = await fetch(`${baseURL}deleteCustomer/${id}`, {
// 				body: qs.stringify(newData),
// 				headers: {
// 					Accept: 'application/json',
// 					'Content-Type': 'application/x-www-form-urlencoded',
// 					Authorization: token,
// 				},
// 				method: 'DELETE',
// 			}).then((res) => res.json());
// 			if (response.status == 200) {
// 				resolve(response);
// 			} else {
// 				reject(response.message);
// 			}
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	});
// };

// export const uploadCustomerProfileImage = (token, data) => {
// 	let form = new FormData();
// 	form.append('image', data);
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			const response = await fetch(`${baseURL}/uploadCustomerImage`, {
// 				body: form,
// 				headers: {
// 					Authorization: token,
// 				},
// 				method: 'PUT',
// 			}).then((res) => res.json());
// 			console.log(response);
// 			if (response.status == 200) {
// 				resolve(response);
// 			} else {
// 				reject(response.message);
// 			}
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	});
// };

export const editCustomer = (token, id, data) => {
	delete data['upload'];
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}editCustomer/${id}`, {
				body: JSON.stringify(data),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getSiteStatistics = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}getSiteStatistics`);
			url.search= new URLSearchParams(data.query).toString();
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getOrderStatistics = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}getOrderStatistics`);
			url.search= new URLSearchParams(data.query).toString();
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getOrderStats = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}getOrderStats`);
			url.search= new URLSearchParams(data.query).toString();
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getRevenueStats = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}getRevenueStats`);
			url.search= new URLSearchParams(data.query).toString();
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getDriverListByHotspot = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getDriverListByHotspot?hotspot_location_id=${id}`, {
				headers: {
					Accept: 'application/json',
					Authorization: token,
				},
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const listDriver = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}listDriver`);
			url.search= new URLSearchParams(data.query).toString();
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const changeDriverStatus = (token, id, data) => {
	let newData = { status: data };
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}changeDriverStatus/${id}`, {
				body: qs.stringify(newData),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: token,
				},
				method: 'PUT',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getDriverById = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getDriverDetails/${id}`, {
				headers: {
					Accept: 'application/json',
					Authorization: token,
				},
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getOrgersByDriverId = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getOrdersByDriverIdAndDateRange?driver_payment_id=${data.driver_payment_id}&page=${data.pageNumber}&page_size=${data.pageSize}`, {
				headers: {
					Accept: 'application/json',
					Authorization: token,
				},
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};




export const approveDriver = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}approveDriver/${id}`, {
				//    body: qs.stringify(newData),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: token,
				},
				method: 'PUT',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

// export const uploadDriverProfileImage = (token, data) => {
// 	let form = new FormData();
// 	form.append('image', data);
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			const response = await fetch(`${baseURL}/uploadDriverProfileImage`, {
// 				body: form,
// 				headers: {
// 					Authorization: token,
// 				},
// 				method: 'PUT',
// 			}).then((res) => res.json());
// 			console.log(response);
// 			if (response.status == 200) {
// 				resolve(response);
// 			} else {
// 				reject(response.message);
// 			}
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	});
// };
// export const uploadDriverVehicleImage = (token, data) => {
// 	debugger;
// 	let form = new FormData();
// 	form.append('image', data);
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			const response = await fetch(`${baseURL}/uploadVehicleImage`, {
// 				body: form,
// 				headers: {
// 					Authorization: token,
// 				},
// 				method: 'PUT',
// 			}).then((res) => res.json());
// 			if (response.status == 200) {
// 				resolve(response);
// 			} else {
// 				reject(response.message);
// 			}
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	});
// };
// export const uploadDriverLicenseImage = (token, data) => {
// 	let form = new FormData();
// 	form.append('image', data);
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			const response = await fetch(`${baseURL}/uploadLicenseImage`, {
// 				body: form,
// 				headers: {
// 					Authorization: token,
// 				},
// 				method: 'PUT',
// 			}).then((res) => res.json());
// 			if (response.status == 200) {
// 				resolve(response);
// 			} else {
// 				reject(response.message);
// 			}
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	});
// };
// export const uploadDriverInsuranceImage = (token, data) => {
// 	let form = new FormData();
// 	form.append('image', data);
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			const response = await fetch(`${baseURL}/uploadInsuranceImage`, {
// 				body: form,
// 				headers: {
// 					Authorization: token,
// 				},
// 				method: 'PUT',
// 			}).then((res) => res.json());
// 			if (response.status == 200) {
// 				resolve(response);
// 			} else {
// 				reject(response.message);
// 			}
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	});
// };

export const editDriver = (token, id, data) => {
	delete data['my-form'];
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}editDriver/${id}`, {
				body: JSON.stringify(data),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getDriverEarningDetails = (token, id, pageNo, pageSize) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				`${baseURL}getDriverEarningDetails?driver_id=${id}&page=${pageNo}&page_size=${pageSize}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: token,
					},
				}
			).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};
export const getHotspotsLists = (token) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}listHotspots`, {
				headers: {
					Accept: 'application/json',
					Authorization: token,
				},
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

// order managemnet apis


export const getActiveOrders = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}getActiveOrders`);
			url.search= new URLSearchParams(data.query).toString();
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};


export const getScheduledOrders = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}getScheduledOrders`);
			url.search= new URLSearchParams(data.query).toString();
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getCompletedOrders = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}getCompletedOrders`);
			url.search= new URLSearchParams(data.query).toString();
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};


export const getOrderDetailsById = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}getOrderDetails`);
			Object.keys(data.params).forEach(key=>url.pathname=`${url.pathname}/${data.params[key]}`)
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const assignDriver = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}assignDriver`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

// fee settings api
export const getFeeList = (token, type) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getDriverFeeList`, {
				headers: {
					Accept: 'application/json',
					Authorization: token,
				},
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const addFee = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}addDriverFee`, {
				body: JSON.stringify(data),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const editFee = (token, id, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}editDriverFee`, {
				body: JSON.stringify(data),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getFee = (token, fee_id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getDriverFeeById/${fee_id}`, {
				headers: {
					Accept: 'application/json',
					Authorization: token,
				},
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

// schedules settings
export const getListHotspots = (token, page, pageSize) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				`${baseURL}listAllHotspot`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: token,
					},
				}
			).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getHotspotDetails = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getHotspotDetails/${id}`, {
				headers: {
					Accept: 'application/json',
					Authorization: token,
				},
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

// export const addHotspot = (token, data) => {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			const response = await fetch(`${baseURL}addHotspot`, {
// 				body: JSON.stringify(data),
// 				headers: {
// 					Authorization: token,
// 					'Content-Type': 'application/json',
// 				},
// 				method: 'POST',
// 			}).then((res) => res.json());
// 			if (response.status == 200) {
// 				resolve(response);
// 			} else {
// 				reject(response.message);
// 			}
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	});
// };

// export const editHotspot = (token, id, data) => {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			const response = await fetch(`${baseURL}editHotspot/${id}`, {
// 				body: JSON.stringify(data),
// 				headers: {
// 					Authorization: token,
// 					'Content-Type': 'application/json',
// 				},
// 				method: 'PUT',
// 			}).then((res) => res.json());
// 			if (response.status == 200) {
// 				resolve(response);
// 			} else {
// 				reject(response.message);
// 			}
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	});
// };

// export const deleteHotspot = (token, id) => {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			const response = await fetch(`${baseURL}deleteHotspot/${id}`, {
// 				headers: {
// 					Accept: 'application/json',
// 					Authorization: token,
// 				},
// 				method: 'DELETE',
// 			}).then((res) => res.json());
// 			if (response.status == 200) {
// 				resolve(response);
// 			} else {
// 				reject(response.message);
// 			}
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	});
// };

export const uploadImage = (token, data) => {
	let form = new FormData();
	form.append('file', data.file);
	form.append('folderName', data.folderName);
	form.append('mimeType', data.mimeType);
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}uploadFile`, {
				body: form,
				headers: {
					Authorization: token,
				},
				method: 'PUT',
			}).then((res) => res.json());


			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {

			console.log(error);
		}
	});
};

//notification apis

export const getNotifications = (token, page, pageSize) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				`${baseURL}getNotifications?page=${page}&&page_size=${pageSize}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: token,
					},
				}
			).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getNotificationDetails = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				`${baseURL}getNotificationDetails?notification_id=${id}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: token,
					},
				}
			).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const addNotification = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}addNotification`, {
				body: JSON.stringify(data),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const deleteNotification = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				`${baseURL}deleteNotification?notification_id=${id}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: token,
					},
					method: 'DELETE',
				}
			).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

//admin api

export const getAdminProfile = (token) => {
	return fetch(`${baseURL}getAdminProfile`, {
		headers: {
			Accept: 'application/json',
			Authorization: token,
		},
	})
		.then((res) => res.json())
		.then((response) => {
			if (response.success) {
				return response;
			} else {
				throw response.message;
			}
		});

	// return new Promise(async (resolve, reject) => {
	// 	try {
	// 		const response = await fetch(`${baseURL}getAdminProfile`, {
	// 			headers: {
	// 				Accept: 'application/json',
	// 				Authorization: token,
	// 			},
	// 		}).then((res) => res.json());
	// 		if (response.status == 200) {
	// 			resolve(response);
	// 		} else {
	// 			reject(response.message);
	// 		}
	// 	} catch (error) {
	// 		reject(error);
	// 	}
	// });
};

export const editAdminProfile = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}updateProfile`, {
				body: JSON.stringify(data),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const updateAdminPassword = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}changePassword`, {
				body: JSON.stringify(data),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const logout = (token) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}logout`, {
				headers: {
					Accept: 'application/json',
					Authorization: token,
				},
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			reject(error);
		}
	});
};

//static content

export const getStaticContents = (token) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getStaticContents`, {
				headers: {
					Accept: 'application/json',
					Authorization: token,
				},
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getStaticContentDetails = (token, id) => {
	return fetch(`${baseURL}getStaticContentDetails?id=${id}`, {
		headers: {
			Accept: 'application/json',
			Authorization: token,
		},
	})
		.then((res) => res.json())
		.then((response) => {
			return response;
		});
	// return new Promise(async (resolve, reject) => {
	// 	try {
	// 		const response = await fetch(
	// 			`${baseURL}getStaticContentDetails?id=${id}`,
	// 			{
	// 				headers: {
	// 					 Accept: 'application/json',
	// 					//Accept: 'text/html',
	// 					Authorization: token,
	// 				},
	// 			}
	// 		)
	// 		.then(res => res.json());

	// 		if (response.status == 200) {
	// 			resolve(response);
	// 		} else {
	// 			reject(response.message);
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// });
};

export const getFileContent = (token, url) => {
	return fetch(`${baseURL}htmlFileUrlToTextConvert?file_url=${url}`, {
		headers: {
			Accept: 'application/json',
			Authorization: token,
		},
	})
		.then((res) => res.text())
		.then((response) => {
			return response;
		});
};

export const updateStaticContent = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}updateStaticContent`, {
				body: JSON.stringify(data),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getFaqs = (token) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getFaqs`, {
				headers: {
					Accept: 'application/json',
					Authorization: token,
				},
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getFaqQuestions = (token, id, activePage, pageSize) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getFaqQuestions?id=${id}&&page=${activePage}&&page_size=${pageSize}`, {
				headers: {
					Accept: 'application/json',
					Authorization: token,
				},
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const addFaq = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}addFaq`, {
				body: JSON.stringify(data),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getFaqById = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getFaqQuestionById/${id}`, {
				headers: {
					Accept: 'application/json',
					Authorization: token,
				},
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const editFaqs = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}editFaqQuestion`, {
				body: JSON.stringify(data),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const editFaqTopic = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}editFaqTopic`, {
				body: JSON.stringify(data),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};
export const deleteFaqs = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}deleteFaqQuestion/${id}`, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'DELETE',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const deleteFaqsTopic = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}deleteFaqTopic/${id}`, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'DELETE',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};


// banner management apis
export const getBannerList = (token, pageNo, pageSize) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				`${baseURL}listBanners?page=${pageNo}&&page_size=${pageSize}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: token,
					},
				}
			).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getBannerById = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getBanner/${id}`, {
				headers: {
					Accept: 'application/json',
					Authorization: token,
				},
			}).then((res) => res.json());
			if (response.success) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};
export const addBanner = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}addBanner`, {
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
				method: 'POST',
			}).then((res) => res.json());
			if (response.success) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const updateBannerOrder = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}/updateBannerOrder`, {
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
				method: 'PUT',
			}).then((res) => res.json());
			if (response.success) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const editBanner = (token, data, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}editBanner/${id}`, {
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
				method: 'PUT',
			}).then((res) => res.json());
			if (response.success) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const deleteBanner = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}deleteBanner/${id}`, {
				headers: {
					Accept: 'application/json',
					Authorization: token,
				},
				method: 'DELETE',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

//admin earning apis



export const getOrderDeliveiesList = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}getOrderDeliveries`);
			url.search= new URLSearchParams(data.query).toString();
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};


export const getOrderDeliveryDetailById = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}getOrderDeliveryDetails`);
			url.search= new URLSearchParams(data.query).toString();
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};



export const getPickupOrdersList = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}getPickupOrders`);
			url.search= new URLSearchParams(data.query).toString();
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

//restaurant payout apis


export const getRestaurantEarningList = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}getRestaurantEarnings`);
			url.search= new URLSearchParams(data.query).toString();
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getRestaurantEarningListById = (
	token,
	id,
	pageNo,
	pageSize
) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				`${baseURL}getOrdersByRestaurantIdAndDateRange?restaurant_payment_id=${id}&&page=${pageNo}&&page_size=${pageSize}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: token,
					},
				}
			).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};


// driver payment apis

export const getDriverEarningList = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}getDriverEarnings`);
			url.search= new URLSearchParams(data.query).toString();
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getDriverEarningListById = (
	token,
	id,
	startDate,
	endDate,
	pageNo,
	pageSize
) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				`${baseURL}getOrdersByDriverIdAndDateRange?driver_id=${id}&&start_date=${startDate}&&end_date=${endDate}&&page=${pageNo}&&page_size=${pageSize}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: token,
					},
				}
			).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};
export const editRestaurantFee = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}editRestaurantFee`, {
				body: JSON.stringify(data),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const deleteDriverFee = (token, fee_id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}deleteDriverFee/${fee_id}`, {
				headers: {
					Accept: 'application/json',
					Authorization: token,
				},
				method: 'DELETE',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getFaqTopics = (token) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getFaqTopics`, {
				headers: {
					Accept: 'application/json',
					Authorization: token,
				},
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getAddonsLists = (token, restaurant_dish_id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				`${baseURL}listDishAddon?restaurant_dish_id=${restaurant_dish_id}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: token,
					},
				}
			).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const deleteDishAddon = (token, dish_addon_id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}deleteDishAddon/${dish_addon_id}`, {
				headers: {
					Accept: 'application/json',
					Authorization: token,
				},
				method: 'DELETE',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const addDishAddon = (token, data) => {
	delete data['images'];
	delete data['react-select-3-input'];
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}addDishAddon`, {
				body: JSON.stringify(data),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const editDishAddon = (token, data) => {
	delete data['images'];
	delete ['react-select-5-input'];
	delete data['react-select-3-input'];
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}editDishAddon`, {
				body: JSON.stringify(data),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getDishAddonById = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getDishAddonById/${id}`, {
				headers: {
					Accept: 'application/json',
					Authorization: token,
				},
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getToggleDishAsRecommended = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let bodyFormData = {
				dishId: data
			}
			const response = await fetch(`${baseURL}toggleDishAsRecommended`, {
				body: JSON.stringify(bodyFormData),
				headers: {
					'Accept': 'application/json',
					'Authorization': token,
					'Content-Type': 'application/json'
				},
				method: 'PUT',
			}).then((res) => res.json());
			console.log(response);
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getToggleDishAsQuickFilter = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let bodyFormData = {
				dishId: data
			}
			const response = await fetch(`${baseURL}toggleDishAsQuickFilter`, {
				body: JSON.stringify(bodyFormData),
				headers: {
					'Accept': 'application/json',
					'Authorization': token,
					'Content-Type': 'application/json'
				},
				method: 'PUT',
			}).then((res) => res.json());
			console.log(response);
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getTipAmount = (token) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				`${baseURL}/listTip`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: token,
					},
				}
			).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const gettipAmountById = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getTipById/${id}`, {
				headers: {
					Accept: 'application/json',
					Authorization: token,
				},
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const editTipAmount = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}editTip`, {
				body: JSON.stringify(data),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const listTax = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}listTax`);
			url.search= new URLSearchParams(data.query).toString();
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getTax = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}getTaxById`);
			Object.keys(data.params).forEach(key=>url.pathname=`${url.pathname}/${data.params[key]}`)
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const editTax = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}editTax`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const fetchDriverPaymentDetails = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}paymentDriver`, {
				body: JSON.stringify(data),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const handleDriverPaymentDetails = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}driverPaymentSuccess`, {
				body: JSON.stringify(data),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};


export const fetchResturantPaymentDetails = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}paymentRestaurant`, {
				body: JSON.stringify(data),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const handleResturantPaymentDetails = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}restaurantPaymentSuccess`, {
				body: JSON.stringify(data),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}).then((res) => res.json());
			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const listRestaurant = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}listRestaurant`);
			url.search= new URLSearchParams(data.query).toString();
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getRestaurant = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}getRestaurant`);
			Object.keys(data.params).forEach(key=>url.pathname=`${url.pathname}/${data.params[key]}`)
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const deleteRestaurant = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}deleteRestaurant`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'DELETE',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const toggleRestaurantStatus = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}toggleRestaurantStatus`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const editRestaurant = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}editRestaurant`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const addRestaurant = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}addRestaurant`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const uploadFile = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}uploadFile`);
			const response = await fetch(url, {
				body: data.form,
				headers: {
					Authorization: token,
				},
				method: 'PUT',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const listMenuCategories = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}listRestaurantDishCategories`);
			url.search= new URLSearchParams(data.query).toString();
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getMenuCategory = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}getRestaurantDishCategory`);
			Object.keys(data.params).forEach(key=>url.pathname=`${url.pathname}/${data.params[key]}`)
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const deleteMenuCategory = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}deleteRestaurantDishCategory`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'DELETE',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const toggleMenuCategoryStatus = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}toggleRestaurantDishCategoryStatus`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const editMenuCategory = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}editRestaurantDishCategory`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const addMenuCategory = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}addRestaurantDishCategory`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const listMenu = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}listDishes`);
			url.search= new URLSearchParams(data.query).toString();
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const toggleDishAsQuickFilter = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}toggleDishAsQuickFilter`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getDish = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}getDish`);
			Object.keys(data.params).forEach(key=>url.pathname=`${url.pathname}/${data.params[key]}`)
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const deleteDish = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}deleteDish`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'DELETE',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const toggleDishStatus = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}toggleDishStatus`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const editDish = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}editDish`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const addDish = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}addDish`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const listAddonSection = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}listDishAddOnSections`);
			url.search= new URLSearchParams(data.query).toString();
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getAddonSection = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}getDishAddOnSection`);
			Object.keys(data.params).forEach(key=>url.pathname=`${url.pathname}/${data.params[key]}`)
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const deleteAddonSection = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}deleteDishAddOnSection`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'DELETE',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const toggleAddonSectionStatus = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}toggleDishAddOnSectionStatus`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const editAddonSection = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}editDishAddOnSection`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const addAddonSection = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}addDishAddOnSection`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const listAddon = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}listDishAddon`);
			url.search= new URLSearchParams(data.query).toString();
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getAddon = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}getDishAddon`);
			Object.keys(data.params).forEach(key=>url.pathname=`${url.pathname}/${data.params[key]}`)
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const deleteAddon = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}deleteDishAddon`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'DELETE',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const toggleAddonStatus = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}toggleDishAddonStatus`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const editAddon = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}editDishAddon`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const addAddon = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}addDishAddon`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const listHotspot = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}listHotspot`);
			url.search= new URLSearchParams(data.query).toString();
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getHotspot = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}getHotspot`);
			Object.keys(data.params).forEach(key=>url.pathname=`${url.pathname}/${data.params[key]}`)
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const deleteHotspot = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}deleteHotspot`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'DELETE',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const editHotspot = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}editHotspot`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const addHotspot = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}addHotspot`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const generateRestaurantEarnings = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}generateRestaurantEarnings`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const generateRestaurantOrderEmail = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}generateRestaurantOrderEmail`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const listOrderPayments = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}listOrderPayments`);
			url.search= new URLSearchParams(data.query).toString();
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getOrderPaymentDetails = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}getOrderPaymentDetails`);
			Object.keys(data.params).forEach(key=>url.pathname=`${url.pathname}/${data.params[key]}`)
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const refund = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}refund`);
			const response = await fetch(url, {
				body: JSON.stringify(data.body),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const listRefunds = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}listRefunds`);
			url.search= new URLSearchParams(data.query).toString();
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export const getRefundDetails = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url=new URL(`${baseURL}getRefundDetails`);
			Object.keys(data.params).forEach(key=>url.pathname=`${url.pathname}/${data.params[key]}`)
			const response = await fetch(url, {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			}).then((res) => res.json());

			if (response.status == 200) {
				resolve(response);
			} else {
				reject(response.message);
			}
		} catch (error) {
			console.log(error);
		}
	});
};