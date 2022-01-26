import React, { useState } from 'react';
import {apiProvider} from '../services/provider';

const AddTodoForm = ({closeModal}) => {
	const [value, setValue] = useState('');
	const [error, setError] = useState(null);

	const onSubmit = async (event) => {
		event.preventDefault();
		const response = await apiProvider.post('urls', {main_url: value});
		if(response.success === false){
			setError(response.message);
			return;
		}
		 closeModal(false);
		
	};

	return (
		<>
		<div className="d-flex">
    <h3>New Url</h3>
        <button  className='btn btn-primary' onClick={()=>closeModal(false)}>
				close
			</button>
      </div>
		<form onSubmit={onSubmit} className='form-inline mt-3 mb-3'>
			<label className='sr-only'>Name</label>
			<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Add Url'
				value={value}
				onChange={(event) => setValue(event.target.value)}
			></input>

			<button type='submit' className='btn btn-primary mb-2'>
				Submit
			</button>
		</form>
		{error}
		</>
	);
};

export default AddTodoForm;
