import React, { useState } from 'react';
import {apiProvider} from '../services/provider';

const DeleteUrlForm = ({ closeModal, selectedUrl}) => {
  const {main_url: mainUrl, id} = selectedUrl;
	const [value, setValue] = useState(mainUrl);
	const [error, setError] = useState(null);
	const onSubmit = async (event) => {
		event.preventDefault();
    const response = await apiProvider.remove(`urls/${id}`);
    console.log(response);
		if(response.success === false){
      setError(response.message);
      return;
		}
		 closeModal(false);
		
	};

	return (
		<>
    <div className="d-flex">
    <h3>Are you sure you want to delete ?</h3>
      </div>
		<form onSubmit={onSubmit} className='form-inline mt-3 mb-3'>
		
    <button onSubmit={onSubmit} className='btn btn-primary '>
				Yes
			</button>
			<button onClick={()=> closeModal(false)} className='btn btn-danger'>
				No
			</button>
		</form>
		{error}
		</>
	);
};

export default DeleteUrlForm;
