import React, { useState } from 'react';
import {apiProvider} from '../services/provider';

const UpdateUrlForm = ({ closeModal, selectedUrl}) => {
  const {main_url: mainUrl, id} = selectedUrl;
	const [value, setValue] = useState(mainUrl);
	const [error, setError] = useState(null);
	const onSubmit = async (event) => {
		event.preventDefault();
		const response = await apiProvider.put(`urls/${id}`, {main_url: value});
		if(response.errors){
      setError(response.message);
      return
		}
		 closeModal(false);
		
	};

	return (
		<>
    <div className="d-flex">
    <h3>Update Url</h3>
      </div>
		<form onSubmit={onSubmit} className='form-inline mt-3 mb-3'>
			<input
        type='text'
        defaultValue={value}
				className='form-control mb-2 mr-sm-2'
				onChange={(event) => setValue(event.target.value)}
			></input>

			<button type='submit' className='btn btn-primary mb-2'>
				Save
			</button>
		</form>
		{error}
		</>
	);
};

export default UpdateUrlForm;
