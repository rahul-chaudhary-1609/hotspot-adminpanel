/**
 * The file is covered under Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * Please review the license for full details.
 * This program is not free software: You cannot redistribute it for any use under the terms of the Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * However the source can be modified and updated for the working of the application Design & Development of Mobile Application for “Hotspot” for which it was licensed.
*/


import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-toastify/dist/ReactToastify.css';
import 'react-table/react-table.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAddonsLists, getDishById } from '../../../../api';
import {
    faPencilAlt,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { deleteDishAddon, getCategoryList } from '../../../../api';
import DeleteModal from '../../../deleteModal/deleteModal';

function AddOnsmanagement({ ...props }) {
    const history = useHistory();
    const token = useSelector((state) => state.auth.isSignedIn);

    const { id } = useParams();
    const { pathname } = useLocation();
    let path = pathname.split('/')[1];

    const [distDetails, setdistDetails] = useState([]);
    
    const [addOnsList, setAddOnsList] = useState([]);

    const [loading, setLoading] = useState(false);

    const [deleteModal, setDeleteModal] = useState(false);

    const [addOnsId, setAddOnsId] = useState(null);

    const [error, setError] = useState();

    const [columns, setColumns] = useState([]);

    const column = [
        {
            Header: '#',
            width: 30,
            id: 1,
            className: 'text-center view-details',
            accessor: (item) => {
                return (
                    <>
                        <div
                            className='flex items-center'
                            style={{ cursor: 'pointer' }}>
                            <div className='text-sm'>
                                <p className='text-gray-300 leading-none'>{item.idx}</p>
                            </div>
                        </div>
                    </>
                );
            },
        },
        {
            id: 2,
            Header: 'Add-On Name',
            className: 'text-center view-details',
            accessor: (item) => {
                return (
                    <div style={{
                        padding: '6px', cursor: 'pointer', wordBreak: 'break-word',
                        whiteSpace: 'normal'
                    }}>
                        {item.name}
                    </div>
                );
            },
        },
        {
            id: 3,
            Header: 'Add-On Picture',
            className: 'text-center view-details',
            accessor: (item) => {
                return (
                    <img
                        style={{
                            padding: '6px',
                            cursor: 'pointer',
                            width: '50px',
                            marginLeft: '110px'
                        }}
                        src={item.image_url}
                    />
                );
            },
        },
        {
            id: 5,
            Header: 'Price per Add-On',
            className: 'text-center view-details',
            accessor: (item) => {
                return (
                    <div style={{ padding: '6px', cursor: 'pointer' }}>
                        $ {item.price}
                    </div>
                );
            },
        },
        {
            id: 6,
            Header: 'Action',
            className: 'text-center view-details',
            accessor: (item) => {
                return (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                        }}
                        className='text-center'
                        onClick={(e) => e.stopPropagation()}>
                        <FontAwesomeIcon
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                                history.push(`/${'restaurant'}/${window.localStorage.getItem('menuId')}/menu/${id}/dishAddOns/addOn/${item.id}`)
                            }
                            className='text-red-600 trash w-5 h-5'
                            color='red'
                            icon={faPencilAlt}
                        />
                        <FontAwesomeIcon
                            className='text-red-600 trash w-5 h-5'
                            color='red'
                            onClick={() => handleDeleteDish(item.id)}
                            icon={faTrashAlt}
                        />
                    </div>
                );
            },
        },
    ];

    const handleDeleteDish = (id) => {
        setAddOnsId(id);
        setDeleteModal(true);
    };

    useEffect(() => {        
        getAddOnsDetails();
        setColumns(column);
        window.localStorage.setItem('menuId', pathname.split('/')[2]);
    }, []);

    const getAddOnsDetails = async () => {
        try {
            setLoading(true);
                let { dish } = await getDishById(token, id);
                setdistDetails(dish);
            const res = await getAddonsLists(token, parseInt(id));
            if (res.status == 200) {
                setLoading(false);
                setError(null);
                let rows = res.dishAddons.rows
                rows.map((row, id) => {
                    row.idx = id + 1;
                })
                setAddOnsList(rows);
            }
        } catch (error) {
            setLoading(false);
            setError(error);
            setAddOnsList([]);
            setdistDetails([]);
        }
    };

    const handleDelete = () => {
        deleteDishAddon(token, addOnsId)
            .then((res) => {
                getAddOnsDetails();
                setDeleteModal(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <>
            <div className='main-content md:pb-5 flex-1 p-8 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				<div id='recipients' className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>{ distDetails.name  &&  distDetails.name + "'s Add-Ons"}</h1>
                    <div className='flex flex-wrap -mx-3 mb-6 mt-5' style={{justifyContent: 'space-between' }}>
						<div style={{ marginTop: '-40px' }}>
                            <button
                                style={{ height: '3rem' }}
                                type='button'
                                className='shadow bg-500 mt-10 ml-3 hover:bg-white-400 focus:shadow-outline focus:outline-none text-black font-bold py-1 px-4 rounded'
                                onClick={() =>
                                    history.push(`/${'restaurant'}/${window.localStorage.getItem('menuId')}/menu/${id}`)
                                }
                            >
                                Dish Details
                            </button>
                            <button
                                style={{ height: '3rem' }}
                                disabled
                                className='shadow mt-10 bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded'
                                type='button'>
                                Add-On Management
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={() => history.push(`/${'restaurant'}/${window.localStorage.getItem('menuId')}/menu/${id}/dishAddOns/addOn`)}
                                className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
                                type='button'>
                                Add New
							</button>
                        </div>
                    </div>
                        
                    {error && (
                        <p
                            style={{
                                color: 'red',
                                fontSize: '20px',
                                textAlign: 'center',
                                width: '100%',
                            }}>
                            {error}
                        </p>
                    )}
                    <ReactTable
                        showPagination={false}
                        minRows={0}
                        NoDataComponent={() => null}
                        data={addOnsList}
                        loading={loading}
                        className='-highlight'
                        columns={columns}
                        style={{
                            width: '100%',
                        }}
                    />
                </div>
            </div>
            {deleteModal && <DeleteModal  {...{ deleteModal, setDeleteModal, name: 'Add On', handleDelete }} />}
        </>
    );
}

export default AddOnsmanagement;
