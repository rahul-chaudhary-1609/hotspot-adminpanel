import axios from 'axios';
import qs from 'qs';

//  export const baseURL = `http://3.228.159.69/admin/`;

//  export const baseURLWeb = `http://3.228.159.69/website/`;

export const baseURL = `https://api.togohotspot.com/admin/`;

export const baseURLWeb = `https://api.togohotspot.com/website/`;

// export const baseURL = `http://localhost:7000/admin/`;

// export const baseURLWeb = `http://localhost:7000/website/`;

// export const api2 = axios.create({
//     baseURL: `http://3.236.82.67:9001`
// })

export const getRestaurantLists = (
	token,
	seachString,
	pageNumber,
	pageSize
) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				`${baseURL}listRestaurant?searchKey=${seachString}&page=${pageNumber}&page_size=${pageSize}`,
				{
					headers: {
						Accept: 'application/json',
						Authorization: token,
					},
				}
			).then((res) => res.json());
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

export const getRestaurantById = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getRestaurant/${id}`, {
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
export const getRestaurantCategoryList = (token) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}restaurantCategoryList`, {
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
export const changeRestaurantStatus = (token, id, data) => {
	let newData = { status: data };
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}changeRestaurantStatus/${id}`, {
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

export const deleteRestaurant = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}deleteRestaurant/${id}`, {
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
export const editRestaurant = (token, id, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}editRestaurant/${id}`, {
				body: JSON.stringify(data),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
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
export const addRestaurant = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}addRestaurant`, {
				body: JSON.stringify(data),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
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
// export const uploadRestaurantImage = (token, data) => {
// 	delete data['images'];
// 	let form = new FormData();
// 	form.append('image', data);
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			const response = await fetch(`${baseURL}/uploadRestaurantImage`, {
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

export const getMenuLists = (token, id, seachString, pageNumber, pageSize) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				`${baseURL}listDishes/${id}?searchKey=${seachString}&page=${pageNumber}&page_size=${pageSize}`,
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
export const deleteDish = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}deleteDish/${id}`, {
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
// export const uploadDishImage = (token, data) => {
// 	let form = new FormData();
// 	form.append('image', data);
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			const response = await fetch(`${baseURL}/uploadDishImage`, {
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
export const editDish = (token, id, data) => {
	// delete data['images'];
	// delete ['react-select-5-input'];
	// delete data['react-select-3-input'];
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}editDish/${id}`, {
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
export const addDish = (token, data) => {
	delete data['images'];
	delete data['react-select-3-input'];
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}addDish`, {
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
export const getDishById = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getDish/${id}`, {
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

export const getCategoryList = (token) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}dishCategoryLIst`, {
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

export const getTotalCustomers = (token) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getTotalCustomers`, {
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
export const getTotalCustomersViaHotspot = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getCustomersViaHotspot/${id}`, {
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

export const getTotalDrivers = (token) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getTotalDrivers`, {
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
export const getTotalDriversViaHotspot = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getDriversViaHotspot/${id}`, {
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

export const getTotalOrders = (token) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getTotalOrders`, {
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
export const getOrdersViaHotspot = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getOrdersViaHotspot/${id}`, {
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

export const getTotalProcessingOrders = (token) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getProcessingOrders`, {
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
export const getProcessingOrdersViaHotspot = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				`${baseURL}getProcessingOrdersViaHotspot/${id}`,
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

export const getTotalCompletedOrders = (token) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getCompletedOrder`, {
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
export const getCompletedOrdersViaHotspot = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				`${baseURL}getCompletedOrdersViaHotspot/${id}`,
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

export const getTotalHotspots = (token) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getHotspotCount`, {
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

export const getTotalEarning = (token) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getTotalRevenue`, {
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
export const getEarningsViaHotspot = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				`${baseURL}getTOtalRevenueViaHotspot/${id}`,
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

export const getOrderStatus = (token) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getOrderStats`, {
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
export const getRevenueStats = (token) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getRevenueStats`, {
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

export const getDriverLists = (token, seachString, pageNumber, pageSize) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				`${baseURL}listDrivers?searchKey=${seachString}&page=${pageNumber}&page_size=${pageSize}`,
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

export const getActiveOrders = (
	token,
	seachString,
	pageNumber,
	pageSize,
	status_filter
) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				`${baseURL}getActiveOrders?searchKey=${seachString}&status_filter=${status_filter}&page=${pageNumber}&page_size=${pageSize}`,
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

export const getScheduledOrders = (
	token,
	seachString,
	pageNumber,
	pageSize,
	status_filter
) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				`${baseURL}getScheduledOrders?searchKey=${seachString}&status_filter=${status_filter}&page=${pageNumber}&page_size=${pageSize}`,
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

export const getCompletedOrders = (
	token,
	seachString,
	pageNumber,
	pageSize
) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				`${baseURL}getCompletedOrders?searchKey=${seachString}&page=${pageNumber}&page_size=${pageSize}`,
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

export const getOrderDetailsById = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getOrderDetails/${id}`, {
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

export const assignDriver = (token, orderId, driverId) => {
	let data = { driverId: driverId };
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}assignDriver/${orderId}`, {
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

export const addHotspot = (token, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}addHotspot`, {
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

export const editHotspot = (token, id, data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}editHotspot/${id}`, {
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

export const deleteHotspot = (token, id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}deleteHotspot/${id}`, {
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
			console.log(error);
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

export const getOrderDeliveiesList = (
	token,
	searchKey,
	startDate,
	endDate,
	filterKey,
	pageNo,
	pageSize
) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url = `${baseURL}getOrderDeliveries?search_key=${searchKey}&start_date=${startDate}&end_date=${endDate}&filter_key=${filterKey}&page=${pageNo}&page_size=${pageSize}`;

			const response = await fetch(
				url,
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

export const getOrderDeliveryDetailById = (token, order_delivery_id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(`${baseURL}getOrderDeliveryDetails?order_delivery_id=${order_delivery_id}`, {
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

export const getPickupOrdersList = (
	token,
	searchKey,
	startDate,
	endDate,
	filterKey,
	pageNo,
	pageSize
) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				`${baseURL}getPickupOrders?search_key=${searchKey}&start_date=${startDate}&end_date=${endDate}&filter_key=${filterKey}&page=${pageNo}&page_size=${pageSize}`,
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

//restaurant payout apis
export const getRestaurantEarningList = (
	token,
	searchKey,
	startDate,
	endDate,
	filterKey,
	pageNo,
	pageSize
) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				`${baseURL}getRestaurantEarnings?search_key=${searchKey}&&start_date=${startDate}&&end_date=${endDate}&&filter_key=${filterKey}&&page=${pageNo}&&page_size=${pageSize}`,
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
export const getDriverEarningList = (
	token,
	searchKey,
	startDate,
	endDate,
	filterKey,
	pageNo,
	pageSize
) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				`${baseURL}getDriverEarnings?search_key=${searchKey}&&start_date=${startDate}&&end_date=${endDate}&&filter_key=${filterKey}&&page=${pageNo}&&page_size=${pageSize}`,
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
