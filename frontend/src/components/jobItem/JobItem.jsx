import React from "react";

// Create list item for each job

const JobItem = ({ job }) => {
	return (
		<>
			<tr>
				<td>{job.customer}</td>
				<td>{job.description}</td>
				<td>{job.dueDate}</td>
				<td>{job.price}</td>
			</tr>
		</>
	);
};

export default JobItem;
