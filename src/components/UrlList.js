import React, {  useState, useEffect } from 'react';
import AppModal from './Modal'
import DataTable from 'react-data-table-component';
import AddTodoForm from './AddUrlForm';
import UpdateUrlForm from './UpdateUrlForm';
import DeleteUrlForm from './DeleteUrlForm';
import {apiProvider} from '../services/provider';

const UrlList = () => {

	const [addModal, setAddModal]= useState(false);
	const [updateModal, setUpdateModal]= useState(false);
	const [deleteModal, setDeleteModal]= useState(false);
	const [selectedUrl, setSelectedUrl]= useState({});
	const [tabledata, setTableData] =  useState([])
	const [urlClicked, setUrlClicked]= useState(0);
	const [error, setError] =  useState([])
	const [pending, setPending] = React.useState(true);
	const [stats, setStats]= useState();

	useEffect(() => {
		async function fetchUrls() {
			let response = await apiProvider.getAll('urls');
			if(response.error){
				setError(error);
			}
			setTableData(response)
			setPending(false);
    }
    fetchUrls();
	}, [deleteModal, updateModal, addModal, urlClicked])

	useEffect(() => {
		async function fetchUrls() {
			let response = await apiProvider.getAll('urls');
			if(response.error){
				setError(error);
			}
			setTableData(response)
			setPending(false);
    }
    fetchUrls();
	}, [])
	
const columns = [
	{
		name: 'Url Id',
		selector: row => row.id,
  },
	{
			name: 'User Id',
			selector: row => row.user_id,
	},
	{
			name: 'Main Url',
			minWidth:'30%',
			selector: row => row.main_url,
			allowOverflow: true
	},
	{
		name: 'Tiny Url',
		cell:(row) => <a href="" onClick={(e)=>handleUrlRedirect(e,row)}>{row.tiny_url}</a>,
		ignoreRowClick: true,
		allowOverflow: true
	},
	{
		name: 'Code',
		selector: row => row.code,
	},
	{
		name: 'Clicks',
		selector: row => row.clicks,
	},
	
	{
    cell:(row) => <button onClick={()=>handleUrUpdate(row)} className="btn btn-primary">Edit</button>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
	},
	{
    cell:(row) => <button onClick={()=>handleDeleteUrl(row)} className="btn btn-danger" id={row.ID}>Delete</button>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

const handleUrUpdate = (row) =>{
	setSelectedUrl(row)
	setUpdateModal(true)

}

const handleDeleteUrl = (row) =>{
	setSelectedUrl(row)
	setDeleteModal(true)

}

const handleUrlRedirect = async (event,row) => {
	 event.preventDefault();
		const response = await apiProvider.getAll(`u/${row.code}`);
		if(response.errors){
      setError(response.message);
      return
		}
		setUrlClicked(urlClicked + 1)
		window.open(response.data.main_url, "_blank")
		
}

  const handleStats =(data)=>{
    setStats(data);
  }
	return (
		<>
		 <div>
		  <div>
			<button type='btn btn-primary relative' className='btn btn-primary mb-2' onClick={setAddModal}>
				Add new Url
			</button>
			</div>
			<DataTable
					 title="Url List" 
					  
					 subHeaderComponent={()=>{
						return<button type='btn btn-primary relative' className='btn btn-primary mb-2' onClick={setAddModal}>
						Add new Url
						</button>
					 }}
					  progressPending={pending}
						pagination
						customStyles={{width:'100%', height:'100vh'}}
            columns={columns}
            data={tabledata.data}
      />
			<AppModal isOpen={addModal} label="New modal" 
			children={
				<>
				<AddTodoForm handleStats={handleStats} closeModal={setAddModal}/>
				</>
			}/>
			<AppModal isOpen={updateModal} label="Update Url"  
			children={
				<>
				<UpdateUrlForm handleStats={handleStats} closeModal={setUpdateModal} selectedUrl={selectedUrl}/>
				</>
			}/>
				<AppModal isOpen={deleteModal} label="Delete Url"  
			children={
				<>
				<DeleteUrlForm handleStats={handleStats} closeModal={setDeleteModal} selectedUrl={selectedUrl}/>
				</>
			}/>
			</div> 
	</>		
	);
};

export default UrlList;
